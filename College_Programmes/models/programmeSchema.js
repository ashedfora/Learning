const mongoose = require('mongoose');

const { Schema } = mongoose;
const collegeProgrammeSchema = new Schema({
  'Institute Code': String,
  Institute: String,
  'Academic Program Name':String,
  'Branch Code': Number,
  Quota: String,
  'Seat Type':String,
  Gender:String,
  'Opening Rank':Number,
  'Closing Rank':Number,
  Branch:String,
  Degree:String,
  Duration:String,

}, { timestamps: false });

const CollegeProgramme = mongoose.model('collegeProgrammeData', collegeProgrammeSchema);
module.exports = CollegeProgramme;
