export default function StockBadge({ status }) {
  const config = {
    normal: { label: 'Normal', className: 'bg-green-100 text-green-700' },
    low: { label: 'Baixo', className: 'bg-yellow-100 text-yellow-700' },
    critical: { label: 'Crítico', className: 'bg-red-100 text-red-700' },
  };
  const { label, className } = config[status] || config.normal;

  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${className}`}>
      {label}
    </span>
  );
}
