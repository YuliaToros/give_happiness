const express = require('express');
require("dotenv").config();
const { startServer } = require('./config/serverConfig'); // Импортируем объект // serverConfig, 
const indexRouter = require('./routes/index.routes');
const path = require('path');

const app = express();

// конфигурация сервера app.js:
const PORT = process.env.PORT ?? 3000;

// Конфигурация сервера
//serverConfig(app); // Вызываем метод serverConfig
// Запуск сервера
startServer(app); 

// маршрутизация
app.use('/', indexRouter)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'))
});

// запускаю прослушивание сервера на 3000 порту
app.listen(PORT, () => console.log(`Server started at ${PORT} port`))


// Вызываем метод startServer
