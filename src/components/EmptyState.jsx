export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {Icon && (
        <div className="bg-slate-100 rounded-full p-5 mb-4">
          <Icon size={32} className="text-slate-400" />
        </div>
      )}
      <h3 className="font-semibold text-slate-700 text-lg mb-1">{title}</h3>
      {description && <p className="text-slate-400 text-sm mb-6">{description}</p>}
      {action && (
        <button
          onClick={action.onClick}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold active:bg-blue-700"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
