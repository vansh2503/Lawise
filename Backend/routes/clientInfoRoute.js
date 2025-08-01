// routes/clientInfoRoute.js
const express = require('express');
const { addClientInfo } = require('../controller/clientInfoController');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post('/clientinfo', upload.fields([{ name: 'uploadedPhoto' }, { name: 'caseDetailsPDF' }]), addClientInfo);
//router.post('/clientinfo', addClientInfo);


module.exports = router;
