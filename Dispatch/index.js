'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/webhooks/inbound', (req, res) => {
  console.log(req.body);
  res.status(200).end();
});

app.post('/webhooks/status', (req, res) => {
  console.log(req.body);
  res.status(200).end();
});

app.listen(3000)