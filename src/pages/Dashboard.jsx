import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStock } from '../context/StockContext';
import AlertBanner from '../components/AlertBanner';
import WhatsAppExport from '../components/WhatsAppExport';
import StockBadge from '../components/StockBadge';
import { getStockStatus, daysSince } from '../utils/formatters';
import { ArrowDownCircle, ArrowUpCircle, Plus, TrendingDown, Settings, X, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const { state, dispatch } = useStock();
  const navigate = useNavigate();
  const { products, movements, settings } = state;

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsForm, setSettingsForm] = useState({
    alertInactivityDays: 3,
    whatsappEnabled: false,
    whatsappNumber: '',
  });

  useEffect(() => {
    if (settings) {
      setSettingsForm({
        alertInactivityDays: settings.alertInactivityDays ?? 3,
        whatsappEnabled: settings.whatsappEnabled ?? false,
        whatsappNumber: settings.whatsappNumber ?? '',
      });
    }
  }, [settings]);

  const lastActDate = movements.length > 0 ? movements[0].createdAt : null;
  const inactiveDays = lastActDate ? daysSince(lastActDate) : 0;
  const isInactive = lastActDate ? inactiveDays >= (settings?.alertInactivityDays ?? 3) : false;

  const outCounts = {};
  movements.filter(m => m.type === 'out').forEach(m => {
    outCounts[m.productId] = (outCounts[m.productId] || 0) + m.quantity;
  });
  const topProducts = products
    .filter(p => outCounts[p.id])
    .sort((a, b) => (outCounts[b.id] || 0) - (outCounts[a.id] || 0))
    .slice(0, 5);

  const total = products.length;
  const criticalCount = products.filter(p => p.quantity === 0).length;
  const lowCount = products.filter(p => p.quantity > 0 && p.quantity <= p.minStock).length;

  function handleSaveSettings() {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: {
        alertInactivityDays: Number(settingsForm.alertInactivityDays),
        whatsappEnabled: settingsForm.whatsappEnabled,
        whatsappNumber: settingsForm.whatsappNumber,
      }
    });
    setIsSettingsOpen(false);
  }

  return (
    <div className="pb-24 pt-4 px-4 min-h-screen bg-slate-50 relative">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Olá! 👋</h1>
          <p className="text-slate-400 text-sm">Veja como está seu estoque hoje</p>
        </div>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 rounded-xl bg-white shadow-sm border border-slate-100 text-slate-600 hover:text-slate-800 active:bg-slate-50 transition-colors"
          title="Configurações"
        >
          <Settings size={20} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
          <p className="text-2xl font-bold text-blue-600">{total}</p>
          <p className="text-xs text-slate-400 mt-0.5">Produtos</p>
        </div>
        <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
          <p className="text-2xl font-bold text-yellow-500">{lowCount}</p>
          <p className="text-xs text-slate-400 mt-0.5">Baixo</p>
        </div>
        <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
          <p className="text-2xl font-bold text-red-500">{criticalCount}</p>
          <p className="text-xs text-slate-400 mt-0.5">Crítico</p>
        </div>
      </div>

      {isInactive && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 mb-4">
          <AlertTriangle size={20} className="text-amber-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Alerta de Inatividade</p>
            <p className="text-xs text-amber-600 mt-0.5">
              Não há novas movimentações registradas há {inactiveDays} dias (limite configurado: {settings?.alertInactivityDays} dias).
            </p>
          </div>
        </div>
      )}

      <AlertBanner products={products} />

      <div className="mb-5">
        <p className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wide">Ações rápidas</p>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => navigate('/move?type=out')}
            className="bg-red-50 rounded-2xl p-4 flex flex-col items-center gap-2 active:bg-red-100 transition-colors"
          >
            <ArrowUpCircle size={24} className="text-red-500" />
            <span className="text-xs font-semibold text-red-600">Registrar Venda</span>
          </button>
          <button
            onClick={() => navigate('/move?type=in')}
            className="bg-green-50 rounded-2xl p-4 flex flex-col items-center gap-2 active:bg-green-100 transition-colors"
          >
            <ArrowDownCircle size={24} className="text-green-500" />
            <span className="text-xs font-semibold text-green-600">Entrada</span>
          </button>
          <button
            onClick={() => navigate('/products/new')}
            className="bg-blue-50 rounded-2xl p-4 flex flex-col items-center gap-2 active:bg-blue-100 transition-colors"
          >
            <Plus size={24} className="text-blue-500" />
            <span className="text-xs font-semibold text-blue-600">Novo Produto</span>
          </button>
        </div>
      </div>

      {topProducts.length > 0 && (
        <div className="mb-5">
          <p className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wide flex items-center gap-2">
            <TrendingDown size={14} /> Mais vendidos
          </p>
          <div className="flex flex-col gap-2">
            {topProducts.map(p => (
              <div key={p.id} className="bg-white rounded-2xl px-4 py-3 flex items-center justify-between shadow-sm">
                <span className="font-medium text-slate-700 text-sm">{p.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">{outCounts[p.id]} saídas</span>
                  <StockBadge status={getStockStatus(p.quantity, p.minStock)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {settings?.whatsappEnabled && (
        <WhatsAppExport products={products} settings={settings} />
      )}

      {/* Modal de Configurações */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-start justify-end p-4">
          <div className="bg-white rounded-l-3xl h-full w-full max-w-md p-6 shadow-xl animate-in slide-in-from-right duration-200">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-slate-800">Configurações</h2>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 rounded-lg text-slate-400 active:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Alerta de Inatividade (dias)
                </label>
                <input
                  type="number"
                  value={settingsForm.alertInactivityDays}
                  onChange={e => setSettingsForm(s => ({ ...s, alertInactivityDays: Math.max(1, Number(e.target.value)) }))}
                  min="1"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white transition-colors"
                />
              </div>

              <div className="flex items-center justify-between py-2 border-t border-b border-slate-100">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Notificações WhatsApp</p>
                  <p className="text-xs text-slate-400 mt-0.5">Enviar alertas diretamente a um número</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settingsForm.whatsappEnabled}
                    onChange={e => setSettingsForm(s => ({ ...s, whatsappEnabled: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>

              {settingsForm.whatsappEnabled && (
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                    Número do WhatsApp (com DDI e DDD)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsappNumber}
                    onChange={e => setSettingsForm(s => ({ ...s, whatsappNumber: e.target.value }))}
                    placeholder="Ex: 5511999999999"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white transition-colors"
                  />
                </div>
              )}

              <button
                onClick={handleSaveSettings}
                className="w-full bg-blue-600 active:bg-blue-700 text-white font-semibold py-3.5 rounded-2xl text-sm transition-colors mt-2"
              >
                Salvar Configurações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
