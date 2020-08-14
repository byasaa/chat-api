const express = require('express')
const router = express.Router()
const messageController = require('../controllers/MessageController')
const {verifyToken} = require('../middlewares/auth')

router
    .get('/last/', verifyToken, messageController.getLastMessage)
    .get('/:friend_id', verifyToken, messageController.getMessageByFriend)
    .post('/', verifyToken, messageController.postSendMessage)
    .put('/:sender_id', verifyToken, messageController.readMessage)

module.exports = router;