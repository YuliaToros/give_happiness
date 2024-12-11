
import React, { useEffect,  useState } from "react";
import { useNavigate } from "react-router-dom"; // , useLocation
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { logout } from "@/entities/user/model/userThunk";
import { CLIENT_ROUTES } from "@/app/router";
import { Layout, Menu, Button, Drawer, Space, Spin } from "antd";
import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../logo_black.png";
import { getAllUsers } from "@/entities/user/model/userCRUDThunk";

const { Header } = Layout;

export const Nav = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading: usersLoading } = useAppSelector((state) => state.userCRUD);
  const { user, loading: userLoading } = useAppSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Изначально проверяем ширину экрана

  useEffect(() => {
    dispatch(getAllUsers());

    // Обработчик изменения размера окна
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Обновляем состояние при изменении ширины экрана
    };

    // Добавляем слушатель события resize
    window.addEventListener("resize", handleResize);

    // Убираем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  useEffect(() => {
    // Обновляем заголовок в зависимости от маршрута
    document.title = getTitle(location.pathname);
  }, []); // Зависимость от location


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

  const getTitle = (pathname: any ) => {
    switch (pathname) {
      case CLIENT_ROUTES.HOME:
        return 'Главная страница';
      case CLIENT_ROUTES.SERTIFICATES:
        return 'Сертификаты';
      case CLIENT_ROUTES.AUTH:
        return 'Авторизация';
      case CLIENT_ROUTES.REG:
        return 'Регистрация';
      case CLIENT_ROUTES.CART:
        return 'Корзина';
      case CLIENT_ROUTES.ACCOUNT_PAGE:
        return 'Личный кабинет';
      default:
        return 'Название сайта'; // Заголовок по умолчанию
    }
  };

  if (usersLoading || userLoading) {
    return <div>Loading...</div>;
  }

  if (usersLoading || userLoading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

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
            {user && user?.role_id !== 2 && (
              <Menu.Item key="cart">
                <Link to={CLIENT_ROUTES.CART}>Корзина</Link>
              </Menu.Item>
            )}
            {user && (
              <Space style={{ marginLeft: "16px" }}>
                <Menu.Item key="account">
                  <Link to={CLIENT_ROUTES.ACCOUNT_PAGE}>Личный кабинет</Link>
                </Menu.Item>
                <span style={{ color: "#000", marginRight: "16px" }}>
                  Привет, {user.name}
                </span>
                <Button
                  type="primary"
                  danger
                  icon={<LogoutOutlined />}
                  onClick={logoutHandler}
                  style={{ border: '1px solid #ff4d4f', background: 'transparent', color: '#ff4d4f' }}
                  //hoverStyle={{ background: '#ff4d4f', color: '#fff' }}
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
        <Menu
          theme="light"
          mode="vertical"
          defaultSelectedKeys={["home"]}
        >
          {user && (
            <Space direction="vertical" style={{ marginTop: "16px" }}>
              <div>
                Привет, {user.name}
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
                style={{ border: '1px solid #ff4d4f', background: 'transparent', color: '#ff4d4f' }}
                //hoverStyle={{ background: '#ff4d4f', color: '#fff' }}
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
    