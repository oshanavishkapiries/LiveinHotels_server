const express = require('express');
const router = express.Router();

// Import routes
const userRoutes = require('./user.router');

// Mount routes
router.use('/user', userRoutes);


module.exports = router;
