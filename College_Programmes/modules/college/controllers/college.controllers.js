const {
  getCollegeProgramDetailsByRankHelper,
} = require('../helpers/college.helpers');

const { DEFAULT_VALUES } = require('../constants/college.constants');

const getCollegeProgramDetailsByRank = async (req, res) => {
  try {
    const {
      institute = '',
      academicProgramName = '',
      quota = DEFAULT_VALUES.QUOTA,
      seatType = DEFAULT_VALUES.SEAT_TYPE,
      gender = DEFAULT_VALUES.GENDER,
      rank,
    } = req.body;
    const { collegeData } = await getCollegeProgramDetailsByRankHelper({
      institute,
      academicProgramName,
      quota,
      seatType,
      gender,
      rank: Number(rank),
    });
    return res.status(200).send(collegeData); // successResponse
  } catch (error) {
    console.log(error);
    return res.send('Internal Server Error'); // errorResponse
  }
};

module.exports = {
  getCollegeProgramDetailsByRank,
};
