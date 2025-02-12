const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/foodInventory');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const foodRoutes = require('./routes/foodsRoutes');
app.use('/api/foods', foodRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
