import { Link } from 'react-router-dom';
import './HomePage.css';

export function HomePage() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-emoji">🐱</div>
        <h1>Gatinhos do Parque</h1>
        <p className="hero-subtitle">
          Adote um amigo peludo e transforme duas vidas. Nossos gatinhos aguardam por um lar cheio
          de amor.
        </p>
        <Link to="/cats" className="btn btn-primary">
          Ver Gatinhos Disponíveis
        </Link>
      </section>

      <section className="features">
        <div className="feature-card">
          <span className="feature-icon">🏠</span>
          <h3>Adoção Responsável</h3>
          <p>Processo transparente para garantir o melhor lar para cada gatinho.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">💉</span>
          <h3>Saúde em Dia</h3>
          <p>Todos os gatos são vacinados e acompanhados por veterinários.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">❤️</span>
          <h3>Suporte Pós-Adoção</h3>
          <p>Continuamos ao seu lado após a adoção para tirar dúvidas.</p>
        </div>
      </section>
    </div>
  );
}
