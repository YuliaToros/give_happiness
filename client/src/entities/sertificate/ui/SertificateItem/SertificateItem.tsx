import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import { Sertificate } from "../../model";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { addItemToCart } from "@/entities/cart/model/cartThunk";

const { Meta } = Card;

export function SertificateItem({ sertificate }: { sertificate: Sertificate }) {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart); // Получаем корзину из Redux
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addItemHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!cart) {
      setError("Корзина не найдена");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Отправляем запрос на добавление товара в корзину
      const result = await dispatch(
        addItemToCart({ cart_id: cart.id, item_id: sertificate.id })
      );

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Произошла неизвестная ошибка');
      }
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
      hoverable
      style={{
        borderRadius: 12, // Скругление углов
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)", // Тень
        overflow: "hidden", // Чтобы скругление применялось ко всей карточке
        height: "100%", // Занимает всю высоту колонки
      }}
      cover={
        <img
          alt="Banner"
          src={sertificate.image}
          style={{
            width: "100%", // Изображение по ширине контейнера
            height: 200, // Фиксированная высота изображения
            objectFit: "cover", // Масштабирование изображения
          }}
          onError={(e) => {
            e.currentTarget.src = `${import.meta.env.VITE_IMAGES}/bunnerNull.png`; // Заглушка
          }}
        />
      }
    >
      <Meta
        title={<h5 style={{ marginBottom: 8 }}>{sertificate.name}</h5>}
        description={
          <>
            <p style={{ marginBottom: 8 }}>{sertificate.description}</p>
            <p style={{ marginBottom: 16, fontWeight: "bold" }}>
              Стоимость: {sertificate.price} ₽
            </p>
            <Button
              type="primary"
              style={{
                backgroundColor: "#f0f0f0", // Светлый фон кнопки
                color: "#333", // Темный текст
                borderColor: "#f0f0f0", // Светлая рамка
                borderRadius: 8, // Скругление кнопки
                transition: "all 0.3s ease", // Плавный переход
                width: "100%", // Кнопка занимает всю ширину
              }}
              onClick={addItemHandler}
              loading={loading}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#0b6b3d"; // Цвет при наведении
                e.currentTarget.style.color = "#fff"; // Белый текст при наведении
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f0f0f0"; // Возврат исходного цвета
                e.currentTarget.style.color = "#333"; // Возврат исходного текста
              }}
            >
              Купить
            </Button>
            {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
          </>
        }
      />
    </Card>
  );
}