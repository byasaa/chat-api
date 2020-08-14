const connection = require('../helpers/mysql')

module.exports = {
    getAllFriendModel: (user_id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT user_relationships.id, user_relationships.created_at, profiles.user_id, profiles.name, profiles.image, profiles.about FROM user_relationships INNER JOIN profiles ON user_relationships.related_user_id = profiles.user_id WHERE user_relationships.relating_user_id = ?", user_id, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    getFriendLocation: (user_id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT user_location.id, user_relationships.related_user_id as friendId, profiles.name, profiles.image, user_location.latitude, user_location.longitude FROM user_relationships INNER JOIN profiles ON user_relationships.related_user_id = profiles.user_id INNER JOIN user_location ON user_relationships.related_user_id = user_location.user_id WHERE user_relationships.relating_user_id = ?", user_id, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    addFriendModel: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO user_relationships SET ?", setData, (error, result) => {
                if (error) {
                    reject(error)
                }
                const newData = {id: result.insertId, ...setData}
                resolve(newData)
            })
        })
    },
    searchUserModel: (search, user_id) => {
        return new Promise((resolve, reject) => {
            const find = `%${search}%`
            connection.query(`SELECT users.id, users.username, profiles.name, profiles.image, profiles.about FROM users INNER JOIN profiles ON users.id = profiles.user_id WHERE username LIKE ? OR name LIKE ? AND users.id != ?`, [find, find, user_id], (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    }
};