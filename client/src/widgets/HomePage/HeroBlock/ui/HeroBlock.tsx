import { CLIENT_ROUTES } from "@/app/router";
import { Button } from "antd";
import { Link } from "react-router-dom";

export function HeroBlock() {
  return (
    <div style={{ display: "flex", height: "80vh" }}>
      {/* Левая колонка */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#E1DBFD",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "50px 100px 50px 60px",
          maxWidth: "40%",
        }}
      >
        {/* Заголовок */}
        <h1
          style={{
            fontSize: "3.5rem",
            textAlign: "left",
            color: "#220E5B",
            fontWeight: "bold",
            lineHeight: 1.2,
            marginBottom: "20px",
          }}
        >
          Подари счастье
        </h1>

        {/* Подзаголовок */}
        <p
          style={{
            fontSize: "1.5rem",
            color: "#220E5B",
            marginTop: "10px",
            marginBottom: "30px",
          }}
        >
          Маркет-плейс по продаже электронных подарочных сертификатов
        </p>

        {/* Основной текст */}
        <p
          style={{
            fontSize: "1.1rem",
            color: "#220E5B",
            marginTop: "10px",
            marginBottom: "40px",
          }}
        >
          Ищешь идеальный подарок, который удивит и порадует? Мы предлагаем
          огромный выбор сертификатов на любимые бренды, развлечения, рестораны,
          SPA и многое другое. Просто, удобно и быстро — выбери, оплати и подари
          радость близким.
        </p>

        {/* Кнопка */}
        <Link to={CLIENT_ROUTES.SERTIFICATES}>
          <Button
            type="primary"
            style={{
              backgroundColor: "#220E5B",
              borderColor: "#220E5B",
              fontSize: "1rem",
              padding: "15px 20px",
              borderRadius: "8px",
              height: "auto",
              transition: "box-shadow 0.3s ease", // Плавный переход для тени
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(34, 14, 91, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none"; // Убираем тень при уходе курсора
            }}
          >
            Посмотреть сертификаты
          </Button>
        </Link>
      </div>

      {/* Правая колонка */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={`${import.meta.env.VITE_IMAGES}/present.webp`}
          alt="Фотография"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}