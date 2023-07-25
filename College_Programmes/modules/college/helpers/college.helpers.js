const CollegeProgramme = require('../../../models/programmeSchema');

const getCollegeProgramDetailsByRankHelper = async ({
  institute,
  academicProgramName,
  quota,
  seatType,
  gender,
  rank,
}) => {
  const matchStage = {
    $match: {
      institute: { $regex: institute, $options: 'i' },
      academicProgramName: { $regex: academicProgramName, $options: 'i' },
      quota,
      seatType,
      gender,
      openingRank: { $lte: rank },
      closingRank: { $gte: rank },
    },
  };
  const sortStage = {
    $sort: {
      openingRank: 1,
    },
  };
  const groupStage = {
    $group: {
      _id: { Institute: '$institute' },
      programme: { $push: '$academicProgramName' },
      openingRank: { $push: '$openingRank' },
      closingRank: { $push: '$closingRank' },
      bestOpeningRank: { $min: '$openingRank' },
      worstClosingRank: { $max: '$closingRank' },
    },
  };
  // cnst { matchStage, sortStage, gr }
  const collegeData = await CollegeProgramme.aggregate([
    matchStage,
    sortStage,
    groupStage,
  ]);
  return { collegeData };
};

module.exports = {
  getCollegeProgramDetailsByRankHelper,
};
