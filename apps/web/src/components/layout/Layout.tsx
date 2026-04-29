import { Outlet, Link, useLocation } from 'react-router-dom';
import './Layout.css';

export function Layout() {
  const location = useLocation();

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            🐱 Gatinhos do Parque
          </Link>
          <nav className="nav">
            <Link to="/cats" className={location.pathname.startsWith('/cats') ? 'active' : ''}>
              Gatinhos
            </Link>
            <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
              Entrar
            </Link>
          </nav>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Gatinhos do Parque — Feito com ❤️ para os gatinhos</p>
      </footer>
    </div>
  );
}
