import { Sertificate } from "@/entities/sertificate"


export type Cart = {
  id:number,
  user_id:number,
  count:number,
  items:Sertificate[]
}

export type CartItem = {
  id:number,
  cart_id:number,
  item_id:number
}

export type CartId = Cart["id"]
export type CartList = CartItem[]