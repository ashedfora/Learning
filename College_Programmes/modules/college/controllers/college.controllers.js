const {
  getCollegeProgramDetailsByRankHelper,
} = require('../helpers/college.helpers');

const [
  DEFAULT_INSTITUTE,
  DEFAULT_ACADEMIC_PROGRAM_NAME,
  DEFAULT_QUOTA,
  DEFAULT_SEAT_TYPE,
  DEFAULT_GENDER,
] = [
  '',
  '',
  'AI',
  'OPEN',
  'Gender-Neutral',
];
const getCollegeProgramDetailsByRank = async (req, res) => {
  try {
    const {
      Institute: institute = DEFAULT_INSTITUTE,
      'Academic Program Name': academicProgramName = DEFAULT_ACADEMIC_PROGRAM_NAME,
      Quota: quota = DEFAULT_QUOTA,
      'Seat Type': seatType = DEFAULT_SEAT_TYPE,
      Gender: gender = DEFAULT_GENDER,
      rank,
    } = req.body;
    const params = {
      institute,
      academicProgramName,
      quota,
      seatType,
      gender,
      rank,
    };
    console.log(academicProgramName);
    res.status(200).send(await getCollegeProgramDetailsByRankHelper(params));
    return 1;
  } catch (error) {
    return new Error('Internal Server Error');
  }
};

module.exports = {
  getCollegeProgramDetailsByRank,
};
