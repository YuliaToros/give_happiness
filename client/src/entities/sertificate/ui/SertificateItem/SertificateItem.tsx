// import { Sertificate } from '../../model';
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
    } catch (error) {
      setError(error.message);
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
    <Card hoverable style={{ width: 300 }}>
      <Meta
        description={
          <>
            <h2>{sertificate.name}</h2>
            <h2>{sertificate.count}</h2>
            <h2>{sertificate.description}</h2>
            <h2>{sertificate.price}</h2>
            <Button
              type="primary"
              style={{ marginTop: 16 }}
              onClick={addItemHandler}
            >
              Купить
            </Button>
          </>
        }
      />
    </Card>
  );
}
