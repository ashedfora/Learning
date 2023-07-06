const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/TikTalk';
const mongooseConnect = () => {
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = {
  mongooseConnect,
};
