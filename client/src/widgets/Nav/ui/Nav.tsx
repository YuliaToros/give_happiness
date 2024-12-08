import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { logout } from "@/entities/user/model/userThunk";
import { CLIENT_ROUTES } from "@/app/router";
import { Layout, Menu, Button, Drawer, Space } from "antd";
import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../logo_black.png";
import { getAllUsers } from "@/entities/user/model/userCRUDThunk";

const { Header } = Layout;

export const Nav = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    userCRUD,
    loading: usersLoading,
    error: usersError,
  } = useAppSelector((state) => state.userCRUD);
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useAppSelector((state) => state.user);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

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

  if (usersLoading || userLoading) {
    return <div>Loading...</div>;
  }

  const userRoleName = user?.role ? user?.role.name : "Роль не указана";

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        marginBottom: "5px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div style={{ marginRight: "auto" }}>
        <Link to={CLIENT_ROUTES.HOME}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "50px", marginRight: "16px" }}
          />
        </Link>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={showDrawer}
          style={{ color: "#000", fontSize: "1.5rem", display: "none" }}
          className="mobile-menu-button"
        />
        <Menu
          className="nav-menu"
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Menu.Item key="certificates">
            <Link to={CLIENT_ROUTES.SERTIFICATES}>Сертификаты</Link>
          </Menu.Item>
          {!user && (
            <Menu.Item key="auth">
              <Link to={CLIENT_ROUTES.AUTH}>Войти</Link>
            </Menu.Item>
          )}
          {!user && (
            <Menu.Item key="reg">
              <Link to={CLIENT_ROUTES.REG}>Регистрация</Link>
            </Menu.Item>
          )}
          {user?.role_id !== 2 && (
            <>
              <Link to={CLIENT_ROUTES.CART}>Корзина</Link>
            </>
          )}
          {user && (
            <Space style={{ marginLeft: "16px" }}>
              <Menu.Item key="account">
                <Link to={CLIENT_ROUTES.ACCOUNT_PAGE}>Личный кабинет</Link>
              </Menu.Item>
              <span style={{ color: "#000", marginRight: "16px" }}>
                Привет, {user.name} вы {userRoleName}
              </span>
              <Button
                type="primary"
                danger
                icon={<LogoutOutlined />}
                onClick={logoutHandler}
              >
                Выйти
              </Button>
            </Space>
          )}
        </Menu>
      </div>
      <Drawer title="" placement="right" onClose={onClose} visible={visible}>
        <Menu
          className="nav-menu"
          theme="light"
          mode="vertical"
          defaultSelectedKeys={["home"]}
        >
          {user && (
            <Space direction="vertical" style={{ marginTop: "16px" }}>
              <div>
                Привет, {user.name} вы {userRoleName}
              </div>
            </Space>
          )}
          <Menu.Item key="home">
            <Link to={CLIENT_ROUTES.HOME} onClick={onClose}>
              Главная
            </Link>
          </Menu.Item>
          <Menu.Item key="certificates">
            <Link to={CLIENT_ROUTES.SERTIFICATES} onClick={onClose}>
              Сертификаты
            </Link>
          </Menu.Item>
          {!user && (
            <Menu.Item key="auth">
              <Link to={CLIENT_ROUTES.AUTH} onClick={onClose}>
                Войти
              </Link>
            </Menu.Item>
          )}
          {!user && (
            <Menu.Item key="reg">
              <Link to={CLIENT_ROUTES.REG} onClick={onClose}>
                Регистрация
              </Link>
            </Menu.Item>
          )}
          {user && (
            <Space direction="vertical" style={{ marginTop: "16px" }}>
              <Menu.Item key="account">
                <Link to={CLIENT_ROUTES.ACCOUNT_PAGE}>Личный кабинет</Link>
              </Menu.Item>
              <Button
                type="primary"
                danger
                icon={<LogoutOutlined />}
                onClick={logoutHandler}
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

// Добавляем стили для медиа-запросов
const styles = `
  @media (max-width: 768px) {
    .mobile-menu-button {
      display: block !important;
    }
    .ant-menu-horizontal {
      display: none !important;
    }
  }
  .nav-menu a {
    text-decoration: none;
    color: black; /* Adjust color as needed */
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
