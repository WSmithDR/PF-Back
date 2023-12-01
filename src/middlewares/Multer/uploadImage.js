const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({
  storage: storage,
  limits: {fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/
    const mimType = fileTypes.test(file.mimetype)
    const extname = fileTypes.test(path.extname(file.originalname))

    if(mimType && extname) {
      return cb(null, true)
    }
    cb('Give proper files formate to upload')
  }
}).single('img')

module.exports = upload;