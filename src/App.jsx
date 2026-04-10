import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";

import Auth from "./pages/Auth";
import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import Checkout from "./pages/Checkout";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <div className="app">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/products/:id" element={<ProductDetails />} />
            </Routes>
          </div>
        </CartProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
