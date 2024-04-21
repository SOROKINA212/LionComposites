import React from "react";
import './Map.css';

const MapComponent = () => {
  return (
    <div style={{ width: "604px", height: "450px", borderRadius: "45px", overflow: "hidden" }}>
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A708f2da14b7c06ea6e59eddb02a9c4e54b9627268b3b8e5fbd0b1ff3c96326b0&amp;source=constructor"
        width="100%"
        height="100%"
        frameBorder="0"
      />
    </div>
  );
};

export default MapComponent;
