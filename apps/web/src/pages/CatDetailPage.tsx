import { useParams, useNavigate } from 'react-router-dom';
import { useCat } from '../hooks/useCats';
import './CatDetailPage.css';

export function CatDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: cat, isLoading, isError } = useCat(id ?? '');

  if (isLoading) return <div className="loading">Carregando... 🐱</div>;
  if (isError || !cat) return <div className="error">Gatinho não encontrado.</div>;

  return (
    <div className="cat-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>← Voltar</button>
      <div className="cat-detail-content">
        <div className="cat-detail-image">
          {cat.imageUrl ? (
            <img src={cat.imageUrl} alt={cat.name} />
          ) : (
            <div className="cat-detail-placeholder">🐱</div>
          )}
        </div>
        <div className="cat-detail-info">
          <h1>{cat.name}</h1>
          <p className="cat-detail-meta">
            {cat.breed ?? 'Vira-lata'} •{' '}
            {cat.age === 0 ? 'Filhote' : `${cat.age} ${cat.age === 1 ? 'ano' : 'anos'}`} •{' '}
            {cat.gender === 'MALE' ? '♂ Macho' : '♀ Fêmea'}
            {cat.weight ? ` • ${cat.weight}kg` : ''}
          </p>
          <div className="cat-detail-badges">
            {cat.isVaccinated && <span className="badge badge-green">✓ Vacinado</span>}
            {cat.isNeutered && <span className="badge badge-blue">✓ Castrado</span>}
          </div>
          <p className="cat-detail-desc">{cat.description}</p>
          {cat.status === 'AVAILABLE' && (
            <button className="btn btn-adopt">❤️ Quero Adotar</button>
          )}
          {cat.status !== 'AVAILABLE' && (
            <p className="cat-detail-unavailable">
              Este gatinho não está disponível para adoção no momento.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
