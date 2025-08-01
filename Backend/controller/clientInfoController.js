//controller/clientInfoController
const ClientInfo = require('../models/clientInfo'); // Import your MongoDB model

// Function to store client info
const addClientInfo = async (req, res) => {
    try {
        const { email, name, phoneNumber, address, aadharDetails, legalInfo, caseCategory } = req.body;
        const uploadedPhoto = req.files?.uploadedPhoto?.[0]?.path; // Adjusting for array format
        const caseDetailsPDF = req.files?.caseDetailsPDF?.[0]?.path;

        const clientInfo = new ClientInfo({
            email,
            name,
            phoneNumber,
            address,
            aadharDetails,
            legalInfo,
            uploadedPhoto, // Ensure this field name matches your schema
            caseDetailsPDF,
            caseCategory
        });

        await clientInfo.save();
        res.status(200).json({ message: "Client info stored successfully" });
    } catch (error) {
        console.error("Error Saving Client Info:", error); // Now inside catch block where error is defined
        res.status(500).json({ error: "An error occurred while saving client info", details: error.message });
    }
};

module.exports = { addClientInfo };
