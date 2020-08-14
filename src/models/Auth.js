const connection = require('../helpers/mysql');

module.exports = {
    getUserByUsername: (username) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM users WHERE username = ?", username, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    registerModel: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO users SET ?", setData, (error, result) => {
                if (error) {
                    reject(error)
                }
                const newData = {
                    id: result.insertId,
                    ...setData
                }
                delete newData.password
                resolve(newData)
                connection.query(`INSERT INTO user_location (user_id, latitude, longitude) VALUES (${result.insertId}, 0, 0)`)
            })
        })
    },
};