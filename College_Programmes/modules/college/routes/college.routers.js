const {
  getCollegeProgramDetailsByRank,
} = require('../controllers/college.controllers');

const {
  validateCollegeProgramDetailsParams,
} = require('../middleware/college.middleware');

const basePath = '/college';

module.exports = (router) => {
  router.post(`${basePath}`, validateCollegeProgramDetailsParams, getCollegeProgramDetailsByRank);
};
