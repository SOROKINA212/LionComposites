import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Review from './components/Review';
import { useAuth } from '../../AuthProvider';
import ReviewForm from './components/ReviewForm';
import Footer from './components/Footer';
import { useMediaQuery } from 'react-responsive';
import ProductDetailDesktop from './ProductDetailDesktop';
import ProductDetailMobile from './ProductDetailMobile';
import 'typeface-montserrat';

const ProductDetail = () => {
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
            isDesktop ? <ProductDetailDesktop /> : <ProductDetailMobile />
        }
    </div>
  );
};

export default ProductDetail;
