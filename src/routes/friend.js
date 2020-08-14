const express = require('express')
const router = express.Router()
const friendController = require('../controllers/FriendController')
const {verifyToken} = require('../middlewares/auth')
router
    .get('/search', verifyToken, friendController.searchUser)
    .get('/all', verifyToken, friendController.getAllFriend)
    .get('/location', verifyToken, friendController.getFriendLocation)
    .post('/:friendId', verifyToken, friendController.addFriend)

module.exports = router;
