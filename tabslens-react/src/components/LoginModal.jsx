import { useState } from 'react';
import { useAuth } from '../AuthContext.jsx';

export default function LoginModal({ onClose }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const result = login(email, password);
    if (result.ok) onClose();
    else setError(result.error);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-brand">TABSLENS<span className="dot">.</span></div>
        <h3 className="modal-title">Welcome back</h3>
        <p className="modal-subtitle">Log in to save medicines and track prices.</p>

        <form onSubmit={handleSubmit} className="modal-form">
          <label className="field-label">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="field-label">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="modal-submit">Log in</button>
        </form>

        <p className="modal-footnote">Demo login — any email &amp; password works.</p>
      </div>
    </div>
  );
}
