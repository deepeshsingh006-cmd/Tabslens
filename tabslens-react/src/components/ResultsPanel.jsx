import { buildBuyLink, findSubstitutes, lowestPrice, highestPrice } from '../data.js';

export default function ResultsPanel({ med, query, onClose, resultsRef, onSelect }) {
  if (!med && !query) return null;

  if (!med) {
    return (
      <section className="results show" ref={resultsRef}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="results-med">No matches</div>
            <button className="close-results" onClick={onClose}>✕</button>
          </div>
          <div className="no-results">
            Nothing matched <b>&quot;{query}&quot;</b>. Try a shorter name, or the salt printed on the strip.
          </div>
        </div>
      </section>
    );
  }

  const sorted = Object.entries(med.prices).sort((a, b) => a[1] - b[1]);
  const lowest = lowestPrice(med);
  const saving = highestPrice(med) - lowest;
  const pct = Math.round((saving / highestPrice(med)) * 100);
  const subs = findSubstitutes(med);

  return (
    <section className="results show" ref={resultsRef}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="results-head">
            <div className="results-med">{med.name}</div>
            <div className="results-salt">{med.salt} · {med.pack}</div>
            <div className="results-meta">
              <span className="meta-pill">{med.cat}</span>
              <span className="meta-pill">{sorted.length} pharmacies compared</span>
              {saving > 0 && <span className="meta-pill save-pill">Save up to ₹{saving} ({pct}%)</span>}
            </div>
          </div>
          <button className="close-results" onClick={onClose}>✕</button>
        </div>

        <div className="results-list">
          {sorted.map(([pharm, price], i) => (
            <div className={'result-row' + (i === 0 ? ' best' : '')} key={pharm}>
              <div className="result-left">
                <div className="rank">{i + 1}</div>
                <div>
                  <span className="pharm-name">{pharm}{i === 0 && <span className="best-tag">CHEAPEST</span>}</span>
                  <div className="pharm-sub">{med.pack}{i > 0 ? ` · ₹${price - lowest} more than the cheapest` : ''}</div>
                </div>
              </div>
              <div className="result-right">
                <div className="result-price">₹{price}</div>
                <a className="buy-btn" href={buildBuyLink(pharm, med.name)} target="_blank" rel="noopener noreferrer">
                  Buy {med.name}
                </a>
              </div>
            </div>
          ))}
        </div>

        {subs.length > 0 && (
          <div className="subs">
            <h3 className="subs-title">Generic alternatives (same salt)</h3>
            {subs.map((s) => {
              const diff = lowest - lowestPrice(s);
              return (
                <div className="sub-row" key={s.name} onClick={() => onSelect(s.name)}>
                  <div>
                    <div className="pharm-name">{s.name}</div>
                    <div className="pharm-sub">{s.salt} · {s.pack}</div>
                  </div>
                  <div className="sub-right">
                    <span className="result-price">₹{lowestPrice(s)}</span>
                    {diff > 0 && <span className="best-tag">Save ₹{diff}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
