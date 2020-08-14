const express = require('express')
const router = express.Router()

const authRouter = require('./auth')
const profileRouter = require('./profile')
const messageRouter = require('./message')
const friendRouter = require('./friend')
const locationRouter = require('./location')

router
    .use('/auth', authRouter)
    .use('/profile', profileRouter)
    .use('/message', messageRouter)
    .use('/friend', friendRouter)
    .use('/location', locationRouter)

module.exports = router