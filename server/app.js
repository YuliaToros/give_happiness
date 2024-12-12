const express = require('express');
require("dotenv").config();
const { serverConfig, startServer } = require('./config/serverConfig'); // Импортируем объект
const indexRouter = require('./routes/index.routes');

const app = express();
const PORT = 3000;

// Конфигурация сервера
serverConfig(app); // Вызываем метод serverConfig

// Маршрутизация
app.use('/', indexRouter);

// Запуск сервера
startServer(app); // Вызываем метод startServer