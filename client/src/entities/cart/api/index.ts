import { axiosInstance } from "@/shared/lib/axiosInstance";
import { Cart, CartList } from "@/entities/sertificate/model";

export class CartService {

    static async createCart(title: string, author: string, pages: number, category_id: number): Promise<Cart> {
        try {
            const response = await axiosInstance.post('/sertificates', {
                title,
                author,
                pages,
                category_id
            });
            return response.data.sertificate;
        } catch (error) {
            console.error('Error create sertificate:', error);
            throw new Error('Failed to create sertificate');
        }
    }

    static async getAllCarts(): Promise<CartList> {
        try {
            const response = await axiosInstance.get('/sertificates');
            return response.data.sertificates;
        } catch (error) {
            console.error('Error fetching all sertificates:', error);
            throw new Error('Failed to fetch sertificates');
        }
    }

    static async updateCart(id: number, title: string, author: string): Promise<Cart> {
        try {
            const response = await axiosInstance.put(`/sertificates/${id}`, {
                title,
                author
            })
            return response.data.sertificate;
        } catch (error) {
            console.error('Error updating sertificate:', error);
            throw new Error('Failed to update sertificate');
        }
    }

    static async deleteCart(id: number): Promise<number> {
        try {
            await axiosInstance.delete(`/sertificates/${id}`)
            return id;
        } catch (error) {
            console.error('Error deleting sertificate:', error);
            throw new Error('Failed to delete sertificate');
        }
    }
}