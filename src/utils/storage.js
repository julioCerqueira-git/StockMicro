const KEYS = {
  products: 'stockmicro:products',
  movements: 'stockmicro:movements',
  settings: 'stockmicro:settings',
};

export function loadProducts() {
  try {
    const data = localStorage.getItem(KEYS.products);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveProducts(products) {
  localStorage.setItem(KEYS.products, JSON.stringify(products));
}

export function loadMovements() {
  try {
    const data = localStorage.getItem(KEYS.movements);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveMovements(movements) {
  localStorage.setItem(KEYS.movements, JSON.stringify(movements));
}

export function loadSettings() {
  try {
    const data = localStorage.getItem(KEYS.settings);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveSettings(settings) {
  localStorage.setItem(KEYS.settings, JSON.stringify(settings));
}
