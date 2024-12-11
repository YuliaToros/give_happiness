import { axiosInstance } from "@/shared/lib/axiosInstance";
import { Sertificate, SertificateList } from "@/entities/sertificate/model";

export class SertificateService {

  static async createSertificate(
    name: string, 
    description: string, 
    image: string, 
    price: number, 
    count: number, 
    status: string
  ): Promise<Sertificate> {
    try {
      const response = await axiosInstance.post('/item', {
        name,
        description,
        image,
        price,
        count, 
        status,
      });
      return response.data.item;
    } catch (error) {
      console.error('Error create sertificate:', error);
      throw new Error('Failed to create sertificate');
    }
  }

  static async getAllSertificates(): Promise<SertificateList> {
    try {
      const response = await axiosInstance.get('/item');
      return response.data.items;
    } catch (error) {
      console.error('Error fetching all item:', error);
      throw new Error('Failed to fetch item');
    }
  }

  static async updateSertificate(
    id: number, 
    name: string, 
    description: string, 
    image: string, 
    price: number, 
    count: number, 
    status: string
  ): Promise<Sertificate> {
    try {
      const response = await axiosInstance.put(`/item/${id}`, {
        name,
        description,
        image,
        price,
        count, 
        status,
      })
      return response.data.item;
    } catch (error) {
      console.error('Error updating sertificate:', error);
      throw new Error('Failed to update sertificate');
    }
  }

  static async deleteSertificate(id: number): Promise<number> {
    try {
      await axiosInstance.delete(`/item/${id}`)
      return id;
    } catch (error) {
      console.error('Error deleting sertificate:', error);
      throw new Error('Failed to delete sertificate');
    }
  }
}