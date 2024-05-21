import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownContent = styled.div`
  position: absolute;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 12px 16px;
  right: 0; // Выравниваем по правому краю
  top: 40px; // Позиционируем под кнопкой
`;

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <DropdownContainer>
      <button className="account-btn" onClick={toggleDropdown}>
        Личный кабинет
      </button>
      {isOpen && (
        <DropdownContent>
          <button onClick={handleCartClick}>Корзина</button>
          <button>Выйти</button>
        </DropdownContent>
      )}
    </DropdownContainer>
  );
};

export default DropdownMenu;