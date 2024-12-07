// import { Sertificate } from '../../model';
import { useEffect } from 'react';

import { Card, Button, Typography } from 'antd';

const { Meta } = Card;
const { Title, Text } = Typography;

// export function SertificateItem({ sertificate }: { sertificate: Sertificate }) {

//     useEffect(() => {
//         console.log('Mount: SertificateItem');
//         return () => {
//             console.log('Unmount: SertificateItem');
//         }
//     }, [])

//     return (
//         <section style={{ border: `1px solid white`, marginTop: '5px' }}>
//             <h2>{sertificate.title}</h2>
//             <p>Описание: {sertificate.author}</p>
//         </section>
//     );
// }

export function SertificateItem() {

    useEffect(() => {
        console.log('Mount: SertificateItem');
        return () => {
            console.log('Unmount: SertificateItem');
        }
    }, [])
    
    return (
      <Card
        hoverable
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src="https://mygiftcard.ru/upload/resize_cache/iblock/1a4/400_250_1/5es4w31j2cdizt83poerxzdintcp8vp7.png.webp"
          />
        }
      >
        <Meta
          title={<Title level={4}>Подарочный сертификат №1</Title>}
          description={
            <>
              <Text>500 - 3000р</Text>
              <br />
              <Button type="primary" style={{ marginTop: 16 }}>
                Купить
              </Button>
            </>
          }
        />
      </Card>
    );
}