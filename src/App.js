import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './template/Header';
import Footer from './template/Footer';
import ProductDetail from './products/detail/ProductDetail';
import Landing from './landing/Landing';
import ProductList from './products/ProductList';
import AdminDashboard from './admin/AdminDashboard';
import LoginPage from './admin/LoginPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<><Header /><Landing /><Footer /></>} />
        <Route path="/products" element={<><Header /><ProductList /><Footer /></>} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/products/:slug" element={<><Header /><ProductDetail /><Footer /></>} />
      </Routes>
    </>
  );
}

export default App;
