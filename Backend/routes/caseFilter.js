// In routes/caseFilter.js
const express = require('express');
const router = express.Router();
const Lawyer = require('../models/lawyer');
const Client = require('../models/clientInfo');

// Get lawyers by case category for client view
router.get('/lawyers/:caseCategory', async (req, res) => {
  try {
    const lawyers = await Lawyer.find({ caseCategory: req.params.caseCategory });
    res.json(lawyers);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get clients by case category for lawyer view
router.get('/clients/:caseCategory', async (req, res) => {
  try {
    const clients = await Client.find({ caseCategory: req.params.caseCategory });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
