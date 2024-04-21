import React, { useEffect } from 'react';
import ymaps from 'ymaps';

const Map = () => {
    useEffect(() => {
        ymaps.ready(() => {
            const map = new ymaps.Map('map', {
                center: [55.751574, 37.573856], // Координаты центра карты
                zoom: 10 // Уровень масштабирования
            });

            // Добавление метки на карту
            const placemark = new ymaps.Placemark(
                [55.751574, 37.573856], // Координаты магазина
                { hintContent: 'Магазин' },
                { preset: 'islands#redDotIcon' } // Стиль геометки
            );

            map.geoObjects.add(placemark);
        });
    }, []);

    return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default Map;
