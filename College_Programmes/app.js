const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const { mongooseConnect } = require('./config');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// use body-parser, helmet, cors

// User Routes
app.use('/', routes);
app.use('/*', (req, res) => res.send('Request Not Valid'));
app.listen(3000, mongooseConnect);
