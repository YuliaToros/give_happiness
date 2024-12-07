import { MemoUpdateSertificateForm } from "@/widgets";
import { useParams } from "react-router-dom";

export function UpdateSertificatePage() {

    const { id } = useParams();

    return (
        <>
            <h1>Update Sertificate Page</h1>
            <MemoUpdateSertificateForm id={id} />
        </>
    );
}

