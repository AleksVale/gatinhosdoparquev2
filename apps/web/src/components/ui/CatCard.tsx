import type { CatResponseDto } from '@repo/types';
import './CatCard.css';

interface CatCardProps {
  cat: CatResponseDto;
  onClick?: () => void;
}

const statusLabel: Record<string, string> = {
  AVAILABLE: 'Disponível',
  ADOPTED: 'Adotado',
  IN_TREATMENT: 'Em tratamento',
  RESERVED: 'Reservado',
};

const statusClass: Record<string, string> = {
  AVAILABLE: 'status-available',
  ADOPTED: 'status-adopted',
  IN_TREATMENT: 'status-treatment',
  RESERVED: 'status-reserved',
};

export function CatCard({ cat, onClick }: CatCardProps) {
  return (
    <div className="cat-card" onClick={onClick} role="button" tabIndex={0}>
      <div className="cat-card-image">
        {cat.imageUrl ? (
          <img src={cat.imageUrl} alt={cat.name} loading="lazy" />
        ) : (
          <div className="cat-card-placeholder">🐱</div>
        )}
        <span className={`cat-card-status ${statusClass[cat.status] ?? ''}`}>
          {statusLabel[cat.status] ?? cat.status}
        </span>
      </div>
      <div className="cat-card-body">
        <h3>{cat.name}</h3>
        <p className="cat-card-meta">
          {cat.breed ?? 'Vira-lata'} • {cat.age === 0 ? 'Filhote' : `${cat.age} ${cat.age === 1 ? 'ano' : 'anos'}`} •{' '}
          {cat.gender === 'MALE' ? '♂ Macho' : '♀ Fêmea'}
        </p>
        <p className="cat-card-desc">{cat.description}</p>
        <div className="cat-card-badges">
          {cat.isVaccinated && <span className="badge badge-green">Vacinado</span>}
          {cat.isNeutered && <span className="badge badge-blue">Castrado</span>}
        </div>
      </div>
    </div>
  );
}
