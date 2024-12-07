const {
    userRegistrationController,
    userAuthorizationController,
    usetLogoutController,
    userRefreshController
  } = require('../controllers/AuthRegController')
  
  const router = require('express').Router()
  const verifyRefreshToken = require('../middleware/verifyRefreshToken')
  
  module.exports = router
    .post('/registration', userRegistrationController)
    .post('/authorization', userAuthorizationController)
    .delete('/logout', usetLogoutController)
    .get('/refresh', verifyRefreshToken, userRefreshController)