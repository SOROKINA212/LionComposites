import React from "react";
import styled from 'styled-components';




const MapComponent = () => {
    return (
        <div style={{ width: "32rem", height: "28.3rem", borderRadius: "45px", overflow: "hidden", marginTop: "15px", marginLeft: "0%" }}>
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A708f2da14b7c06ea6e59eddb02a9c4e54b9627268b3b8e5fbd0b1ff3c96326b0&amp;source=constructor&amp;ll=39.686249%2C47.279403&amp;z=16&amp;pt=39.686249%2C47.279403" width="100%" height="100%" frameBorder="0" />
        </div>
    );
};

export default MapComponent;