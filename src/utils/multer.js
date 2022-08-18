const multer = require('multer');

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

var storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
      cb(null, 'uploaded-' + Date.now()+".png")
    }
  })

const upload = multer({
    limits: {
        fileSize: MAX_FILE_SIZE
    },
    storage
})


module.exports = upload;