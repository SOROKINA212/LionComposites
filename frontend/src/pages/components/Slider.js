import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const SliderContainer = styled(Slider)`
  width: 100%;
  height: 10%;
`;

const SliderImage = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
  object-position: center;
`;

const SliderComponent = () => {
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/slider/');
        setSliderImages(response.data);
      } catch (error) {
        console.error('Error fetching slider images:', error);
      }
    };

    fetchSliderImages();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    vertical: false,
    verticalSwiping: false,
    arrows: false,
  };

  return (
    <SliderContainer {...sliderSettings}>
      {sliderImages.map((image) => (
        <div key={image.id}>
          <SliderImage src={image.image} alt={`Slider Image ${image.order}`} />
        </div>
      ))}
    </SliderContainer>
  );
};

export default SliderComponent;