import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { logout } from "@/entities/user/model/userThunk";
import { CLIENT_ROUTES } from "@/app/router";
import { Layout, Menu, Button, Drawer, Space, Spin } from "antd";
import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
// import logo from "../logo_black.png";
import { getAllUsers } from "@/entities/user/model/userCRUDThunk";

const { Header } = Layout;

export const Nav = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { loading: usersLoading } = useAppSelector((state) => state.userCRUD);
  const { user, loading: userLoading } = useAppSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    dispatch(getAllUsers());

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  useEffect(() => {
    document.title = getTitle(location.pathname);
  }, [location.pathname]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate(CLIENT_ROUTES.AUTH);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const getTitle = (pathname: string) => {
    switch (pathname) {
      case CLIENT_ROUTES.HOME:
        return "Главная страница";
      case CLIENT_ROUTES.SERTIFICATES:
        return "Сертификаты";
      case CLIENT_ROUTES.AUTH:
        return "Авторизация";
      case CLIENT_ROUTES.REG:
        return "Регистрация";
      case CLIENT_ROUTES.CART:
        return "Корзина";
      case CLIENT_ROUTES.ACCOUNT_PAGE:
        return "Личный кабинет";
      default:
        return "Название сайта";
    }
  };

  if (usersLoading || userLoading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  const linkStyle = {
    textDecoration: "none",
    color: "#000",
    transition: "border-bottom 0.3s ease",
    borderBottom: "2px solid transparent",
    paddingBottom: "2px",
    ":hover": {
      borderBottom: "2px solid #000",
    },
  };

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        marginBottom: "5px",
        backgroundColor: "#acc8e5",
      }}
    >
      <div style={{ marginRight: "auto" }}>
        <Link to={CLIENT_ROUTES.HOME}>
          <img
            src={`${import.meta.env.VITE_ICON}/logoblack.svg`}
            alt="Logo"
            style={{ width: "200px", marginRight: "16px" }}
          />
        </Link>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Кнопка меню для мобильных устройств */}
        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={showDrawer}
            aria-label="Открыть меню"
            style={{ color: "#000", fontSize: "1.5rem" }}
          />
        )}

        {/* Горизонтальное меню для десктопа */}
        {!isMobile && (
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["home"]}
            selectedKeys={[location.pathname]}
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#acc8e5",
              height: "64px",
              overflow: "hidden",
            }}
          >
            <Menu.Item
              key={CLIENT_ROUTES.SERTIFICATES}
              style={{ backgroundColor: "#acc8e5", height: "100%", order: 1 }}
            >
              <Link to={CLIENT_ROUTES.SERTIFICATES} style={linkStyle}>
                Сертификаты
              </Link>
            </Menu.Item>

            {!user && (
              <Menu.Item
                key={CLIENT_ROUTES.AUTH}
                style={{ backgroundColor: "#acc8e5", height: "100%", order: 2 }}
              >
                <Link to={CLIENT_ROUTES.AUTH} style={linkStyle}>
                  Войти
                </Link>
              </Menu.Item>
            )}

            {!user && (
              <Menu.Item
                key={CLIENT_ROUTES.REG}
                style={{ backgroundColor: "#acc8e5", height: "100%", order: 3 }}
              >
                <Link to={CLIENT_ROUTES.REG} style={linkStyle}>
                  Регистрация
                </Link>
              </Menu.Item>
            )}

            {user && user.role_id !== 2 && (
              <Menu.Item
                key={CLIENT_ROUTES.CART}
                style={{ backgroundColor: "#acc8e5", height: "100%", order: 4 }}
              >
                <Link to={CLIENT_ROUTES.CART} style={linkStyle}>
                  Корзина
                </Link>
              </Menu.Item>
            )}
            {user && (
              <Menu.Item
                key={CLIENT_ROUTES.ACCOUNT_PAGE}
                style={{ backgroundColor: "#acc8e5", height: "100%", order: 5 }}
              >
                <Link to={CLIENT_ROUTES.ACCOUNT_PAGE} style={linkStyle}>
                  Личный кабинет
                </Link>
              </Menu.Item>
            )}
            {user && (
              <Space
                style={{
                  marginLeft: "16px",
                  backgroundColor: "#acc8e5",
                  order: 6,
                }}
              >
                <span style={{ color: "#000", marginRight: "16px" }}>
                  Привет, {user.name}
                </span>

                <Button
                  type="primary"
                  danger
                  icon={<LogoutOutlined />}
                  onClick={logoutHandler}
                  style={{
                    // border: "1px solid #ff4d4f",
                    background: "#00377A",
                    color: "#EFFAFF",
                  }}
                >
                  Выйти
                </Button>
              </Space>
            )}
          </Menu>
        )}
      </div>

      {/* Выдвижное меню для мобильных устройств */}
      <Drawer title="" placement="right" onClose={onClose} visible={visible}>
        <Menu theme="light" mode="vertical" defaultSelectedKeys={["home"]}>
          {user && (
            <Space direction="vertical" style={{ marginTop: "16px" }}>
              <div>Привет, {user.name}</div>
            </Space>
          )}
          <Menu.Item key={CLIENT_ROUTES.HOME}>
            <Link to={CLIENT_ROUTES.HOME} onClick={onClose} style={linkStyle}>
              Главная
            </Link>
          </Menu.Item>
          <Menu.Item key={CLIENT_ROUTES.SERTIFICATES}>
            <Link
              to={CLIENT_ROUTES.SERTIFICATES}
              onClick={onClose}
              style={linkStyle}
            >
              Сертификаты
            </Link>
          </Menu.Item>
          {!user && (
            <Menu.Item key={CLIENT_ROUTES.AUTH}>
              <Link to={CLIENT_ROUTES.AUTH} onClick={onClose} style={linkStyle}>
                Войти
              </Link>
            </Menu.Item>
          )}
          {!user && (
            <Menu.Item key={CLIENT_ROUTES.REG}>
              <Link to={CLIENT_ROUTES.REG} onClick={onClose} style={linkStyle}>
                Регистрация
              </Link>
            </Menu.Item>
          )}
          {user && (
            <Menu.Item key={CLIENT_ROUTES.ACCOUNT_PAGE}>
              <Link to={CLIENT_ROUTES.ACCOUNT_PAGE} style={linkStyle}>
                Личный кабинет
              </Link>
            </Menu.Item>
          )}
          {user && user.role_id !== 2 && (
            <Menu.Item key={CLIENT_ROUTES.CART}>
              <Link to={CLIENT_ROUTES.CART} style={linkStyle}>
                Корзина
              </Link>
            </Menu.Item>
          )}
          {user && (
            <Space direction="vertical" style={{ marginTop: "16px" }}>
              <Button
                type="primary"
                danger
                icon={<LogoutOutlined />}
                onClick={logoutHandler}
                style={{
                  border: "1px solid #ff4d4f",
                  background: "transparent",
                  color: "#ff4d4f",
                }}
              >
                Выйти
              </Button>
            </Space>
          )}
        </Menu>
      </Drawer>
    </Header>
  );
});
