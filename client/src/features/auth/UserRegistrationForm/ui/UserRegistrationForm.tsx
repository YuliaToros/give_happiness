import { CLIENT_ROUTES } from "@/app/router";
import { registration } from "@/entities/user/model/userThunk";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initRoles } from "@/entities/user/model/roleThunk";

export const UserRegistrationForm = React.memo(() => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const {roles} = useAppSelector((state) => state.role);
    const [role_id, setRole_id] = useState(0);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
   
    useEffect(()=>{
        dispatch(initRoles())
    },[dispatch])
    
   

    const registrationHandler = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return alert('Passwords do not match!');
        }

        dispatch(registration({ email, password, name, role_id }))
        navigate(CLIENT_ROUTES.HOME);
    }

    return (
        <form onSubmit={registrationHandler}>
            <input defaultValue={name} onChange={({ target }) => setName(target.value)} type="text" required placeholder="Your name" />
            <input defaultValue={email} onChange={({ target }) => setEmail(target.value)} type="email" required placeholder="Your email" />
            <input defaultValue={password} onChange={({ target }) => setPassword(target.value)} type="password" required placeholder="Your password" />
            <input defaultValue={confirmPassword} onChange={({ target }) => setConfirmPassword(target.value)} type="password" required placeholder="Confirm password" />
            <select
        value={role_id}
        onChange={(e) =>
          setRole_id(+e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "4px",
          border: "1px solid #ddd",
        }}
        required
      >
        <option value="">Выберите роль</option>
        {roles.length > 0 ? (
          roles.map((roles) => (
            <option key={roles.id} value={roles.id}>
              {roles.name}
            </option>
          ))
        ) : (
          <option disabled>Нет доступных ролей</option>
        )}
      </select>
            <button type="submit">Registration</button>
        </form>
    );
})