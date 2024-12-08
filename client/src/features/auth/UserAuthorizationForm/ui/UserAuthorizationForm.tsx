import { CLIENT_ROUTES } from "@/app/router";
import { authorization } from "@/entities/user/model/userThunk";
import { useAppDispatch } from "@/shared/hooks/rtkHooks";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserAuthorizationForm = React.memo(() => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const authHandler = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(authorization({ email, password }))
        navigate(CLIENT_ROUTES.ACCOUNT_PAGE);
    }

    return (
        <form onSubmit={authHandler}>
            <input defaultValue={email} onChange={({ target }) => setEmail(target.value)} type="email" required placeholder="You email" />
            <input defaultValue={password} onChange={({ target }) => setPassword(target.value)} type="password" required placeholder="You password" />
            <button disabled={(!email || !password)} type="submit">Auth</button>
        </form>
    );
})

