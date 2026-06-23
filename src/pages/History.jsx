import { useState } from 'react';
import { useStock } from '../context/StockContext';
import MovementItem from '../components/MovementItem';
import EmptyState from '../components/EmptyState';
import { Clock } from 'lucide-react';

export default function History() {
  const { state } = useStock();
  const [filter, setFilter] = useState('all');

  const filtered = state.movements.filter(m => {
    if (filter === 'all') return true;
    return m.type === filter;
  });

  return (
    <div className="pb-24 pt-4 px-4 min-h-screen bg-slate-50">
      <h1 className="text-xl font-bold text-slate-800 mb-4">Histórico</h1>

      {/* Filtros */}
      <div className="flex gap-2 mb-4">
        {[
          { key: 'all', label: 'Todos' },
          { key: 'out', label: 'Saídas' },
          { key: 'in', label: 'Entradas' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
              filter === f.key
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-500 shadow-sm'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Clock}
          title="Nenhuma movimentação"
          description="Registre entradas e saídas de produtos."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(m => (
            <MovementItem key={m.id} movement={m} />
          ))}
        </div>
      )}
    </div>
  );
}
