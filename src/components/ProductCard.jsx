import { useNavigate } from 'react-router-dom';
import StockBadge from './StockBadge';
import { getStockStatus } from '../utils/formatters';
import { Package } from 'lucide-react';

export default function ProductCard({ product, showActions = false }) {
  const navigate = useNavigate();
  const status = getStockStatus(product.quantity, product.minStock);

  return (
    <div
      className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 cursor-pointer active:bg-slate-50 transition-colors"
      onClick={() => navigate(`/products/${product.id}/edit`)}
    >
      <div className="bg-blue-50 rounded-xl p-2.5">
        <Package size={20} className="text-blue-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-800 truncate">{product.name}</p>
        <p className="text-sm text-slate-400">{product.unit || 'un'}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-xl font-bold text-slate-800">{product.quantity}</span>
        <StockBadge status={status} />
      </div>
    </div>
  );
}
