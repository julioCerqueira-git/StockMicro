import { MessageCircle } from 'lucide-react';
import { getStockStatus } from '../utils/formatters';

export default function WhatsAppExport({ products, settings }) {
  const alertProducts = products.filter(p => {
    const s = getStockStatus(p.quantity, p.minStock);
    return s === 'low' || s === 'critical';
  });

  function handleExport() {
    if (alertProducts.length === 0) return;
    const lines = alertProducts.map(p => {
      const status = p.quantity === 0 ? '🔴 SEM ESTOQUE' : '🟡 Estoque baixo';
      return `• ${p.name}: ${p.quantity} ${p.unit || 'un'} — ${status}`;
    });
    const text = `📦 *Alerta de Estoque*\n\n${lines.join('\n')}\n\n_Verificar reposição necessária._`;
    
    // Se houver número configurado, envia direto para ele (removendo caracteres não numéricos exceto dígitos)
    const number = settings?.whatsappNumber ? settings.whatsappNumber.replace(/\D/g, '') : '';
    const baseUrl = number ? `https://wa.me/${number}` : 'https://wa.me/';
    const url = `${baseUrl}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  return (
    <button
      onClick={handleExport}
      disabled={alertProducts.length === 0}
      className="w-full flex items-center justify-center gap-2 bg-green-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold py-3 rounded-2xl transition-colors active:bg-green-600"
    >
      <MessageCircle size={20} />
      Enviar alerta via WhatsApp ({alertProducts.length})
    </button>
  );
}
