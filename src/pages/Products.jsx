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

  const filtered = state.products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-24 pt-4 px-4 min-h-screen bg-slate-50">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-slate-800">Produtos</h1>
        <button
          onClick={() => navigate('/products/new')}
          className="bg-blue-600 text-white rounded-xl px-3 py-2 flex items-center gap-1.5 text-sm font-semibold active:bg-blue-700"
        >
          <Plus size={16} /> Novo
        </button>
      </div>

      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar produto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white rounded-xl pl-9 pr-4 py-3 text-sm shadow-sm outline-none border border-transparent focus:border-blue-300"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Package}
          title="Nenhum produto encontrado"
          description={search ? 'Tente outro termo de busca.' : 'Cadastre seu primeiro produto!'}
          action={
            !search && (
              <button
                onClick={() => navigate('/products/new')}
                className="bg-blue-600 text-white rounded-xl px-6 py-3 font-semibold text-sm"
              >
                Cadastrar produto
              </button>
            )
          }
        />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
