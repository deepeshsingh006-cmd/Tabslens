import FavButton from './FavButton.jsx';
import { MEDICINES, lowestPrice } from '../data.js';

export default function MedicineGrid({ activeCat, onCompare, gridRef }) {
  const list = (activeCat ? MEDICINES.filter((m) => m.cat === activeCat) : MEDICINES).slice(0, 8);
  const title = activeCat || "Popular medicines";

  return (
    <section className="section" id="medsSection" ref={gridRef}>
      <div className="wrap">
        <div className="section-head">
          <h2 className="section-title">{title}</h2>
        </div>
        <div className="med-grid">
          {list.map((med) => (
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
      </div>
    </section>
  );
}
