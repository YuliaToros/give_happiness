const express = require('express');
require("dotenv").config();
const { serverConfig, startServer } = require('./config/serverConfig'); // Импортируем объект
const indexRouter = require('./routes/index.routes');
const path = require('path');

const app = express();

// конфигурация сервера app.js:
const PORT = process.env.PORT ?? 3000;

// Конфигурация сервера
serverConfig(app); // Вызываем метод serverConfig

// маршрутизация
app.use('/', indexRouter)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'))
});

// запускаю прослушивание сервера на 3000 порту
app.listen(PORT, () => console.log(`Server started at ${PORT} port`))

// Запуск сервера
startServer(app); // Вызываем метод startServer