const fs = require('fs');
const config = require('../config');

const validatePhoneNumber = (phoneNumber) => {
  return phoneNumber.match(/^\+?[0-9]+$/);
};

const checkDatabaseExists = () => {
  return fs.existsSync(config.DB_PATH);
};

const formatMessages = (rows) => {
  return rows.map(row => ({
    id: row.message_id,
    timestamp: row.timestamp,
    date: row.date_formatted,
    text: row.text || null,
    direction: row.is_from_me ? 'outgoing' : 'incoming',
    contact: {
      name: row.display_name || null
    }
  }));
};

module.exports = {
  validatePhoneNumber,
  checkDatabaseExists,
  formatMessages
};