// import { MemoSertificateForm, MemoSertificateList } from "@/widgets";
import { CarouselBanner, MemoSertificateList } from "@/widgets";

// не должен принимать props
type Image = {
    src: string;
    alt: string;
  };

export function SertificatesPage() {
    const images: Image[] = [
        {
          src: '/banner_1.png',
          alt: 'Первый баннер',
        },
        {
          src: '/banner_2.png',
          alt: 'Второй баннер',
        },
        {
          src: '/banner_3.png',
          alt: 'Третий баннер',
        },
      ];
    return (
        <>
        <div style={{ paddingTop: "20px", paddingBottom: "40px", minHeight: "100vh"}}>
            <h1>Подарочные сертификаты</h1>
            {/* <MemoSertificateForm /> */}
        
            <div style={{ textAlign: "center" }}>
        
            <CarouselBanner images={images} />
     
        </div>
            <MemoSertificateList />
            </div>
        </>
    );
};
