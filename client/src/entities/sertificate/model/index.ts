export type Sertificate = {
  id: number;
  title: string;
  author: string;
  pages: number;
  category_id: number;
  user_id: number;
};
export type SertificateId = Sertificate['id'];
export type SertificateList = Sertificate[];
export type SertificateWithoutId = Omit<Sertificate, 'id'>;