//routes/lawyerRoutes.js 
const express = require('express');
const multer = require('multer');
const lawyerController = require('../controller/lawyercontroller');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Ensure 'uploads' folder exists

router.post('/lawyerinfo', upload.single('uploadedPhoto'), lawyerController.createLawyerInfo);
router.get('/lawyerinfo/:id', lawyerController.getLawyerInfo);
router.get('/all', lawyerController.getAllLawyers);

module.exports = router;
