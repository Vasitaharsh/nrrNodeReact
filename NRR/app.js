const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // Security headers
const morgan = require('morgan');
const nrrRoutes = require('./routes/nrrRoutes');

const app = express();

// Security Middleware
app.use(helmet()); // Set security headers

// Enable CORS
app.use(cors());

app.use(morgan());

// Body parser
app.use(express.json());

// Routes
app.use('/api/nrr', nrrRoutes);

// Route Not Found Handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
