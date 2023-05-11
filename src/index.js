import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Home, Product, Products, AboutPage, ContactPage, Cart, Login, Register, Checkout, PageNotFound } from "./pages";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  function handleLogin() {
    console.log('handleLogin called');
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  }
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn) {
      setIsLoggedIn(storedIsLoggedIn === 'true');
    }
  }, []);

  console.log('isLoggedIn', isLoggedIn);

  return (
    <BrowserRouter>
      <Provider store={store}>

        <Routes>
          {!isLoggedIn && (
            <>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register onLogin={handleLogin} />} />
              <Route path="*" element={<PageNotFound />} />
            </>
          )}
          {isLoggedIn && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<PageNotFound />} />
            </>
          )}
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);