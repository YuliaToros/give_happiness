import { useAppSelector } from "@/shared/hooks/rtkHooks";
// import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
// import { SertificateItem } from "@/entities/sertificate";
// import { removeItemFromCart } from "../../model/cartThunk";
import { CartItem } from "../CartItem";

export function CartList() {

  // const dispatch = useAppDispatch()


  // const handleRemoveClick = (itemId: number) => {
  //   if (cart) {
  //     dispatch(removeItemFromCart({ cart_id: cart.id, item_id: itemId }));
  //   }
  // };

  const { cart,loading  } = useAppSelector((state) => state.cart); // Получаем данные о корзине
  console.log("KORZINKA",cart);



  return (
    <div>
      <h1>Корзина</h1>
      {loading ? (
        <h2>Загрузка...</h2>
      ) : cart && cart.items.length > 0 ? (
        <div className="cart-items">
          {cart.items.map((sertificate) => (
            <div key={sertificate.id}>
              <CartItem sertificate={sertificate} />
              {/* <button onClick={() => handleRemoveClick(sertificate.id)}>Удалить</button> */}
            </div>
          ))}
        </div>
      ) : (
        <h2>Корзина пуста</h2>
      )}
    </div>
  );
}
