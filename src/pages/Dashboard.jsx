import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStock } from '../context/StockContext';
import AlertBanner from '../components/AlertBanner';
import WhatsAppExport from '../components/WhatsAppExport';
import StockBadge from '../components/StockBadge';
import { getStockStatus, daysSince } from '../utils/formatters';
import {
  ArrowDownCircle, ArrowUpCircle, Plus, TrendingDown,
  Settings, X, AlertTriangle,
} from 'lucide-react';

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
  const isInactive = lastActDate
    ? inactiveDays >= (settings?.alertInactivityDays ?? 3)
    : false;

  const outCounts = {};
  movements
    .filter((m) => m.type === 'out')
    .forEach((m) => {
      outCounts[m.productId] = (outCounts[m.productId] || 0) + m.quantity;
    });
  const topProducts = products
    .filter((p) => outCounts[p.id])
    .sort((a, b) => (outCounts[b.id] || 0) - (outCounts[a.id] || 0))
    .slice(0, 5);

  const total = products.length;
  const criticalCount = products.filter((p) => p.quantity === 0).length;
  const lowCount = products.filter(
    (p) => p.quantity > 0 && p.quantity <= p.minStock
  ).length;

  function handleSaveSettings() {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: {
        alertInactivityDays: Number(settingsForm.alertInactivityDays),
        whatsappEnabled: settingsForm.whatsappEnabled,
        whatsappNumber: settingsForm.whatsappNumber,
      },
    });
    setIsSettingsOpen(false);
  }

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-screen-xl">

      {/* ── Header ───────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Olá! 👋</h1>
          <p className="text-sm text-slate-400 mt-0.5">Veja como está seu estoque hoje</p>
        </div>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 rounded-xl bg-white shadow-sm border border-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* ── Desktop: 2 colunas | Mobile: 1 coluna ────────────── */}
      <div className="flex flex-col xl:flex-row xl:items-start gap-6">

        {/* Coluna Principal */}
        <div className="flex-1 min-w-0 flex flex-col gap-5">

          {/* Stats — sempre 3 colunas */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-blue-600">{total}</p>
              <p className="text-xs text-slate-400 mt-1">Produtos</p>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-amber-500">{lowCount}</p>
              <p className="text-xs text-slate-400 mt-1">Baixo</p>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-red-500">{criticalCount}</p>
              <p className="text-xs text-slate-400 mt-1">Crítico</p>
            </div>
          </div>

          {/* Alerta de inatividade */}
          {isInactive && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
              <AlertTriangle size={20} className="text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-800">Alerta de Inatividade</p>
                <p className="text-xs text-amber-600 mt-0.5">
                  Não há novas movimentações há {inactiveDays} dias (limite: {settings?.alertInactivityDays} dias).
                </p>
              </div>
            </div>
          )}

          {/* Alertas de estoque */}
          <AlertBanner products={products} />

          {/* Ações rápidas — sempre 3 colunas */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Ações rápidas
            </p>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => navigate('/move?type=out')}
                className="bg-red-50 hover:bg-red-100 active:scale-95 rounded-2xl p-4 md:p-5 flex flex-col items-center gap-2 transition-all"
              >
                <ArrowUpCircle size={26} className="text-red-500" />
                <span className="text-xs font-semibold text-red-600 text-center leading-tight">
                  Registrar Venda
                </span>
              </button>
              <button
                onClick={() => navigate('/move?type=in')}
                className="bg-green-50 hover:bg-green-100 active:scale-95 rounded-2xl p-4 md:p-5 flex flex-col items-center gap-2 transition-all"
              >
                <ArrowDownCircle size={26} className="text-green-500" />
                <span className="text-xs font-semibold text-green-600 text-center leading-tight">
                  Entrada
                </span>
              </button>
              <button
                onClick={() => navigate('/products/new')}
                className="bg-blue-50 hover:bg-blue-100 active:scale-95 rounded-2xl p-4 md:p-5 flex flex-col items-center gap-2 transition-all"
              >
                <Plus size={26} className="text-blue-500" />
                <span className="text-xs font-semibold text-blue-600 text-center leading-tight">
                  Novo Produto
                </span>
              </button>
            </div>
          </div>

          {/* Mais vendidos (mobile — abaixo das ações) */}
          {topProducts.length > 0 && (
            <div className="xl:hidden">
              <SidePanel topProducts={topProducts} outCounts={outCounts} />
            </div>
          )}

          {/* WhatsApp (mobile) */}
          {settings?.whatsappEnabled && (
            <div className="xl:hidden">
              <WhatsAppExport products={products} settings={settings} />
            </div>
          )}
        </div>

        {/* Coluna Lateral — só no desktop (xl+) */}
        <div className="hidden xl:flex flex-col gap-5 w-80 flex-shrink-0">
          {topProducts.length > 0 && (
            <SidePanel topProducts={topProducts} outCounts={outCounts} />
          )}
          {settings?.whatsappEnabled && (
            <WhatsAppExport products={products} settings={settings} />
          )}
        </div>
      </div>

      {/* ── Modal de Configurações ────────────────────────────── */}
      {isSettingsOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-start justify-end"
          onClick={() => setIsSettingsOpen(false)}
        >
          <div
            className="bg-white w-full max-w-sm h-full shadow-2xl flex flex-col md:rounded-l-3xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">Configurações</h2>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-5 p-6">
              {/* Inatividade */}
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
                  Alerta de Inatividade (dias)
                </label>
                <input
                  type="number"
                  value={settingsForm.alertInactivityDays}
                  onChange={(e) =>
                    setSettingsForm((s) => ({
                      ...s,
                      alertInactivityDays: Math.max(1, Number(e.target.value)),
                    }))
                  }
                  min="1"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white transition-colors"
                />
              </div>

              {/* WhatsApp Toggle */}
              <div className="flex items-center justify-between py-3 border-t border-b border-slate-100">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Notificações WhatsApp</p>
                  <p className="text-xs text-slate-400 mt-0.5">Enviar alertas a um número</p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settingsForm.whatsappEnabled}
                    onChange={(e) =>
                      setSettingsForm((s) => ({ ...s, whatsappEnabled: e.target.checked }))
                    }
                    className="toggle-input sr-only"
                  />
                  <span className="toggle-track" />
                </label>
              </div>

              {/* WhatsApp Number */}
              {settingsForm.whatsappEnabled && (
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
                    Número (com DDI e DDD)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsappNumber}
                    onChange={(e) =>
                      setSettingsForm((s) => ({ ...s, whatsappNumber: e.target.value }))
                    }
                    placeholder="Ex: 5511999999999"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white transition-colors"
                  />
                </div>
              )}

              <button
                onClick={handleSaveSettings}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-2xl text-sm transition-colors mt-1"
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

/* Painel lateral: Mais Vendidos */
function SidePanel({ topProducts, outCounts }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
        <TrendingDown size={13} /> Mais vendidos
      </p>
      <div className="flex flex-col gap-2">
        {topProducts.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
          >
            <span className="text-sm font-medium text-slate-700 truncate">{p.name}</span>
            <div className="flex items-center gap-2 ml-2 flex-shrink-0">
              <span className="text-xs text-slate-400">{outCounts[p.id]} saídas</span>
              <StockBadge status={getStockStatus(p.quantity, p.minStock)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
