const connection = require('../helpers/mysql')

module.exports = {
    updateLocationModel: (user_id, setData) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE user_location SET ? WHERE user_id=?", [setData, user_id], (error, result) => {
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
};