import React from 'react';
import { Carousel } from 'react-bootstrap';

type Image = {
  src: string;
  alt: string;
}

type CarouselBannerProps = {
  images: Image[];
}

export const CarouselBanner: React.FC<CarouselBannerProps> = ({ images }) => {
  return (
    <Carousel interval={3000} pause={false}>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={`${import.meta.env.VITE_IMAGES}${image.src}`}
            alt={image.alt}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};