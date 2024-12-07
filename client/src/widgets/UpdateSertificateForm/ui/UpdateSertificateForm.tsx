import { deleteSertificate, updateSertificate } from "@/entities/sertificate/model/sertificatesThunk";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UpdateSertificateForm = React.memo(({ id }: { id: string | undefined }) => {
    const { sertificates } = useAppSelector(state => state.sertificates);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentSertificate = sertificates.find(el => el.id === Number(id));
    const [title, setTitle] = useState(currentSertificate?.title);
    const [author, setAuthor] = useState(currentSertificate?.author);

    const deleteSertificateHandler = async () => {
        try {
            dispatch(deleteSertificate(Number(id)));
            navigate(-1);
        } catch (error) {
            console.error('Error deleting sertificate:', error);
        }
    };

    const updateSertificateHandler = async () => {
        try {
            if (!author || !title) return alert('Not fill all fields');
            dispatch(updateSertificate({ id: Number(id), title, author }));
        } catch (error) {
            console.error('Error updating sertificate:', error);
        }
    }

    return (
        <>
            <h2>Sertificate Id: {id}</h2>

            <input type="text" onChange={({ target }) => setAuthor(target.value)} defaultValue={currentSertificate?.author} required placeholder="Sertificate author" />
            <input type="text" onChange={({ target }) => setTitle(target.value)} defaultValue={currentSertificate?.title} required placeholder="Sertificate title" />

            <section>
                <button onClick={() => navigate(-1)}>Back</button>
                <button onClick={updateSertificateHandler}>Update sertificate</button>
                <button onClick={deleteSertificateHandler}>Delete sertificate</button>
            </section>
        </>
    );
})

