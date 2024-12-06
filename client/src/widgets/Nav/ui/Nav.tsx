import { CLIENT_ROUTES } from "@/app/router";
import { logout } from "@/entities/user/model/userThunk";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Nav = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user)

  const logoutHandler = () => {
    dispatch(logout());
    navigate(CLIENT_ROUTES.AUTH);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to={CLIENT_ROUTES.HOME} className="navbar-brand">Тут логотип</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to={CLIENT_ROUTES.HOME} className="nav-link active" aria-current="page">Главная</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={CLIENT_ROUTES.SERTIFICATES} className="nav-link">Сертификаты</Link>
                        </li>
                        <li>
                        {!user && <li className="nav-item">
                            <Link to={CLIENT_ROUTES.AUTH} className="nav-link">Войти</Link>
                        </li>}
                        </li>
                        {!user && <li className="nav-item">
                            <Link to={CLIENT_ROUTES.REG} className="nav-link">Регистрация</Link>
                        </li>}
                        {user && <li className="nav-item">
                            <div>Привет, ТУТ ИМЯ</div>
                        </li>}
                        {user && <li className="nav-item">
                            <button type='button' onClick={logoutHandler} className='btn btn-danger'>Выйти</button>
                        </li>}
                    </ul>
                </div>
            </div>
        </nav>
  );
})

