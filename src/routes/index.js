const express = require('express');
const router = express.Router();
const messageRoutes = require('./messageRoutes');

router.use('/messages', messageRoutes);

module.exports = router;