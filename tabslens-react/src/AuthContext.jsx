import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // restore session on page load
  useEffect(() => {
    const saved = localStorage.getItem('tabslens_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (!user) { setFavorites([]); return; }
    const saved = localStorage.getItem('tabslens_favs_' + user.email);
    setFavorites(saved ? JSON.parse(saved) : []);
  }, [user]);

  function toggleFavorite(name) {
    const next = favorites.includes(name) ? favorites.filter((n) => n !== name) : [...favorites, name];
    setFavorites(next);
    localStorage.setItem('tabslens_favs_' + user.email, JSON.stringify(next));
  }

  function login(email, password) {
    // Mock check — replace with a real API call later.
    // For now, any non-empty email/password "succeeds".
    if (!email || !password) return { ok: false, error: 'Enter email and password' };
    const userData = { email };
    localStorage.setItem('tabslens_user', JSON.stringify(userData));
    setUser(userData);
    return { ok: true };
  }

  function logout() {
    localStorage.removeItem('tabslens_user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, favorites, toggleFavorite }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
