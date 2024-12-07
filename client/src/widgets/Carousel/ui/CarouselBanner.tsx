import React from 'react';
import { Carousel } from 'react-bootstrap';

interface Image {
  url: string;
  alt: string;
}

interface CarouselBannerProps {
  images: Image[];
}

export const CarouselBanner: React.FC<CarouselBannerProps> = ({ images }) => {
  return (
    <Carousel interval={3000} pause={false}>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={image.url}
            alt={image.alt}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};