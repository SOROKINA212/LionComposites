import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Header.css';
import SubHeader from './SubHeader';
import { useAuth } from '../../AuthProvider';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({ products: [], categories: [] });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const toggleSearchDropdown = () => {
    setIsSearchDropdownOpen(prevState => !prevState);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleCart = () => {
    navigate('/cart');
  };

  const handleSearchInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() !== '') {
      fetchSearchResults(term);
      toggleSearchDropdown();
    } else {
      setSearchResults({ products: [], categories: [] });
      toggleSearchDropdown();
    }
  };

  const fetchSearchResults = async (term) => {
    try {
      const productsResponse = await axios.get(`http://localhost:8000/api/products/?search=${term}`);
      const categoriesResponse = await axios.get(`http://localhost:8000/api/categories/?search=${term}`);
      setSearchResults({
        products: productsResponse.data,
        categories: categoriesResponse.data,
      });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <header>
      <div className="logo">Lion Composites</div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Поиск"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        {isSearchDropdownOpen && (
          <div className="search-dropdown">
            {searchResults.products.length > 0 && (
              <>
                <div className="search-dropdown-header">Товары</div>
                {searchResults.products.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="search-dropdown-item"
                  >
                    {product.name}
                  </Link>
                ))}
              </>
            )}
            {searchResults.categories.length > 0 && (
              <>
                <div className="search-dropdown-header">Категории</div>
                {searchResults.categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/categories/${category.id}`}
                    className="search-dropdown-item"
                  >
                    {category.name}
                  </Link>
                ))}
              </>
            )}
            {searchResults.products.length === 0 && searchResults.categories.length === 0 && (
              <div className="search-dropdown-item">Ничего не найдено</div>
            )}
          </div>
        )}
      </div>
      <div className="icons">
        <span className="icon">🔍</span>
        <span className="icon">⚙️</span>
      </div>
      <div className="account-btn-container">
        <button className="account-btn" onClick={toggleDropdown}>
          Личный кабинет
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            {user ? (
              <>
                <button className="dropdown-item" onClick={handleCart}>Корзина</button>
                <button className="dropdown-item" onClick={handleLogout}>
                  Выйти
                </button>
              </>
            ) : (
              <button className="dropdown-item" onClick={handleLogin}>
                Войти
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;