const helper = require('../helpers/index')
const profileModel = require('../models/Profile')
const jwt = require('jsonwebtoken')
const config = require('../configs/global')

module.exports = {
    getUserProfile : async (req, res) => {
        const user_id = req.params.user_id
        try {
            const result = await profileModel.getUserProfileModel(user_id)
            return helper.response(res, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'Error', 'Internal server Error', 500)
        }
    },
    addProfile : async (req, res)  => {
        const setData = {
            image : req.file.filename,
            ...req.body
        }
        const accessToken = req.headers.authorization
        const decoded = jwt.verify(accessToken, config.secretKey)
        req.decodedToken = decoded
        const user_id = decoded.user.id
        setData.user_id = user_id
        try {
            const result = await profileModel.addUserProfile(setData)
            return helper.response(res, 'success', result, 201)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'fail', 'Internal server Error', 500)
        }
    },
    editProfile : async (req, res) => {
        const setData = {
            image : req.file.filename,
            ...req.body
        }
        const accessToken = req.headers.authorization
        const decoded = jwt.verify(accessToken, config.secretKey)
        req.decodedToken = decoded
        const user_id = decoded.user.id
        setData.user_id = user_id
        const id = req.params.user_id
        setData.updated_at = new Date()
        try {
            const result = await profileModel.editProfileModel(setData,id);
            return helper.response(res, 'success', result, 200)
        } catch (error) {
            if (error) {
                console.log(error)
                return helper.response(res, 'fail', 'Internal server Error', 500)
            }
        }
    },
}
