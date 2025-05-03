const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/phone/:phoneNumber', messageController.getMessagesByPhone);

module.exports = router;