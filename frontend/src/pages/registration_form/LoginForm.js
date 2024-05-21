import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthProvider';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { useMediaQuery } from 'react-responsive';
import LoginFormDesktop from './LoginFormDesktop';
import LoginFormMobile from './LoginFormMobile';

const LoginForm = () => {
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
            isDesktop ? <LoginFormDesktop /> : <LoginFormMobile />
        }
    </div>
  );
};

export default LoginForm;