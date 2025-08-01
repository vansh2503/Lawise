// controller/uploadMiddleware.js
const multer = require('multer');

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|pdf/; // Add pdf to the accepted types
        const extName = fileTypes.test(file.mimetype);
        if (extName) {
            return cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.'));
        }
    }
});

module.exports = upload;
