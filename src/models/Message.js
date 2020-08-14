const connection = require('../helpers/mysql')

module.exports = {
    getLastMessageModel : (user_id) => {
        return new Promise((resolve, reject) => {
            connection.query(`select m.*, profiles.name, profiles.image from  messages m left join messages m1 on (((m.sender_id = m1.sender_id and m.receiver_id = m1.receiver_id) or (m.sender_id = m1.receiver_id and m.receiver_id = m1.sender_id ) ) and case when m.created_at = m1.created_at then m.id < m1.id else m.created_at < m1.created_at end ) INNER JOIN profiles on (m.sender_id = profiles.user_id OR m.receiver_id = profiles.user_id) WHERE profiles.user_id != ? AND m1.id is null and ? in(m.sender_id, m.receiver_id) ORDER BY created_at DESC`, [user_id, user_id], (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    getMessageByFriendModel : (user_id, friend_id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT m.*, u1.name AS sender, u2.name AS receiver FROM messages m JOIN profiles u1 ON m.sender_id = u1.user_id JOIN profiles u2 ON m.receiver_id = u2.user_id WHERE sender_id IN (?, ?) AND receiver_id IN (?, ?) ORDER BY created_at ASC`, [user_id, friend_id, user_id, friend_id], (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    postSendMessageModel : (setData) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO messages SET ?", setData, (error, result) => {
                if (error) {
                    reject(error)
                }
                const newData = {id: result.insertId, ...setData}
                resolve(newData)
            })
        })
    },
    
    readMessageModel : (setData) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE messages SET ? WHERE sender_id = ? AND receiver_id = ? AND status = 0", [setData, setData.sender_id, setData.receiver_id], (error, result) => {
                if (error) {
                    reject(error)
                }
                const newData = {...setData}
                resolve(newData)
            })
        })
    },
}
