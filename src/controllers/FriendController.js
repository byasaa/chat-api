const helper = require('../helpers/index')
const friendModel = require('../models/Friend')
const jwt = require('jsonwebtoken')
const config = require('../configs/global')

module.exports = {
    getAllFriend : async (req, res) => {
        const accessToken = req.headers.authorization
        const decoded = jwt.verify(accessToken, config.secretKey)
        req.decodedToken = decoded
        const user_id = decoded.user.id
        try {
            const result = await friendModel.getAllFriendModel(user_id)
            return helper.response(res, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'Error', 'Internal server Error', 500)
        }
    },
    getFriendLocation : async (req, res) => {
        const accessToken = req.headers.authorization
        const decoded = jwt.verify(accessToken, config.secretKey)
        req.decodedToken = decoded
        const user_id = decoded.user.id
        try {
            const result = await friendModel.getFriendLocation(user_id)
            return helper.response(res, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'Error', 'Internal server Error', 500)
        }
    },
    addFriend : async (req, res) => {
        const accessToken = req.headers.authorization
        const decoded = jwt.verify(accessToken, config.secretKey)
        req.decodedToken = decoded
        const user_id = decoded.user.id
        const setData = {
            relating_user_id: user_id,
            related_user_id: req.params.friendId,
            created_at: new Date()
        }
        try {
            const result = await friendModel.addFriendModel(setData)
            req.io.emit('add-friend', result)
            return helper.response(res, 'success', result, 201)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'Error', 'Internal server Error', 500)
        }
    },
    searchUser : async (req, res) => {
        const accessToken = req.headers.authorization
        const decoded = jwt.verify(accessToken, config.secretKey)
        req.decodedToken = decoded
        const user_id = decoded.user.id
        let search = req.query.search
        try {
            const result = await friendModel.searchUserModel(search, user_id)
            if (result[0]){
                return helper.response(res, 'success', result, 200)
            }else{
                return helper.response(res, 'null', 'Not find data', 404)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res, 'Error', 'Internal server Error', 500)
        }
    },

}
