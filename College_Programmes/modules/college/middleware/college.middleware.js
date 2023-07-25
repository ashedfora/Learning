// const CollegeProgramme = require('../../../models/programmeSchema');

const validateCollegeProgramDetailsParams = async (req, res, next) => {
  try {
    const {
      rank,
    } = req.body;
    if (!Number.isInteger(rank)) {
      throw new Error('Invalid Rank');
    }
    return next();
  } catch (error) {
    console.log(error);
    return res.send('Internal Server Error'); // errorResponse
  }
};

module.exports = {
  validateCollegeProgramDetailsParams,
};
