import React from "react";
import { CLIENT_ROUTES } from "@/app/router";
import { CarouselBanner } from "@/widgets";
import { Link } from "react-router-dom";
import { Layout, Button, Typography } from "antd";

const { Content } = Layout;
const { Paragraph } = Typography;

// Интерфейс для изображений
type Image = {
  src: string;
  alt: string;
};

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
    },
  ];

  return (
    <div
    style={{ paddingTop: "20px", paddingBottom: "40px", minHeight: "100vh" }}
  >
    <Layout style={{ marginTop: "40px", marginBottom: "100px", backgroundColor: "white" }}>
      <Content style={{ padding: "0 50px" }}>
        <div style={{ textAlign: "center" }}>
          <Link to={CLIENT_ROUTES.SERTIFICATES}>
            <CarouselBanner images={images} />
          </Link>
        </div>
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <Paragraph style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            Подари счастье – маркет-плейс подарочных сертификатов в твоем городе!
          </Paragraph>
        </div>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Link to={CLIENT_ROUTES.SERTIFICATES}>
            <Button type="primary" size="large">
              Посмотреть сертификаты
            </Button>
          </Link>
        </div>
      </Content>
    </Layout>
    </div>
  );
};