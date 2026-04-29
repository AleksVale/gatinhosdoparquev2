import { authService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

export function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="admin-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Painel de Administração</h1>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', cursor: 'pointer', border: '1px solid #e7e5e4', borderRadius: '0.5rem', background: 'white' }}>
          Sair
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {[
          { label: 'Gerenciar Gatinhos', emoji: '🐱', path: '/cats' },
          { label: 'Adoções Pendentes', emoji: '📋', path: '/cats' },
          { label: 'Usuários', emoji: '👥', path: '/cats' },
        ].map((item) => (
          <div
            key={item.label}
            onClick={() => navigate(item.path)}
            style={{ background: 'white', border: '1px solid #e7e5e4', borderRadius: '0.5rem', padding: '1.5rem', textAlign: 'center', cursor: 'pointer', boxShadow: '0 1px 3px rgb(0 0 0 / 0.1)', transition: 'box-shadow 0.2s' }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{item.emoji}</div>
            <h3 style={{ fontWeight: 600 }}>{item.label}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
