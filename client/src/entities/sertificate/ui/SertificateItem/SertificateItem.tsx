import { Sertificate } from '../../model';
import { useEffect } from 'react';

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
        <>
          <div className="card" style={{ width: "18rem" }}>
            <img src="https://mygiftcard.ru/upload/resize_cache/iblock/1a4/400_250_1/5es4w31j2cdizt83poerxzdintcp8vp7.png.webp" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Подарочный сертификат №1</h5>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>500 - 3000р</span>
                <a href="#" className="btn btn-primary">Купить</a>
              </div>
            </div>
          </div>
        </>
      );
}