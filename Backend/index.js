// index.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const RouterProduct=require("./routes/auth");
const authRoutes = require("./routes/auth"); // Import auth routes
const clientInfoRoute = require('./routes/clientInfoRoute');
const lawyerRoutes = require('./routes/lawyerRoutes');
const caseFilterRoutes = require('./routes/caseFilter');
// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;
const clientRoutes = require('./routes/clients'); // Assuming the above code is in "clients.js"


// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // For parsing application/json
app.use('/clients', clientRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
// const authRoutes = require('./routes/auth'); // Uncomment if you have auth routes
// app.use('/auth', authRoutes); // Adjust the path as necessary

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.use(express.urlencoded({ extended: true })); 
//app.use("/", authRoutes); // Use auth routes

app.use('/clientinfo', clientInfoRoute);
app.use("/",RouterProduct);
app.use('/lawyer', lawyerRoutes); // Lawyer routes



app.use('/api', caseFilterRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
