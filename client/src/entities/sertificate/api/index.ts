import { axiosInstance } from "@/shared/lib/axiosInstance";
import { Sertificate, SertificateList } from "@/entities/sertificate/model";

export class SertificateService {

    static async createSertificate(title: string, author: string, pages: number, category_id: number): Promise<Sertificate> {
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

    static async getAllSertificates(): Promise<SertificateList> {
        try {
            const response = await axiosInstance.get('/sertificates');
            return response.data.sertificates;
        } catch (error) {
            console.error('Error fetching all sertificates:', error);
            throw new Error('Failed to fetch sertificates');
        }
    }

    static async updateSertificate(id: number, title: string, author: string): Promise<Sertificate> {
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

    static async deleteSertificate(id: number): Promise<number> {
        try {
            await axiosInstance.delete(`/sertificates/${id}`)
            return id;
        } catch (error) {
            console.error('Error deleting sertificate:', error);
            throw new Error('Failed to delete sertificate');
        }
    }
}