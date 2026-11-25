import { useAuth } from '../AuthContext.jsx';

export default function FavButton({ medName }) {
  const { user, favorites, toggleFavorite } = useAuth();
  const active = favorites.includes(medName);

  function handleClick(e) {
    e.stopPropagation(); // don't open the comparison panel
    if (!user) { alert('Please log in to save favorites'); return; }
    toggleFavorite(medName);
  }

  return (
    <button className={'fav-btn' + (active ? ' active' : '')} title={user ? 'Save to favorites' : 'Log in to save'} onClick={handleClick}>
      {active ? '♥' : '♡'}
    </button>
  );
}
