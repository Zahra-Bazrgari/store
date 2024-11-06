import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import Navbar from './components/Navbar';
import CategoryPage from './pages/CategoryPage';
import CheckoutPage from './pages/CheckOutPage';

const client = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Navbar />
        <div className='pt-16'>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/:id' element={<ProductPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/category/:slug' element={<CategoryPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
