import { deleteBook, updateBook } from "@/entities/book/model/booksThunk";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UpdateSertificateForm = React.memo(({ id }: { id: string | undefined }) => {
    const { books } = useAppSelector(state => state.books);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentBook = books.find(el => el.id === Number(id));
    const [title, setTitle] = useState(currentBook?.title);
    const [author, setAuthor] = useState(currentBook?.author);

    const deleteBookHandler = async () => {
        try {
            dispatch(deleteBook(Number(id)));
            navigate(-1);
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const updateBookHandler = async () => {
        try {
            if (!author || !title) return alert('Not fill all fields');
            dispatch(updateBook({ id: Number(id), title, author }));
        } catch (error) {
            console.error('Error updating book:', error);
        }
    }

    return (
        <>
            <h2>Book Id: {id}</h2>

            <input type="text" onChange={({ target }) => setAuthor(target.value)} defaultValue={currentBook?.author} required placeholder="Book author" />
            <input type="text" onChange={({ target }) => setTitle(target.value)} defaultValue={currentBook?.title} required placeholder="Book title" />

            <section>
                <button onClick={() => navigate(-1)}>Back</button>
                <button onClick={updateBookHandler}>Update book</button>
                <button onClick={deleteBookHandler}>Delete book</button>
            </section>
        </>
    );
})

