const multer = require('multer')
const path = require('path')
let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/img')
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({ storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
     limits: { fileSize: 100000000 } })
module.exports = {upload}