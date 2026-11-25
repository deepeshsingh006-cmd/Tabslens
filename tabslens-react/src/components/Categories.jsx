import { CATEGORIES, MEDICINES } from '../data.js';

export default function Categories({ activeCat, onSelect }) {
  return (
    <section className="section" id="categories">
      <div className="wrap">
        <div className="section-head"><h2 className="section-title">Popular categories</h2></div>
        <div className="cat-row">
          <div className={"cat-chip" + (activeCat === null ? " active" : "")} onClick={() => onSelect(null)}>
            All <span className="n">{MEDICINES.length}</span>
          </div>
          {CATEGORIES.map((cat) => {
            const count = MEDICINES.filter((m) => m.cat === cat).length;
            return (
              <div
                key={cat}
                className={"cat-chip" + (activeCat === cat ? " active" : "")}
                onClick={() => onSelect(cat)}
              >
                {cat} <span className="n">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
