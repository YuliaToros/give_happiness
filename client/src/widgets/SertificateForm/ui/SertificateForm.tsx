import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { useAppDispatch } from "@/shared/hooks/rtkHooks";
import { createBook } from "@/entities/book/model/booksThunk";
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

    const addBookHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!author || !title || !pages || !category_id) return alert('Not fill all fields');
        dispatch(createBook({ title, author, pages: Number(pages), category_id: Number(category_id) }))
    }

    return (
        <form onSubmit={addBookHandler}>
            <input type="text" onChange={({ target }) => setAuthor(target.value)} defaultValue={author} required placeholder="Book author" />
            <input type="text" onChange={({ target }) => setTitle(target.value)} defaultValue={title} required placeholder="Book title" />
            <input type="text" onChange={({ target }) => setPages(target.value)} defaultValue={pages} required placeholder="Pages" />

            <select onChange={({ target }) => setCategoryId(target.value)}>
                <option defaultValue="">Choose here</option>
                {categories.length > 0 && categories.map(cat => <option key={cat.id} value={cat.id}>{cat.title}</option>)}
            </select>
            <button>Add book</button>
        </form>
    );
})