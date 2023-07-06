// const CollegeProgramme = require('../../../models/programmeSchema');

const validateCollegeProgramDetailsParams = async (req, res, next) => {
  try {
    const {
      rank,
    } = req.body;
    if (!Number.isInteger(Number(rank))) {
      throw new Error('Invalid Rank');
    }
    return next();
  } catch (error) {
    return res.send('Internal Server Error');
  }
};

module.exports = {
  validateCollegeProgramDetailsParams,
};
