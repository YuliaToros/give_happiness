const {
    userRegistrationController,
    userAuthorizationController,
    usetLogoutController,
    userRefreshController
  } = require('../controllers/AuthRegController')
  
  const router = require('express').Router()
  const verifyRefreshToken = require('../middleware/verifyRefreshToken')
  
  module.exports = router
    .post('/reg', userRegistrationController)
    .post('/log', userAuthorizationController)
    .delete('/logout', usetLogoutController)
    .get('/refresh', verifyRefreshToken, userRefreshController)