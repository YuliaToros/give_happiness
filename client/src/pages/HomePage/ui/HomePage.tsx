import React from 'react';
import { CarouselBanner } from '@/widgets';

// Импортируем изображения
import banner1 from '../assets/banner_null_1.png';
import banner2 from '../assets/banner_null_2.png';
import banner3 from '../assets/banner_null_3.png';

// Интерфейс для изображений
interface Image {
  url: string;
  alt: string;
}

export const HomePage: React.FC = () => {
  const images: Image[] = [
    {
      url: banner1,
      alt: 'Первый баннер',
    },
    {
      url: banner2,
      alt: 'Второй баннер',
    },
    {
      url: banner3,
      alt: 'Третий баннер',
    }
  ];

  return (
    // <>
    //   <CarouselBanner images={images} />
    //   <p>Подари счастье – маркет-плейс подарочных сертификатов в твоем городе!</p>
    //   <button> Посмотреть каталог</button>
    // </>
    <div className="container-fluid">
    <div className="row">
      <div className="col-12">
        <CarouselBanner images={images} />
      </div>
    </div>
    <div className="row mt-4">
      <div className="col-12 text-center">
        <p className="lead">Подари счастье – маркет-плейс подарочных сертификатов в твоем городе!</p>
      </div>
    </div>
    <div className="row mt-3">
      <div className="col-12 text-center">
        <button className="btn btn-primary btn-lg">Посмотреть сертификаты</button>
      </div>
    </div>
  </div>
  );
};