import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubHeader from './SubHeader';
import { useAuth } from '../../AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import './Header.css';

const HeaderContainer = styled.header`
  background-color: #333;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.2);
  position: relative;
`;

const Logo = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  color: #fff;
`;

const SearchBar = styled.div`
  position: relative;
  width: 50%;

  input {
    width: 100%;
    padding: 5px;
    border-radius: 4px;
    border: none;
  }
`;

const Icons = styled.div`
  margin-right: 10px;

  .icon {
    font-size: 20px;
    margin-right: 40px;
    color: #fff;
  }
`;

const AccountBtnContainer = styled.div`
  position: relative;
`;

const AccountBtn = styled.button`
  height: 100%;
  background-color: #F0F0F0;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 0;
  cursor: pointer;

  &:hover {
    background-color: #D0D0D0;
  }
`;

const DropdownMenu = styled.div`
  width: 100%;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const DropdownItem = styled.button`
  display: block;
  padding: 5px 0;
  cursor: pointer;
`;

const AccountButton = styled.button`
    background: #F7941E;
`;

const SearchDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #353333;
  border-radius: 0 0 20px 20px;
  box-shadow: 0px 9px 28.3px rgba(0, 0, 0, 0.8);
  z-index: 999;
  max-height: 300px;
  overflow-y: auto;
`;

const SearchDropdownHeader = styled.div`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #F0F0F0;
  padding: 10px;
  border-bottom: 1px solid #F0F0F0;
`;

const SearchDropdownItem = styled(Link)`
  display: block;
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #F0F0F0;
  padding: 10px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1A1A1A;
  }
`;

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