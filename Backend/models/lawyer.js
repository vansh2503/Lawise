//models/lawyer.js
const mongoose = require('mongoose');

const lawyerSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    caseCategory: { type: String, required: true },
    uploadedPhoto: { type: String }, // URL or path to the uploaded photo
    //caseDetailsPDF: { type: String } // URL or path to the uploaded PDF
}, { timestamps: true });

module.exports = mongoose.model('Lawyer', lawyerSchema);
