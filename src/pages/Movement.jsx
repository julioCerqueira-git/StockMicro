import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStock } from '../context/StockContext';
import { ArrowDownCircle, ArrowUpCircle, CheckCircle } from 'lucide-react';
import { getStockStatus } from '../utils/formatters';

export default function Movement() {
  const { state, dispatch } = useStock();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [type, setType] = useState(searchParams.get('type') || 'out');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [note, setNote] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { products } = state;
  const selectedProduct = products.find(p => p.id === productId);

  function handleSubmit() {
    if (!productId) { setError('Selecione um produto.'); return; }
    const qty = Number(quantity);
    if (!qty || qty <= 0) { setError('Quantidade deve ser maior que zero.'); return; }
    if (type === 'out' && selectedProduct && qty > selectedProduct.quantity) {
      setError(`Quantidade insuficiente. Disponível: ${selectedProduct.quantity}`);
      return;
    }
    dispatch({ type: 'ADD_MOVEMENT', payload: { productId, type, quantity: qty, note } });
    setSuccess(true);
    setTimeout(() => {
      setProductId('');
      setQuantity('1');
      setNote('');
      setSuccess(false);
      setError('');
    }, 1500);
  }

  const inputClass = "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-colors";
  const labelClass = "block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide";

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <div className="bg-green-100 rounded-full p-6">
          <CheckCircle size={48} className="text-green-500" />
        </div>
        <p className="text-xl font-bold text-slate-700">Registrado!</p>
        <p className="text-slate-400 text-sm">Movimentação salva com sucesso.</p>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-4 px-4 min-h-screen bg-slate-50">
      <h1 className="text-xl font-bold text-slate-800 mb-5">Movimentação</h1>

      {/* Tipo */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <button
          onClick={() => setType('out')}
          className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-colors ${
            type === 'out' ? 'bg-red-500 text-white' : 'bg-white text-slate-500 shadow-sm'
          }`}
        >
          <ArrowUpCircle size={18} /> Saída / Venda
        </button>
        <button
          onClick={() => setType('in')}
          className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-colors ${
            type === 'in' ? 'bg-green-500 text-white' : 'bg-white text-slate-500 shadow-sm'
          }`}
        >
          <ArrowDownCircle size={18} /> Entrada
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>Produto *</label>
          <select
            value={productId}
            onChange={e => { setProductId(e.target.value); setError(''); }}
            className={inputClass}
          >
            <option value="">Selecione um produto...</option>
            {products.map(p => {
              const status = getStockStatus(p.quantity, p.minStock);
              const emoji = status === 'critical' ? '🔴' : status === 'low' ? '🟡' : '🟢';
              return (
                <option key={p.id} value={p.id}>
                  {emoji} {p.name} — {p.quantity} {p.unit || 'un'}
                </option>
              );
            })}
          </select>
        </div>

        {selectedProduct && (
          <div className="bg-blue-50 rounded-xl px-4 py-3 text-sm text-blue-700">
            Estoque atual: <strong>{selectedProduct.quantity} {selectedProduct.unit || 'un'}</strong>
          </div>
        )}

        <div>
          <label className={labelClass}>Quantidade *</label>
          <input
            type="number"
            value={quantity}
            onChange={e => { setQuantity(e.target.value); setError(''); }}
            min="1"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Observação (opcional)</label>
          <input
            type="text"
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Ex: Venda para cliente João"
            className={inputClass}
          />
        </div>

        <button
          onClick={handleSubmit}
          className={`w-full text-white font-semibold py-4 rounded-2xl text-base transition-colors mt-2 ${
            type === 'out' ? 'bg-red-500 active:bg-red-600' : 'bg-green-500 active:bg-green-600'
          }`}
        >
          {type === 'out' ? 'Registrar Saída' : 'Registrar Entrada'}
        </button>
      </div>
    </div>
  );
}
