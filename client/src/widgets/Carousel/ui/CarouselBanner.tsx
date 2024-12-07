import React from 'react';
import { Carousel } from 'react-bootstrap';
import './carouselBanner.css'

// Интерфейс для изображений
interface Image {
  url: string;
  alt: string;
}

// Типизация пропсов компонента
interface CarouselBannerProps {
  images: Image[];
}

export const CarouselBanner: React.FC<CarouselBannerProps> = ({ images }) => {
  return (
    <Carousel interval={3000} pause={false}>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block carousel-image"
            src={image.url}
            alt={image.alt}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};