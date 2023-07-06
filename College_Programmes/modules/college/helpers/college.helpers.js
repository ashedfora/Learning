const mongoose = require('mongoose');
const CollegeProgramme = require('../../../models/programmeSchema');

const dbURI = 'mongodb://localhost:27017/TikTalk';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const getCollegeProgramDetailsByRankHelper = async ({
  institute,
  academicProgramName,
  quota,
  seatType,
  gender,
  rank,
}) => {
  rank = Number(rank);
  const arr = await CollegeProgramme.aggregate([
    {
      $match: {
        Institute: { $regex: institute, $options: 'si' },
        'Academic Program Name': { $regex: academicProgramName, $options: 'si' },
        Quota: { $regex: quota, $options: 'si' },
        'Seat Type': { $regex: seatType, $options: 'si' },
        Gender: { $regex: gender, $options: 'si' },
        'Opening Rank': { $lte: rank },
        'Closing Rank': { $gte: rank },
      },
    },
    {
      $group: {
        _id: { Institute: '$Institute' },
        programme: { $push: '$Academic Program Name' },
        'Opening Rank': { $push: '$Opening Rank' },
        'Closing Rank': { $push: '$Closing Rank' },
        bestOpeningRank: { $min: '$Opening Rank' },
        worstClosingRank: { $max: '$Closing Rank' },
      },
    },
  ]);
  return arr;
};
module.exports = {
  getCollegeProgramDetailsByRankHelper,
};
