
const bcrypt = require('bcrypt')
const jwtConfig = require('../config/jwtConfig')
const generateTokens = require('../utils/generateTokens')

const UserAuthRegService = require('../services/user.service')

exports.userRegistrationController = async (req, res) => {
  try {
    // const { name, email, password, phone, verify_status, company_name, company_description, city_id, role_id } = req.body;
    const { name, email, password, role_id } = req.body;
    console.log(1111, req.body);
    

    // Проверка на наличие всех необходимых полей
    if (!email || !password ) {
      return res.status(400).json({ message: 'Please, fill the fields' });
    }

    // Проверка на пустые строки
    if (email.trim() === '' || password.trim() === '' ) {
      return res.status(400).json({ message: 'Please, fill the fields' });
    }

    // Проверка типа данных для name
   
    let user = await UserAuthRegService.getUserByEmail(email);
console.log(1);

    if (!user) {
      user = await UserAuthRegService.addUser({
        name,
        email, 
        password: await bcrypt.hash(password, 10),
        // phone,
        // verify_status,
        // company_name,
        // company_description,
        // city_id,
        role_id,
      });
console.log(2);

      delete user.password;
      res.locals.user = user;
      const { accessToken, refreshToken } = generateTokens({ user });
      res.status(201).cookie(jwtConfig.refresh.type, refreshToken, {
        httpOnly: true,
        maxAge: jwtConfig.refresh.expiresIn,
      }).json({ message: 'success', user, accessToken });
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
    const { email, password } = req.body
    if (email.trim() === '' || password.trim() === '') {
      console.log('Please, fill the fields');
    }

    const user = await UserAuthRegService.getUserByEmail(email)
    if (user) {
      const comparePassword = await bcrypt.compare(password, user.password)
      if (comparePassword) {
        delete user.password
        res.locals.user = user

        const { accessToken, refreshToken } = generateTokens({ user })
        res.status(200).cookie(jwtConfig.refresh.type, refreshToken, {
          httpOnly: true,
          maxAge: jwtConfig.refresh.expiresIn,
        }).json({ message: 'success', user, accessToken })
        return
      }
    }
    res.status(400).json({ message: 'Email or password is not correct' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.usetLogoutController = async (req, res) => {
  try {
    res.locals.user = null

    res.clearCookie('refreshToken').status(204).json({ message: 'Success logout' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.userRefreshController = async (req, res) => {
  
  try {
    const { user } = res.locals
    const { accessToken, refreshToken } = generateTokens({ user })
    
    res.status(200).cookie(jwtConfig.refresh.type, refreshToken, {
      httpOnly: true,
      maxAge: jwtConfig.refresh.expiresIn
    }).json({ message: 'success', user, accessToken })
    
  } catch (error) {
    res.status(401).json({ message: error.message })
  }


}
