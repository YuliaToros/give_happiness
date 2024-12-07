// import { MemoSertificateForm, MemoSertificateList } from "@/widgets";
import { MemoSertificateList } from "@/widgets";

// не должен принимать props
export function SertificatesPage() {
    return (
        <>
            <h1>Подарочные сертификаты</h1>
            {/* <MemoSertificateForm /> */}
            <MemoSertificateList />
        </>
    );
};
