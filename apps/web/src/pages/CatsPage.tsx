import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCats } from '../hooks/useCats';
import { CatCard } from '../components/ui/CatCard';
import './CatsPage.css';

const STATUS_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 'AVAILABLE', label: 'Disponíveis' },
  { value: 'ADOPTED', label: 'Adotados' },
  { value: 'RESERVED', label: 'Reservados' },
  { value: 'IN_TREATMENT', label: 'Em Tratamento' },
];

const GENDER_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 'MALE', label: 'Macho' },
  { value: 'FEMALE', label: 'Fêmea' },
];

export function CatsPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useCats({
    page,
    limit: 12,
    status: status || undefined,
    gender: gender || undefined,
  });

  return (
    <div className="cats-page">
      <div className="cats-header">
        <h1>Nossos Gatinhos</h1>
        <div className="filters">
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <select value={gender} onChange={(e) => { setGender(e.target.value); setPage(1); }}>
            {GENDER_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {isLoading && <div className="loading">Carregando gatinhos... 🐱</div>}
      {isError && <div className="error">Erro ao carregar os gatinhos. Tente novamente.</div>}

      {data && (
        <>
          <div className="cats-grid">
            {data.data.map((cat) => (
              <CatCard key={cat.id} cat={cat} onClick={() => navigate(`/cats/${cat.id}`)} />
            ))}
          </div>
          {data.data.length === 0 && (
            <p className="empty">Nenhum gatinho encontrado com os filtros selecionados.</p>
          )}
          <div className="pagination">
            <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>← Anterior</button>
            <span>Página {page} de {data.meta.totalPages}</span>
            <button disabled={page >= data.meta.totalPages} onClick={() => setPage((p) => p + 1)}>
              Próxima →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
