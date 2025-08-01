//contrller/lawyercontroller
const Lawyer = require('../models/lawyer');
const path = require('path');
const fs = require('fs');

exports.createLawyerInfo = async (req, res) => {
    try {
        const { email, name, phoneNumber, address, caseCategory } = req.body;
        const uploadedPhoto = req.file ? req.file.path : '';
        //const caseDetailsPDF = req.files.caseDetailsPDF ? req.files.caseDetailsPDF[0].path : '';

        const lawyer = new Lawyer({
            email,
            name,
            phoneNumber,
            address,
            caseCategory,
            uploadedPhoto,
            //caseDetailsPDF
        });

        await lawyer.save();
        res.status(201).json({ message: "Lawyer info submitted successfully", lawyer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error submitting lawyer info", error });
    }
};

exports.getLawyerInfo = async (req, res) => {
    try {
        const lawyer = await Lawyer.findById(req.params.id);
        if (!lawyer) {
            return res.status(404).json({ message: "Lawyer not found" });
        }
        res.status(200).json(lawyer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching lawyer info", error });
    }
};
