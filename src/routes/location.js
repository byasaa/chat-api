const express = require('express')
const router = express.Router()
const locationController = require('../controllers/LocationController')
const {verifyToken} = require('../middlewares/auth')
router
    .put('/', verifyToken, locationController.updateLocation)

module.exports = router;
