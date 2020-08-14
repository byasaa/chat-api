const helper = require('../helpers/index')
const locationModel = require('../models/Location')
const jwt = require('jsonwebtoken')
const config = require('../configs/global')

module.exports = {
    updateLocation : async (req, res) => {
        const accessToken = req.headers.authorization
        const decoded = jwt.verify(accessToken, config.secretKey)
        req.decodedToken = decoded
        const user_id = decoded.user.id
        const setData = {
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            updated_at: new Date()
        }
        try {
            const result = await locationModel.updateLocationModel(user_id, setData)
            return helper.response(res, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'Error', 'Internal server Error', 500)
        }
    },
}
