// import React, { useEffect } from 'react';
import { useAppSelector } from '@/shared/hooks/rtkHooks';
// import { fetchUserCart, addItemToCart } from '../../model/cartThunk';
import { SertificateItem } from '@/entities/sertificate';

export function CartList() {
  // const dispatch = useAppDispatch();
  const { cart, loading, error } = useAppSelector(state => state.cart); // Получаем данные о корзине
  // const { sertificates } = useAppSelector(state => state.sertificates); // Список всех сертификатов

  // const handleBuyClick = (itemId: number) => {
  //   if (cart) {
  //     dispatch(addItemToCart({ cart_id: cart.id, item_id: itemId }));
  //   }
  // };
console.log(cart);

  // useEffect(() => {

  //   dispatch(fetchUserCart());
  // }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Корзина</h1>
      <div className="cart-items">
        {cart ? (
          cart.items.map((sertificate) => {
            return (
              <div key={sertificate.id}>
                <SertificateItem sertificate={sertificate} />
                {/* <button onClick={() => handleBuyClick(sertificate.id)}>Купить</button> */}
              </div>
            );
          })
        ) : (
          <h2>Корзина пуста</h2>
        )}
      </div>
    </div>
  );
}
