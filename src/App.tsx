import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Shop } from './pages/Shop'
import { Product } from './pages/Product'
import { Cart } from './pages/Cart'
import { Checkout } from './pages/Checkout'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Delivery } from './pages/Delivery'

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="magazin" element={<Shop />} />
            <Route path="produs/:slug" element={<Product />} />
            <Route path="cos" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="despre" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="livrare" element={<Delivery />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}
