import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubHeader from './SubHeader';
import { useAuth } from '../../AuthProvider';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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
  cursor: pointer;
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

const AccountBtnContainer = styled.div`
  position: relative;
`;

const AccountBtn = styled.button`
  height: 100%;
  background-color: #333;
  color: #333;
  border: none;
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #D0D0D0;
  }
`;

const AccountIcon = styled(FontAwesomeIcon)`
  color: #fff; // Цвет иконки
  font-size: 32px; // Размер иконки
  cursor: pointer; // Изменение курсора при наведении


  &:hover {
    color: #808080; // Изменение цвета при наведении
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
  border-radius: 10px;
`;

const DropdownItem = styled.button`
  display: block;
  padding: 5px 0;
  cursor: pointer;
  width: 100%;
  background-color: transparent;
  color: #fff;
  border: none;
  text-align: center;
  line-height: 1.5;
  border-radius: 5px;

  &:hover {
    background-color: #1A1A1A;
  }
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
  const [searchResults, setSearchResults] = useState({ products: [] });
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

    if (location.pathname === '/profile' || location.pathname === '/cart' || location.pathname === '/order') {
      // If the user is on /profile, /cart or /order, redirect them to the home page
      navigate('/');
    } else {
      // If the user is on any other page, reload the current page
      navigate(0);
    }
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

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleSearchInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() !== '') {
      fetchSearchResults(term);
      toggleSearchDropdown();
    } else {
      setSearchResults({ products: [] });
      toggleSearchDropdown();
    }
  };

  const fetchSearchResults = async (term) => {
    try {
      const productsResponse = await axios.get(`http://localhost:8000/api/products/?search=${term}`);
      setSearchResults({
        products: productsResponse.data,
      });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleLogoClick = () => {
    navigate('http://localhost:3000/');
  };

  return (
    <HeaderContainer>
      <Logo onClick={handleLogoClick}>Lion Composites</Logo>
      <SearchBar>
        <input
          type="text"
          placeholder="Поиск"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        {isSearchDropdownOpen && (
          <SearchDropdown>
            {searchResults.products.length > 0 && (
              <>
                <SearchDropdownHeader>Товары</SearchDropdownHeader>
                {searchResults.products.map((product) => (
                  <SearchDropdownItem
                    key={product.id}
                    to={`/product/${product.id}`}
                  >
                    {product.name}
                  </SearchDropdownItem>
                ))}
              </>
            )}
            {searchResults.products.length === 0 && (
              <SearchDropdownItem>Ничего не найдено</SearchDropdownItem>
            )}
          </SearchDropdown>
        )}
      </SearchBar>
      <AccountBtnContainer>
        <AccountBtn onClick={toggleDropdown}>
        <AccountIcon icon={faUser} />
      </AccountBtn>
        {isDropdownOpen && (
          <DropdownMenu>
            {user ? (
              <>
                <DropdownItem onClick={handleCart}>Корзина</DropdownItem>
                <DropdownItem onClick={handleProfile}>Профиль</DropdownItem>
                <DropdownItem onClick={handleLogout}>
                  Выйти
                </DropdownItem>
              </>
            ) : (
              <DropdownItem onClick={handleLogin}>
                Войти
              </DropdownItem>
            )}
          </DropdownMenu>
        )}
      </AccountBtnContainer>
    </HeaderContainer>
  );
};

export default Header;