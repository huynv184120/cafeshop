import multer from 'multer'

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const upload = multer({
    limits: {
        fileSize: MAX_FILE_SIZE
    }
})

export default upload