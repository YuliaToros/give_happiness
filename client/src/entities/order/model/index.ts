export type Order = {
    id: number;
    title: string;
    author: string;
    pages: number;
    category_id: number;
    user_id: number;
};
export type OrderList = Order[];