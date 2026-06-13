// server/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// require('dotenv').config();

const app = express();

app.use(cors({
  origin: '*'
  //methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));          // lets React talk to this server
app.use(express.json());   // lets us read JSON from requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log(err));

// Use our habit routes
app.use('/api/habits', require('./routes/habits'));

app.listen(4000, () => console.log('Server running on port 4000'));