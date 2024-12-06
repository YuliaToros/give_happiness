import { MemoSertificateForm, MemoSertificateList } from "@/widgets";

// не должен принимать props
export function SertificatesPage() {
    return (
        <>
            <h1>Sertificates page</h1>
            <MemoSertificateForm />
            <MemoSertificateList />
        </>
    );
};
