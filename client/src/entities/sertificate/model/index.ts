export type Sertificate = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  count:number;
  user_id: number;
};
export type SertificateId = Sertificate['id'];
export type SertificateList = Sertificate[];
export type SertificateWithoutId = Omit<Sertificate, 'id'>;