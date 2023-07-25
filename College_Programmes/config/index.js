const mongoose = require('mongoose');
// dotenv -> access .env file
const dbURI = 'mongodb://localhost:27017/College';
const mongooseConnect = () => {
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = {
  mongooseConnect,
};
