import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthProvider';
import styled from 'styled-components';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Footer from './components/Footer';
import { useMediaQuery } from 'react-responsive';
import CartPageDesktop from './CartPageDesktop';
import CartPageMobile from './CartPageMobile';


const CartPage = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)"
  });

  const isTablet = useMediaQuery({
    query: "(max-width: 1224px)"
  });

  const isMobile = useMediaQuery({
    query: "(max-width: 786px)"
  });

  const isPortrait = useMediaQuery({
    query: "(orientation: portrait)"
  });

  const isRetina = useMediaQuery({
    query: "(max-resolution: 300dpi)"
  });

  return (
    <div>
        {
            isDesktop ? <CartPageDesktop /> : <CartPageMobile />
        }
    </div>
  );
};

export default CartPage;