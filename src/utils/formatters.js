export function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatDateTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getStockStatus(quantity, minStock) {
  if (quantity === 0) return 'critical';
  if (quantity <= minStock) return 'low';
  return 'normal';
}

export function daysSince(isoString) {
  const then = new Date(isoString);
  const now = new Date();
  const diff = now - then;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
