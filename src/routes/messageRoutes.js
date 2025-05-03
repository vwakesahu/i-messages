const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/phone/:phoneNumber', messageController.getMessagesByPhone);
router.post('/send', messageController.sendMessage);
router.get('/', messageController.getAllMessages);


module.exports = router;