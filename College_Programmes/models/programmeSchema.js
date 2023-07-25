const mongoose = require('mongoose');

const { Schema } = mongoose;
const collegeProgrammeSchema = new Schema({
  instituteCode: String,
  institute: String,
  academicProgramName: String,
  branchCode: Number,
  quota: String,
  seatType: String,
  gender: String,
  openingRank: Number,
  closingRank: Number,
  branch: String,
  degree: String,
  duration: String,

}, { timestamps: false });

const CollegeProgramme = mongoose.model('collegeProgrammeData', collegeProgrammeSchema);
module.exports = CollegeProgramme;
