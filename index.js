const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/test', async (req, res) => {
  const upiid = req.query.upiid;
  if (!upiid) return res.status(400).send('UPI ID missing');

  try {
    const response = await fetch(`http://147.93.27.177:3009/verify?query=${encodeURIComponent(upiid)}`);
    const data = await response.text();
    res.send(data);
  } catch (err) {
    res.status(500).send('Error connecting to server');
  }
});

module.exports = app; // <-- Important: Don't use app.listen()
