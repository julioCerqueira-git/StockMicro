import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStock } from '../context/StockContext';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/EmptyState';
import { Package, Plus, Search } from 'lucide-react';

export default function Products() {
  const { state } = useStock();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = state.products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-screen-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold text-slate-800">Produtos</h1>
        <button
          onClick={() => navigate('/products/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 flex items-center gap-1.5 text-sm font-semibold transition-colors"
        >
          <Plus size={16} /> Novo
        </button>
      </div>

      {/* Busca */}
      <div className="relative mb-5">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white rounded-xl pl-10 pr-4 py-3 text-sm shadow-sm border border-transparent outline-none focus:border-blue-300 transition-colors"
        />
      </div>

      {/* Lista */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Package}
          title="Nenhum produto encontrado"
          description={search ? 'Tente outro termo de busca.' : 'Cadastre seu primeiro produto!'}
          action={
            !search
              ? {
                  label: 'Cadastrar produto',
                  onClick: () => navigate('/products/new'),
                }
              : null
          }
        />
      ) : (
        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
