import { AlertTriangle, XCircle } from 'lucide-react';

export default function AlertBanner({ products }) {
  const critical = products.filter(p => p.quantity === 0);
  const low = products.filter(p => p.quantity > 0 && p.quantity <= p.minStock);

  if (critical.length === 0 && low.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 mb-4">
      {critical.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-3 flex items-start gap-3">
          <XCircle size={20} className="text-red-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-red-700">Sem estoque!</p>
            <p className="text-xs text-red-500">{critical.map(p => p.name).join(', ')}</p>
          </div>
        </div>
      )}
      {low.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-3 flex items-start gap-3">
          <AlertTriangle size={20} className="text-yellow-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-yellow-700">Estoque baixo</p>
            <p className="text-xs text-yellow-600">{low.map(p => p.name).join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
