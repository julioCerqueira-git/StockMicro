import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { formatDateTime } from '../utils/formatters';

export default function MovementItem({ movement }) {
  const isIn = movement.type === 'in';
  return (
    <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
      <div className={`rounded-xl p-2.5 ${isIn ? 'bg-green-50' : 'bg-red-50'}`}>
        {isIn
          ? <ArrowDownCircle size={20} className="text-green-500" />
          : <ArrowUpCircle size={20} className="text-red-500" />
        }
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-800 truncate">{movement.productName}</p>
        <p className="text-xs text-slate-400">{formatDateTime(movement.createdAt)}</p>
        {movement.note && <p className="text-xs text-slate-500 mt-0.5 truncate">{movement.note}</p>}
      </div>
      <span className={`text-lg font-bold ${isIn ? 'text-green-600' : 'text-red-500'}`}>
        {isIn ? '+' : '-'}{movement.quantity}
      </span>
    </div>
  );
}
