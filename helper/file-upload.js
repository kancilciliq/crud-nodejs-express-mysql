const multer = require('multer')
const util = require('util')

const DIR = './resource/upload'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, DIR)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage }).single('file-upload')
  util.promisify(upload)

  let fileUpload = util.promisify(upload)

  module.exports = fileUpload