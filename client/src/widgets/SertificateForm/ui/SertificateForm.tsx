import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { useAppDispatch } from "@/shared/hooks/rtkHooks";
import { createSertificate } from "@/entities/sertificate/model/sertificatesThunk";
import { CategoryListType } from "@/entities/category/model";

export const SertificateForm = React.memo(() => {

    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [pages, setPages] = useState('');
    const [category_id, setCategoryId] = useState('');
    const [categories, setCategories] = useState<CategoryListType>([])

    const dispatch = useAppDispatch()

    useEffect(() => {
        axiosInstance.get('/categories')
            .then(response => setCategories(response.data.categories))
    }, [])

    const addSertificateHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!author || !title || !pages || !category_id) return alert('Not fill all fields');
        dispatch(createSertificate({ title, author, pages: Number(pages), category_id: Number(category_id) }))
    }

    return (
        <form onSubmit={addSertificateHandler}>
            <input type="text" onChange={({ target }) => setAuthor(target.value)} defaultValue={author} required placeholder="Sertificate author" />
            <input type="text" onChange={({ target }) => setTitle(target.value)} defaultValue={title} required placeholder="Sertificate title" />
            <input type="text" onChange={({ target }) => setPages(target.value)} defaultValue={pages} required placeholder="Pages" />

            <select onChange={({ target }) => setCategoryId(target.value)}>
                <option defaultValue="">Choose here</option>
                {categories.length > 0 && categories.map(cat => <option key={cat.id} value={cat.id}>{cat.title}</option>)}
            </select>
            <button>Add sertificate</button>
        </form>
    );
})