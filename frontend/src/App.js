import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './pages/product_page/product_page';
import ProductDetail from './pages/product_page/ProductDetail'; // Новый компонент
import RegistrationForm from './pages/registration_form/RegistrationForm';
import LoginForm from './pages/registration_form/LoginForm';
import { AuthProvider } from './AuthProvider';
import AboutUs from './pages/about/AboutUs';
import Delivery from './pages/delivery_page/Delivery';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} /> {/* Новый маршрут */}
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/delivery" element={<Delivery />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
