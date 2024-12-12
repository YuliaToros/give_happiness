import { CartList } from "@/entities/cart/ui/Cart/CartList";
import React from "react";

export const CartPage: React.FC = () => {
  return (
    <>
      <div
        style={{
          paddingTop: "20px",
          paddingBottom: "40px",
          paddingLeft: "60px",
          paddingRight: "60px", 
          minHeight: "100vh",
          backgroundColor: '#E1DBFD'
        }}
      >
        <CartList />
      </div>
    </>
  );
};