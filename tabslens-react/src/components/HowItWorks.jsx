import { Fragment } from 'react';

const STEPS = [
  { num: "01", title: "Search", desc: "Type the medicine name, brand, or the salt printed on your prescription." },
  { num: "02", title: "Compare", desc: "See prices from nearby pharmacies ranked cheapest first, with pack size shown." },
  { num: "03", title: "Save money", desc: "Pick the best option and go straight to that pharmacy to buy it." },
];

export default function HowItWorks() {
  return (
    <section className="section how-section" id="how">
      <div className="wrap">
        <h2 className="section-title" style={{ marginBottom: 28 }}>How Tabslens works</h2>
        <div className="how-row">
          {STEPS.map((s, i) => (
            <Fragment key={s.num}>
              <div className="how-step">
                <div className="how-num">{s.num}</div>
                <div className="how-title">{s.title}</div>
                <div className="how-desc">{s.desc}</div>
              </div>
              {i < STEPS.length - 1 && <div className="how-arrow">→</div>}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
