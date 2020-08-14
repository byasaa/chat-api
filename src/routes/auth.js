const express = require('express')
const router = express.Router()
const authController = require('../controllers/AuthController')

router
    .post('/register', authController.register)
    .post('/login', authController.login)
    .post('/token', authController.token)

module.exports = router;