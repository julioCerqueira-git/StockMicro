import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStock } from '../context/StockContext';
import { ChevronLeft, Trash2 } from 'lucide-react';

export default function ProductForm() {
  const { state, dispatch } = useStock();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const existing = isEdit ? state.products.find((p) => p.id === id) : null;

  const [form, setForm] = useState({
    name: existing?.name || '',
    unit: existing?.unit || 'un',
    quantity: existing?.quantity ?? 0,
    minStock: existing?.minStock ?? 5,
    category: existing?.category || '',
  });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit() {
    if (!form.name.trim()) { setError('O nome do produto é obrigatório.'); return; }
    const payload = { ...form, quantity: Number(form.quantity), minStock: Number(form.minStock) };
    if (isEdit) {
      dispatch({ type: 'EDIT_PRODUCT', payload: { id, ...payload } });
    } else {
      dispatch({ type: 'ADD_PRODUCT', payload });
    }
    navigate('/products');
  }

  function handleDelete() {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    dispatch({ type: 'DELETE_PRODUCT', payload: { id } });
    navigate('/products');
  }

  const inputClass =
    'w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-colors';
  const labelClass =
    'block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest';

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-white shadow-sm border border-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-slate-800">
          {isEdit ? 'Editar Produto' : 'Novo Produto'}
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4 max-w-lg">
        <div>
          <label className={labelClass}>Nome *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ex: Arroz 5kg"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Unidade</label>
            <select name="unit" value={form.unit} onChange={handleChange} className={inputClass}>
              {['un', 'pct', 'cx', 'kg', 'l', 'g', 'ml', 'dz'].map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Categoria</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Ex: Alimentos"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Qtd. Atual</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              min="0"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Estoque Mínimo</label>
            <input
              type="number"
              name="minStock"
              value={form.minStock}
              onChange={handleChange}
              min="0"
              className={inputClass}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl text-sm transition-colors mt-1"
        >
          {isEdit ? 'Salvar alterações' : 'Cadastrar produto'}
        </button>

        {isEdit && (
          <button
            onClick={handleDelete}
            className={`w-full flex items-center justify-center gap-2 font-semibold py-4 rounded-2xl text-sm transition-colors ${
              confirmDelete
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-red-50 text-red-500 hover:bg-red-100'
            }`}
          >
            <Trash2 size={16} />
            {confirmDelete ? 'Confirmar exclusão' : 'Excluir produto'}
          </button>
        )}
        {confirmDelete && (
          <button
            onClick={() => setConfirmDelete(false)}
            className="w-full text-slate-400 text-sm py-2 hover:text-slate-600 transition-colors"
          >
            Cancelar exclusão
          </button>
        )}
      </div>
    </div>
  );
}
