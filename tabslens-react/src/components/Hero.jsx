import { useState } from 'react';

const SUGGESTIONS = ["Dolopar 650", "Azigo 500", "Pantogen 40", "Metfor 500"];

export default function Hero({ onSearch, recent = [] }) {
  const [query, setQuery] = useState("");

  function submit() {
    onSearch(query);
  }

  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <div className="kicker">Price transparency for everyday medicine</div>
          <h1 className="headline">Find the best price before you buy.</h1>
          <p className="subhead">
            Search any medicine, brand, or salt name — Tabslens checks nearby
            pharmacies so you don't overpay for the same strip.
          </p>

          <div className="search-strip">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search medicine, brand or salt..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
            />
            <button className="search-btn" onClick={submit}>Search medicine</button>
          </div>

          <div className="suggest-row">
            {SUGGESTIONS.map((s) => (
              <span key={s} className="suggest-chip" onClick={() => { setQuery(s); onSearch(s); }}>
                {s}
              </span>
            ))}
          </div>
          {recent.length > 0 && (
            <div className="recent-row">
              <span className="recent-label">Recently viewed:</span>
              {recent.map((r) => (
                <span key={r} className="suggest-chip" onClick={() => onSearch(r)}>{r}</span>
              ))}
            </div>
          )}
        </div>

        <div className="rx-card">
          <div className="rx-top">
            <div>
              <div className="rx-name">Dolopar 650</div>
              <div className="rx-salt">Paracetamol 650mg · Strip of 15</div>
            </div>
            <div className="rx-badge">4 pharmacies</div>
          </div>
          <div className="rx-row winner"><span className="rx-pharm">CityChemist</span><span className="rx-price">₹28</span></div>
          <div className="rx-row"><span className="rx-pharm">MedGo</span><span className="rx-price">₹34</span></div>
          <div className="rx-row"><span className="rx-pharm">WellCare Pharmacy</span><span className="rx-price">₹39</span></div>
          <div className="rx-save">You save <b>₹11</b> (28%) by choosing the cheapest listed pharmacy.</div>
        </div>
      </div>
    </section>
  );
}
