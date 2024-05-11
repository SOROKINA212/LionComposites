// Slider.js
import React, { useState, useEffect } from 'react';
import './Slider.css'; // Импортируем CSS файл

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);

  // Функция для загрузки рандомных изображений
  useEffect(() => {
    const fetchRandomImages = async () => {
      try {
        const response1 = await fetch('https://source.unsplash.com/random/800x600');
        const response2 = await fetch('https://source.unsplash.com/random/800x600');
        const response3 = await fetch('https://source.unsplash.com/random/800x600');
        const imageUrl1 = response1.url;
        const imageUrl2 = response2.url;
        const imageUrl3 = response3.url;
        setSlides([imageUrl1, imageUrl2, imageUrl3]); // Устанавливаем три разных изображения
      } catch (error) {
        console.error('Failed to fetch random images:', error);
      }
    };

    fetchRandomImages();
  }, []);

  // Функция для перелистывания слайдов
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(currentSlide => (currentSlide === slides.length - 1 ? 0 : currentSlide + 1));
    }, 5000); // Интервал перелистывания в миллисекундах (в данном случае 5 секунд)

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="slider">
      <div className="slides-container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="slide" style={{ backgroundImage: `url(${slide})` }}></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
