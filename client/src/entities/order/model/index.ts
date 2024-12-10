import { UserType } from "@/entities/user";


export type OrderType = {
    id: number;
    date: string;
    sum: number;
    user: UserType;
};

export type OrderListType = OrderType[];