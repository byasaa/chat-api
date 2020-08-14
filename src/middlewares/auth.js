const jwt = require('jsonwebtoken')
const config = require('../configs/global')
const helper = require('../helpers')

module.exports = {
    verifyToken: (req, res, next) => {
        const token = req.headers.authorization
        try {
            const decoded = jwt.verify(token, config.secretKey)
            req.decodedToken = decoded
            next()
        } catch (error) {
            console.log(error.name)
            if (error.name === 'TokenExpiredError') {
                return helper.response(res, 'TokenExpiredError', 'Token expired', 401)
            } else if (error.name === 'JsonWebTokenError') {
                return helper.response(res, 'JsonWebTokenError', 'Invalid Token', 401)
            } else {
                return helper.response(res, 'Error', 'Invalid user Token', 401)
            }
        }
    }
}