import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StockProvider } from './context/StockContext';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductForm from './pages/ProductForm';
import Movement from './pages/Movement';
import History from './pages/History';

export default function App() {
  return (
    <StockProvider>
      <BrowserRouter>
        {/* Layout: sidebar fixa no desktop, bottom bar no mobile */}
        <div className="flex min-h-screen bg-slate-50">
          <NavBar />
          {/* md:ml-60 compensa a sidebar de 240px */}
          <main className="flex-1 md:ml-60 pb-16 md:pb-0 w-0 min-w-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/new" element={<ProductForm />} />
              <Route path="/products/:id/edit" element={<ProductForm />} />
              <Route path="/move" element={<Movement />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </StockProvider>
  );
}
