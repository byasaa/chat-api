const express = require('express')
const router = express.Router()
const profileController = require('../controllers/ProfileController')
const multer = require('../helpers/multer')
const {verifyToken} = require('../middlewares/auth')

router
    .get('/:user_id', verifyToken, profileController.getUserProfile)
    .post('/', verifyToken, multer.upload.single('image'), profileController.addProfile)
    .put('/:user_id', verifyToken, multer.upload.single('image'), profileController.editProfile)

module.exports = router;