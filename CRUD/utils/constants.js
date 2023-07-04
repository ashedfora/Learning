const Constants = {
  PORT: 3000,

};

const statusCodes = {
  STATUS_CODE_INVALID_PROMPT: 113,
  STATUS_CODE_SUCCESS: 200,
  STATUS_CODE_INVALID_FORMAT: 400,
  STATUS_CODE_UNAUTHORIZED: 401,
  STATUS_CODE_FORBIDDEN: 403,
  STATUS_CODE_DATA_NOT_FOUND: 404,
  STATUS_CODE_FAILURE: 500,
  STATUS_CODE_DATA_SOFT_DELETE: 421,
  STATUS_CODE_VALIDATION_FAILED: 422,
  STATUS_CODE_NOT_ACCEPTABLE: 406,
};
const successResponse = ({
  res,
  message,
  code,
}) => {
  res.status(code).send(message);
};
const errorResponse = ({
  res,
  message,
  code,
}) => {
  res.status(code).send(message);
};
module.exports = {
  Constants,
  statusCodes,
  successResponse,
  errorResponse,
};
