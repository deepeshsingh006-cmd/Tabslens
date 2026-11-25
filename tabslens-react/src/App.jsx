import { useRef, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Categories from './components/Categories.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import MedicineGrid from './components/MedicineGrid.jsx';
import MedicinesPage from './components/MedicinesPage.jsx';
import ResultsPanel from './components/ResultsPanel.jsx';
import { MEDICINES } from './data.js';

const norm = (s) => s.toLowerCase().trim();

function findMatches(query) {
  const q = norm(query);
  if (!q) return [];
  return MEDICINES.filter((m) => norm(m.name).includes(q) || norm(m.salt).includes(q));
}

function loadRecent() {
  try { return JSON.parse(localStorage.getItem('tabslens_recent')) || []; } catch { return []; }
}

export default function App() {
  const [page, setPage] = useState('home'); // 'home' | 'medicines'
  const [activeCat, setActiveCat] = useState(null);
  const [selectedMed, setSelectedMed] = useState(null);
  const [lastQuery, setLastQuery] = useState(null);
  const [recent, setRecent] = useState(loadRecent);

  const medsRef = useRef(null);
  const resultsRef = useRef(null);

  function show(med, query) {
    setSelectedMed(med);
    setLastQuery(query);
    if (med) {
      const next = [med.name, ...recent.filter((n) => n !== med.name)].slice(0, 5);
      setRecent(next);
      localStorage.setItem('tabslens_recent', JSON.stringify(next));
    }
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  }

  const handleSearch = (query) => show(findMatches(query)[0] || null, query);
  const handleCompare = (name) => show(MEDICINES.find((m) => m.name === name) || null, name);

  function closeResults() { setSelectedMed(null); setLastQuery(null); }

  function go(nextPage, afterId) {
    setPage(nextPage);
    closeResults();
    setTimeout(() => {
      if (afterId) document.getElementById(afterId)?.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  }

  return (
    <>
      <Header
        activePage={page}
        onHomeClick={() => go('home')}
        onMedicinesClick={() => go('medicines')}
        onHowClick={() => go('home', 'how')}
      />

      {page === 'home' && (
        <>
          <Hero onSearch={handleSearch} recent={recent} />
          <Categories activeCat={activeCat} onSelect={setActiveCat} />
          <HowItWorks />
          <MedicineGrid activeCat={activeCat} onCompare={handleCompare} gridRef={medsRef} />
        </>
      )}
      {page === 'medicines' && <MedicinesPage onCompare={handleCompare} />}

      <ResultsPanel med={selectedMed} query={lastQuery} onClose={closeResults} resultsRef={resultsRef} onSelect={handleCompare} />

      <footer className="footer">
        Tabslens — a college minor project prototype. Pharmacy names and prices shown are illustrative sample data, not real listings.
      </footer>
    </>
  );
}
