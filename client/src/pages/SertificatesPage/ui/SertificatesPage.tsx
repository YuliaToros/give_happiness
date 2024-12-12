import { CarouselBanner, MemoSertificateList } from "@/widgets";

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
    <div style={{ padding: "40px 20px", minHeight: "100vh", backgroundColor: "#E1DBFD" }}>
      {/* Заголовок */}
      <h1 style={{
        fontSize: "2.5rem",
        color: "#220E5B",
        textAlign: "left",
        marginBottom: "30px",
        fontWeight: "bold",
      }}>
        Подарочные сертификаты
      </h1>

      {/* Карусель баннеров */}
      <div style={{ marginBottom: "40px" }}>
        <CarouselBanner images={images} />
      </div>

      {/* Список сертификатов */}
      <div style={{
        backgroundColor: "#FFFFFF",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}>
        <MemoSertificateList />
      </div>
    </div>
  );
}