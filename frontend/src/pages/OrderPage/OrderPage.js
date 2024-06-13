import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Footer from '../components/Footer';
import { useAuth } from '../../AuthProvider';
import { useMediaQuery } from 'react-responsive';
import OrderPageDesktop from './OrderPageDesktop';
import OrderPageMobile from './OrderPageMobile';


const OrderPage = () => {
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
            isDesktop ? <OrderPageDesktop /> : <OrderPageMobile />
        }
    </div>
 );
};

export default OrderPage;