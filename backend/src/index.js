const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes');

const app = express();

mongoose.connect(process.env.MONGODB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
});

app.use(cors();
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);

