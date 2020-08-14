const helper = require('../helpers/index')
const messageModel = require('../models/Message')
const jwt = require('jsonwebtoken')
const config = require('../configs/global')

module.exports = {
    getLastMessage : async (req, res) => {
        const accessToken = req.headers.authorization
        const decoded = jwt.verify(accessToken, config.secretKey)
        req.decodedToken = decoded
        const user_id = decoded.user.id
        try {
            const result = await messageModel.getLastMessageModel(user_id)
            return helper.response(res, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'Error', 'Internal server Error', 500)
        }
    },
    getMessageByFriend : async (req, res) => {
        const friend_id = req.params.friend_id
        const accessToken = req.headers.authorization
        const decoded = jwt.verify(accessToken, config.secretKey)
        req.decodedToken = decoded
        const user_id = decoded.user.id
        try {
            const result = await messageModel.getMessageByFriendModel(user_id, friend_id)
            return helper.response(res, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'Error', 'Internal server Error', 500)
        }
    },
    postSendMessage : async (req, res) => {
        const setData = req.body;
        const accessToken = req.headers.authorization
        const decoded = jwt.verify(accessToken, config.secretKey)
        req.decodedToken = decoded
        setData.sender_id = decoded.user.id
        try {
            const result = await messageModel.postSendMessageModel(setData);
            req.io.emit('personal-message', result)
            return helper.response(res, 'success', result, 201);
          } catch (error) {
            console.log(error);
            return helper.response(res, 'fail', 'Internal Server Error', 500);
          }
    },
    readMessage : async (req, res) => {
        const setData = {};
        const accessToken = req.headers.authorization
        const decoded = jwt.verify(accessToken, config.secretKey)
        req.decodedToken = decoded
        setData.receiver_id = decoded.user.id
        setData.sender_id = req.params.sender_id
        setData.updated_at = new Date()
        setData.status = 1
        try {
            const result = await messageModel.readMessageModel(setData);
            req.io.emit('read-message', result)
            return helper.response(res, 'success', result, 200);
          } catch (error) {
            console.log(error);
            return helper.response(res, 'fail', 'Internal Server Error', 500);
          }
    }
}
