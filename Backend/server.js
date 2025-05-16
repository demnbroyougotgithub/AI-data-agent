const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const db = require('./DB');
const geminiAgent = require('./Agent/geminiAgent'); 
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/ask', async (req, res) => {
  const { question } = req.body;
  const response = await geminiAgent(question, db);
  res.json(response);
});

app.listen(5000, () => {
  console.log('Backend is running on http://localhost:5000');
});
