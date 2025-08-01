//models/clientinfo.js
const mongoose = require('mongoose');

const clientInfoSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    aadharDetails: {
        type: String,
        required: true,
    },
    legalInfo: {
        type: String,
        required: true,
    },
    uploadedPhoto: {
        type: String, // URL to the uploaded JPEG photo
        required: false,
    },
    caseDetailsPDF: {
        type: String, // URL to the uploaded PDF file
        required: false,
    },
    caseCategory: {
        type: String,
        enum: ['Corporate Law', 'Family Law', 'Criminal Defense'],
        required: true,
    },
});

const ClientInfo = mongoose.model('ClientInfo', clientInfoSchema);

module.exports = ClientInfo;
