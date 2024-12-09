import { axiosInstance } from "@/shared/lib/axiosInstance";
import { OrderList } from "@/entities/order/model";

export class OrderService {

  static async getAllOrders(): Promise<OrderList> {
    try {
      const response = await axiosInstance.get("/order");
      return response.data.Order;
    } catch (error) {
      console.error("Error fetching all orders:", error);
      throw new Error("Failed to fetch orders");
    }
  }
  
}
