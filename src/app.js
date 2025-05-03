const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'iMessage API Server Running' });
});

app.use('/api', routes);

app.use(errorHandler);

module.exports = app;