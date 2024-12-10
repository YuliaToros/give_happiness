import React from "react";
import { CLIENT_ROUTES } from "@/app/router";
import { CarouselBanner } from "@/widgets";
import { Link } from "react-router-dom";



// Интерфейс для изображений
type Image = {
  src: string;
  alt: string;
}

export const HomePage: React.FC = () => {
  const images: Image[] = [
    {

      src: '/banner_1.png',
      alt: 'Первый баннер',
    },
    {
      src: '/banner_2.png',
      alt: 'Второй баннер',
    },
    {
      src: '/banner_3.png',
      alt: 'Третий баннер',
    }
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <Link to={CLIENT_ROUTES.SERTIFICATES}>
            {" "}
            <CarouselBanner images={images} />{" "}
          </Link>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12 text-center">
          <p className="lead">
            Подари счастье – маркет-плейс подарочных сертификатов в твоем
            городе!
          </p>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 text-center">
          <Link to={CLIENT_ROUTES.SERTIFICATES}>
            <button className="btn btn-primary btn-lg">
              Посмотреть сертификаты
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
