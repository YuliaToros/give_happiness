// import { MemoSertificateForm, MemoSertificateList } from "@/widgets";
import { MemoSertificateList } from "@/widgets";

// не должен принимать props
export function SertificatesPage() {
    return (
        <>
        <div style={{ paddingTop: "20px", paddingBottom: "40px" }}>
            <h1>Подарочные сертификаты</h1>
            {/* <MemoSertificateForm /> */}
            <MemoSertificateList />
            </div>
        </>
    );
};
