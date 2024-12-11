import React, { useEffect, useState } from "react";
import { Card, Button, message, Row, Col } from "antd";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { removeItemFromCart } from "@/entities/cart/model/cartThunk"; // Импортируем функцию для удаления товара
import { Sertificate } from "@/entities/sertificate";

export function CartItem({ sertificate }: { sertificate: Sertificate }) {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart); // Получаем корзину из Redux
  console.log(cart)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const removeItemHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!cart) {
      setError("Корзина не найдена");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Отправляем запрос на удаление товара из корзины
      await dispatch(
        removeItemFromCart({ cart_id: cart.id, item_id: sertificate.id })
      );
      message.success("Товар успешно удален из корзины"); // Показываем сообщение об успешном удалении
    } catch (error) {
      setError(error.message);
      message.error("Ошибка при удалении товара"); // Показываем сообщение об ошибке
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Mount: SertificateItem");
    return () => {
      console.log("Unmount: SertificateItem");
    };
  }, []);

  return (
    <Card
      style={{
        borderRadius: 12, // Скругление углов
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)", // Тень
        overflow: "hidden", // Чтобы скругление применялось ко всей карточке
        marginBottom: 16, // Отступ между карточками
      }}
    >
      <Row gutter={16} align="middle">
        {/* Левая колонка с изображением */}
        <Col xs={24} sm={6}>
          <img
            alt="Banner"
            src={sertificate.image}
            style={{
              width: "100%", // Изображение по ширине контейнера
              height: 150, // Фиксированная высота изображения
              objectFit: "cover", // Масштабирование изображения
              borderRadius: 12, // Скругление изображения
            }}
            onError={(e) => {
              e.currentTarget.src = `${import.meta.env.VITE_IMAGES}/bunnerNull.png`; // Заглушка
            }}
          />
        </Col>

        {/* Центральная колонка с описанием и ценой */}
        <Col xs={24} sm={12}>
          <h5 style={{ marginBottom: 8 }}>{sertificate.name}</h5>
          <p style={{ marginBottom: 8 }}>{sertificate.description}</p>
          <p style={{ marginBottom: 16, fontWeight: "bold" }}>
            Стоимость: {sertificate.price} ₽
          </p>
        </Col>

        {/* Правая колонка с кнопкой удаления */}
        <Col xs={24} sm={4} style={{ textAlign: "right" }}>
          <Button
            type="default" // Используем стандартный стиль кнопки
            danger // Делаем кнопку красной
            style={{
              borderRadius: 8, // Скругление кнопки
              transition: "all 0.3s ease", // Плавный переход
              width: "100%", // Кнопка занимает всю ширину
              border: "2px solid #ff4d4f", // Красная обводка
              backgroundColor: "transparent", // Прозрачный фон
              color: "#ff4d4f", // Красный текст
            }}
            onClick={removeItemHandler}
            loading={loading}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#ff4d4f"; // Красный фон при наведении
              e.currentTarget.style.color = "#fff"; // Белый текст при наведении
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"; // Прозрачный фон
              e.currentTarget.style.color = "#ff4d4f"; // Красный текст
            }}
          >
            Удалить из корзины
          </Button>
          {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
        </Col>
      </Row>
    </Card>
  );
}