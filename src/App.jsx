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
        <div className="max-w-md mx-auto relative min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/:id/edit" element={<ProductForm />} />
            <Route path="/move" element={<Movement />} />
            <Route path="/history" element={<History />} />
          </Routes>
          <NavBar />
        </div>
      </BrowserRouter>
    </StockProvider>
  );
}
