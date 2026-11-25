import FavButton from './FavButton.jsx';
import { useMemo, useState } from 'react';
import { MEDICINES, CATEGORIES, lowestPrice } from '../data.js';
import { useAuth } from '../AuthContext.jsx';

function normalize(s) {
  return s.toLowerCase().trim();
}

export default function MedicinesPage({ onCompare }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState(null);
  const [sort, setSort] = useState('name');
  const { favorites } = useAuth();
  const [onlyFavs, setOnlyFavs] = useState(false);

  const filtered = useMemo(() => {
    let list = MEDICINES;

    if (cat) list = list.filter((m) => m.cat === cat);
    if (onlyFavs) list = list.filter((m) => favorites.includes(m.name));

    const q = normalize(query);
    if (q) {
      list = list.filter(
        (m) => normalize(m.name).includes(q) || normalize(m.salt).includes(q)
      );
    }

    const sorted = [...list];
    if (sort === 'price-asc') sorted.sort((a, b) => lowestPrice(a) - lowestPrice(b));
    else if (sort === 'price-desc') sorted.sort((a, b) => lowestPrice(b) - lowestPrice(a));
    else sorted.sort((a, b) => a.name.localeCompare(b.name));

    return sorted;
  }, [query, cat, sort, onlyFavs, favorites]);

  return (
    <section className="section meds-page">
      <div className="wrap">
        <div className="meds-page-head">
          <h1 className="headline meds-page-title">All medicines</h1>
          <p className="subhead meds-page-subhead">
            Browse every medicine in our database, or search, filter, and sort to find what you need.
          </p>
        </div>

        <div className="meds-toolbar">
          <div className="search-strip meds-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search medicine, brand or salt..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="name">Sort: Name (A–Z)</option>
            <option value="price-asc">Sort: Price (low to high)</option>
            <option value="price-desc">Sort: Price (high to low)</option>
          </select>
        </div>

        <div className="cat-row meds-cat-row">
          <div className={"cat-chip" + (cat === null ? " active" : "")} onClick={() => setCat(null)}>
            All <span className="n">{MEDICINES.length}</span>
          </div>
          {CATEGORIES.map((c) => {
            const count = MEDICINES.filter((m) => m.cat === c).length;
            return (
              <div
                key={c}
                className={"cat-chip" + (cat === c ? " active" : "")}
                onClick={() => setCat(c)}
              >
                {c} <span className="n">{count}</span>
              </div>
            );
          })}
          <div className={"cat-chip" + (onlyFavs ? " active" : "")} onClick={() => setOnlyFavs(!onlyFavs)}>
            ♥ Favorites <span className="n">{favorites.length}</span>
          </div>
        </div>

        <div className="meds-count">{filtered.length} medicine{filtered.length !== 1 ? 's' : ''} found</div>

        {filtered.length === 0 ? (
          <div className="no-results">
            Nothing matched <b>&quot;{query}&quot;</b>. Try a different name or salt.
          </div>
        ) : (
          <div className="med-grid meds-page-grid">
            {filtered.map((med) => (
              <div className="med-card" key={med.name} onClick={() => onCompare(med.name)}>
                <FavButton medName={med.name} />
              <div className="med-cat-tag">{med.cat}</div>
                <div className="med-title">{med.name}</div>
                <div className="med-salt">{med.salt} · {med.pack}</div>
                <div className="med-price-row">
                  <div>
                    <div className="med-price">₹{lowestPrice(med)}</div>
                    <div className="med-price-label">lowest listed</div>
                  </div>
                  <div className="med-compare">Compare →</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
