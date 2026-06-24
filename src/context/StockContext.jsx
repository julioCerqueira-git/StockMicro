import { createContext, useContext, useReducer, useEffect } from 'react';
import { generateId } from '../utils/uuid';
import {
  loadProducts, saveProducts,
  loadMovements, saveMovements,
  loadSettings, saveSettings,
} from '../utils/storage';

const StockContext = createContext(null);

const INITIAL_PRODUCTS = [];

const INITIAL_SETTINGS = {
  alertInactivityDays: 3,
  lastOpenedAt: new Date().toISOString(),
  whatsappEnabled: false,
  whatsappNumber: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_DATA':
      return { ...state, ...action.payload };

    case 'ADD_PRODUCT': {
      const newProduct = {
        id: generateId(),
        ...action.payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return { ...state, products: [...state.products, newProduct] };
    }

    case 'EDIT_PRODUCT': {
      const products = state.products.map(p =>
        p.id === action.payload.id
          ? { ...p, ...action.payload, updatedAt: new Date().toISOString() }
          : p
      );
      return { ...state, products };
    }

    case 'DELETE_PRODUCT': {
      const products = state.products.filter(p => p.id !== action.payload.id);
      const movements = state.movements.filter(m => m.productId !== action.payload.id);
      return { ...state, products, movements };
    }

    case 'ADD_MOVEMENT': {
      const { productId, type, quantity, note } = action.payload;
      const movement = {
        id: generateId(),
        productId,
        productName: state.products.find(p => p.id === productId)?.name || '',
        type,
        quantity: Number(quantity),
        note: note || '',
        createdAt: new Date().toISOString(),
      };

      const products = state.products.map(p => {
        if (p.id !== productId) return p;
        const newQty = type === 'in'
          ? p.quantity + Number(quantity)
          : Math.max(0, p.quantity - Number(quantity));
        return { ...p, quantity: newQty, updatedAt: new Date().toISOString() };
      });

      return {
        ...state,
        products,
        movements: [movement, ...state.movements],
      };
    }

    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };

    default:
      return state;
  }
}

export function StockProvider({ children }) {
  // Initialize with empty data to start the app without seeded products or movements
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    movements: [],
    settings: loadSettings() || INITIAL_SETTINGS,
  });

  // Persist any changes to products and movements
  useEffect(() => {
    saveProducts(state.products);
  }, [state.products]);

  useEffect(() => {
    saveMovements(state.movements);
  }, [state.movements]);

  // On first render, clear any previously stored products/movements to ensure a clean start
  useEffect(() => {
    if (state.products.length === 0 && state.movements.length === 0) {
      saveProducts([]);
      saveMovements([]);
    }
  }, []);

  useEffect(() => {
    saveSettings(state.settings);
  }, [state.settings]);

  return (
    <StockContext.Provider value={{ state, dispatch }}>
      {children}
    </StockContext.Provider>
  );
}

export function useStock() {
  const ctx = useContext(StockContext);
  if (!ctx) throw new Error('useStock deve ser usado dentro de StockProvider');
  return ctx;
}
