import { authService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

export function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Painel de Administração</h1>
        <button onClick={handleLogout} className="admin-logout-btn">
          Sair
        </button>
      </div>
      <div className="admin-grid">
        {[
          { label: 'Gerenciar Gatinhos', emoji: '🐱', path: '/cats' },
          { label: 'Adoções Pendentes', emoji: '📋', path: '/cats' },
          { label: 'Usuários', emoji: '👥', path: '/cats' },
        ].map((item) => (
          <div key={item.label} onClick={() => navigate(item.path)} className="admin-card">
            <span className="admin-card-emoji">{item.emoji}</span>
            <h3>{item.label}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
