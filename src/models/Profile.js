const connection = require('../helpers/mysql')

module.exports = {
    getUserProfileModel : (user_id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT users.id as id, profiles.image, profiles.name, profiles.about, users.username FROM `profiles` INNER JOIN users ON profiles.user_id = users.id WHERE user_id = ?", user_id, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    addUserProfile : (setData) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO profiles SET ?", setData, (error, result) => {
                if (error) {
                    reject(error)
                }
                const newData = {id: result.insertId, ...setData}
                resolve(newData)
            })
        })
    },
    editProfileModel : (setData, user_id) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE profiles SET ? WHERE user_id=?", [setData, user_id], (error, result) => {
                if (error) {
                    reject(error)
                }
                const newData = {
                    user_id,
                    ...setData
                }
                resolve(newData)
            })
        })
    },
}