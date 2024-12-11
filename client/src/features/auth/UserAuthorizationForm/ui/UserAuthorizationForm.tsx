import { CLIENT_ROUTES } from "@/app/router";
import { authorization } from "@/entities/user/model/userThunk";
import { useAppDispatch } from "@/shared/hooks/rtkHooks";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";

export const UserAuthorizationForm = React.memo(() => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const authHandler = async () => {
        if (!emailRegex.test(email)) {
          return message.error("Введите корректный email!");
        }
    
        try {
          const resultAction = await dispatch(authorization({ email, password }));
    
          if (authorization.fulfilled.match(resultAction)) {
            navigate(CLIENT_ROUTES.ACCOUNT_PAGE);
          } else {
            message.error("Ошибка авторизации. Проверьте email и пароль.");
          }
        } catch (error) {
          console.error("Ошибка при авторизации:", error);
          message.error("Произошла ошибка. Попробуйте ещё раз.");
        }
      };
    

    return (
        <Form
          layout="vertical"
          onFinish={authHandler}
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
          <h2 style={{ textAlign: "center" }}>Авторизация</h2>
    
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
            rules={[{ required: true, message: "Введите ваш пароль" }]}
          >
            <Input.Password
              defaultValue={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Ваш пароль"
            />
          </Form.Item>
    
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              disabled={!email || !password ||!emailRegex.test(email)}
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
      );
})

