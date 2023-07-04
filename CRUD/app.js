const express = require('express');
const routes = require('./routes');
const { Constants } = require('./utils/constants');

const { mongooseConnect } = require('./config');

const app = express();

app.use(express.urlencoded({ extended: true }));

// User Routes
app.use('/', routes);
app.use('/*', (req, res) => res.send('Request Not Valid'));
app.listen(Constants.PORT, mongooseConnect);
