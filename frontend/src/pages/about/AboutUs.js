import React from 'react';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import styled from 'styled-components';
import Footer from '../components/Footer';
import MapComponent from './components/Map';
import { useMediaQuery } from 'react-responsive';
import AboutUsDesktop from './AboutUsDesktop';
import AboutUsMobile from './AboutUsMobile';

const AboutUsPage = () => {
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
            isDesktop ? <AboutUsDesktop /> : <AboutUsMobile />
        }
    </div>
  );
};

export default AboutUsPage;


