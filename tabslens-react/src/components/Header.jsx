import { useState } from 'react';
import { useAuth } from '../AuthContext.jsx';
import LoginModal from './LoginModal.jsx';

export default function Header({ onHomeClick, onMedicinesClick, onHowClick, activePage }) {
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header className="header">
      <div className="wrap nav">
        <div className="logo" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
          TABSLENS<span className="dot">.</span>
        </div>
        <nav className="navlinks">
          <a
            href="#"
            className={activePage === 'home' ? 'nav-active' : ''}
            onClick={(e) => { e.preventDefault(); onHomeClick(); }}
          >
            Home
          </a>
          <a
            href="#"
            className={activePage === 'medicines' ? 'nav-active' : ''}
            onClick={(e) => { e.preventDefault(); onMedicinesClick(); }}
          >
            Medicines
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); onHowClick(); }}>How It Works</a>
        </nav>
        {user ? (
          <button className="login-btn" onClick={logout}>Log out ({user.email})</button>
        ) : (
          <button className="login-btn" onClick={() => setShowLogin(true)}>Log in</button>
        )}
      </div>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </header>
  );
}
