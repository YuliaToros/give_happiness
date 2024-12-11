import { Button } from "antd";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <img
        src={`${import.meta.env.VITE_IMAGES}/img404.jpg`}
        alt="Страница не найдена"
        style={{ width: "50%", height: "auto", marginBottom: "20px" }} // Уменьшение размера картинки и отступ
      />
      <Button type="primary" style={{ width: "50%" }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Вернуться на главную
        </Link>
      </Button>
    </div>
  );
}