const path = require('path');

module.exports = {
  PORT: process.env.PORT || 3000,
  DB_PATH: process.env.DB_PATH || path.join(process.env.HOME, '/Library/Messages/chat.db')
};