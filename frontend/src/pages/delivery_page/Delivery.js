import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Rectangle43 from "./Rectangle43.png";
import Footer from './components/Footer';
import { useMediaQuery } from 'react-responsive';
import DeliveryDesktop from './DeliveryDesktop';
import DeliveryMobile from './DeliveryMobile';


const DeliveryPage = () => {
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
            isDesktop ? <DeliveryDesktop /> : <DeliveryMobile />
        }
    </div>
  );
};

export default DeliveryPage;
