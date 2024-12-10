import React from 'react';
import { Carousel } from 'antd';
import 'antd/dist/reset.css'; // Подключение стилей Ant Design
import './CarouselBanner.css'; // Подключение вашего CSS-файла

type Image = {
  src: string;
  alt: string;
}

type CarouselBannerProps = {
  images: Image[];
}

export const CarouselBanner: React.FC<CarouselBannerProps> = ({ images }) => {
  return (
    <div className="carousel-container">
      <Carousel autoplay autoplaySpeed={3000} dots={true}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              className="carousel-image"
              src={`${import.meta.env.VITE_IMAGES}${image.src}`}
              alt={image.alt}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};