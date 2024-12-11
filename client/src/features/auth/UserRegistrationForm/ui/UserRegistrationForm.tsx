import { CLIENT_ROUTES } from "@/app/router";
import { registration } from "@/entities/user/model/userThunk";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initRoles } from "@/entities/user/model/roleThunk";
import { Form, Input, Button, Select, message } from "antd";

const { Option } = Select;

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
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const registrationHandler = async () => {
      if (password !== confirmPassword) {
        return message.error("Пароли не совпадают!");
      }
  
      try {
        const resultAction = await dispatch(
          registration({ email, password, name, role_id })
        );
  
        if (registration.fulfilled.match(resultAction)) {
          navigate(CLIENT_ROUTES.ACCOUNT_PAGE);
        } else {
          message.error("Ошибка регистрации. Попробуйте ещё раз.");
        }
      } catch (error) {
        console.error("Ошибка при регистрации:", error);
        message.error("Произошла ошибка. Попробуйте ещё раз.");
      }
    };
    return (
      <Form
        layout="vertical"
        onFinish={registrationHandler}
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #f0f0f0",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Регистрация</h2>
  
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: "Введите ваше имя" }]}
        >
          <Input
            defaultValue={name}
            onChange={({ target }) => setName(target.value)}
            placeholder="Ваше имя"
          />
        </Form.Item>
  
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Введите ваш email" },
            { type: "email", message: "Введите корректный email" },
          ]}
        >
          <Input
            defaultValue={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="Ваш email"
          />
        </Form.Item>
  
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password
            defaultValue={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Ваш пароль"
          />
        </Form.Item>
  
        <Form.Item
          label="Подтверждение пароля"
          name="confirmPassword"
          rules={[
            { required: true, message: "Подтвердите пароль" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Пароли не совпадают")
                );
              },
            }),
          ]}
        >
          <Input.Password
            defaultValue={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
            placeholder="Подтверждение пароля"
          />
        </Form.Item>
  
        <Form.Item
          label="Роль"
          name="role"
          rules={[{ required: true, message: "Выберите роль" }]}
        >
          <Select
            value={role_id}
            onChange={(value) => setRole_id(value)}
            placeholder="Выберите роль"
          >
            {roles.length > 0 ? (
              roles.filter((role)=>role.name!=="Админ").map((role) => (
                <Option key={role.id} value={role.id}>
                  {role.name}
                </Option>
              ))
            ) : (
              <Option disabled>Нет доступных ролей</Option>
            )}
          </Select>
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit" block disabled={!email||!password||!confirmPassword||!emailRegex.test(email)||!role_id}>
            Регистрация
          </Button>
        </Form.Item>
      </Form>
    );
})