const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const authenticate = require('./src/middleware/authenticate');
const productRoutes = require('./src/routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 8554;
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(authenticate); 
app.use('/api/v1', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
