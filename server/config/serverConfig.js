const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require('path');
const fs = require('fs'); // Для работы с файловой системой
const https = require('https'); // Для поддержки HTTPS

const serverConfig = (app) => {
  // Погран. служба / парсит тело из формы
  app.use(express.urlencoded({ extended: true }));

  // CORS
  app.use(
    cors({
      origin: ["https://gift-happy.ru"],
      optionsSuccessStatus: 200,
      credentials: true
    })
  );

  app.use(express.static(path.join(__dirname, '../public/dist')));

  // погран. служба регистрации / парсит JSON
  app.use(express.json());

  // "Служба" фиксации логов
  app.use(morgan("dev"));

  // Печеньки!!!!
  app.use(cookieParser());

  // Настройка статики, папка public ассоциирована с маршрутом запроса
  app.use('/banner', express.static(path.join(__dirname, '..', 'public', 'img', 'banner')));
  app.use('/icon', express.static(path.join(__dirname, '..', 'public', 'img', 'icon')));
};

// Функция для запуска сервера
const startServer = (app) => {
  // Настройка HTTPS
  const options = {
    cert: fs.readFileSync(path.join(__dirname, '..', 'ssl', 'fullchain.pem')), // Путь к сертификату
    key: fs.readFileSync(path.join(__dirname, '..', 'ssl', 'privkey.pem'))    // Путь к приватному ключу
  };

  // Запуск сервера на HTTPS
  https.createServer(options, app).listen(443, () => {
    console.log('Сервер запущен на https://gift-happy.ru');
  });
};

module.exports = { serverConfig, startServer }; // Экспортируем объект