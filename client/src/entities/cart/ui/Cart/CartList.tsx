import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { SertificateItem } from "@/entities/sertificate";
import { removeItemFromCart } from "../../model/cartThunk";

export function CartList() {

  const dispatch = useAppDispatch()


  const handleRemoveClick = (itemId: number) => {
    if (cart) {
      dispatch(removeItemFromCart({ cart_id: cart.id, item_id: itemId }));
    }
  };

  const { cart } = useAppSelector((state) => state.cart); // Получаем данные о корзине
  console.log(cart);

  
  return (
    <div>
      <h1>Корзина</h1>
      <div className="cart-items">
        {cart ? (
          cart.items.map((sertificate) => {
            return (
              <div key={sertificate.id}>
                <SertificateItem sertificate={sertificate} />
                <button onClick={() => handleRemoveClick(sertificate.id)}>Удалить</button>
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
