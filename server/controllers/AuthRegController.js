const bcrypt = require('bcrypt');
const jwtConfig = require('../config/jwtConfig');
const generateTokens = require('../utils/generateTokens');
const UserAuthRegService = require('../services/user.service');
const CartService = require('../services/cart.service');

exports.userRegistrationController = async (req, res) => {
  try {
    const { name, email, password, role_id } = req.body;

    // Проверка на наличие всех необходимых полей
    if (!email || !password) {
      return res.status(400).json({ message: 'Please, fill the fields' });
    }

    // Проверка на пустые строки
    if (email.trim() === '' || password.trim() === '') {
      return res.status(400).json({ message: 'Please, fill the fields' });
    }

    // Проверка на существование пользователя
    let user = await UserAuthRegService.getUserByEmail(email);

    if (!user) {
      // Создание нового пользователя
      user = await UserAuthRegService.addUser({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        role_id,
      });

      // Создание корзины для пользователя
      const cart = await CartService.createCart(user.id);

      // Удаление пароля из объекта пользователя перед отправкой
      delete user.password;

      // Генерация токенов
      const { accessToken, refreshToken } = generateTokens({ user });

      // Возврат данных пользователя, корзины и токенов
      res.status(201)
        .cookie(jwtConfig.refresh.type, refreshToken, {
          httpOnly: true,
          maxAge: jwtConfig.refresh.expiresIn,
        })
        .json({ message: 'success', user, cart, accessToken });
      return;
    }

    res.status(400).json({ message: 'This email already exists' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.userAuthorizationController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || email.trim() === '' || password.trim() === '') {
      return res.status(400).json({ message: 'Please, fill the fields' });
    }

    const user = await UserAuthRegService.getUserByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Удаление пароля из объекта пользователя перед отправкой
        delete user.password;

        // Получение корзины пользователя
        let cart = await CartService.getUserCart(user.id);
        if (!cart) {
          cart = await CartService.createCart(user.id); // Создаем корзину
        }

        // Генерация токенов
        const { accessToken, refreshToken } = generateTokens({ user });

        // Возврат данных пользователя, корзины и токенов
        res.status(200)
          .cookie(jwtConfig.refresh.type, refreshToken, {
            httpOnly: true,
            maxAge: jwtConfig.refresh.expiresIn,
          })
          .json({ message: 'success', user, cart, accessToken });
        return;
      }
    }

    res.status(400).json({ message: 'Email or password is not correct' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.userLogoutController = async (req, res) => {
  try {
    res.locals.user = null;

    res.clearCookie('refreshToken').status(204).json({ message: 'Success logout' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.userRefreshController = async (req, res) => {
  try {
    const { user } = res.locals;

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Генерация новых токенов
    const { accessToken, refreshToken } = generateTokens({ user });

    res.status(200)
      .cookie(jwtConfig.refresh.type, refreshToken, {
        httpOnly: true,
        maxAge: jwtConfig.refresh.expiresIn,
      })
      .json({ message: 'success', user, accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
