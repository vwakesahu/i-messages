const db = require('../db');
const utils = require('../utils');

const getMessagesByPhone = async (req, res, next) => {
  try {
    const phoneNumber = req.params.phoneNumber;
    const direction = req.query.direction;
    
    if (!utils.validatePhoneNumber(phoneNumber)) {
      return res.status(400).json({ 
        error: 'Invalid phone number format. Use international format with + prefix.'
      });
    }
    
    if (!utils.checkDatabaseExists()) {
      return res.status(500).json({ 
        error: 'iMessage database not found'
      });
    }
    
    const rows = await db.getMessagesByPhoneNumber(phoneNumber);
    let messages = utils.formatMessages(rows);
    
    // Filter messages by direction if the parameter is specified
    if (direction === 'incoming' || direction === 'outgoing') {
      messages = messages.filter(message => message.direction === direction);
    }
    
    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMessagesByPhone
};