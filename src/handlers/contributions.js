'use strict';

require('../config/config').loadEnvConfig();
require('../db/parse').initializeParse();

const middy = require('@middy/core');
const jsonBodyParser = require('@middy/http-json-body-parser');

const schemas = require('../utils/validations/schemas');
const contributionsService = require('../services/contributions');
const { successResponse } = require('../utils/customResponse');
const { errorMiddleware, validatorMiddleware } = require('../middlewares');

/**
 * Gets the list of contributions made to a country
 * @param {*} event The req event
 * @return {Array} Information with the data of the contributions or an error
 */
const getContributions = async (event) => {
  const {countryCode} = event.queryStringParameters || '';
  const res = await contributionsService.getContributions(countryCode);
  return successResponse(res);
};

const getContributionsHandler = middy(getContributions)
  .use(errorMiddleware())
  .use(jsonBodyParser())
  .use(validatorMiddleware(schemas.getContributionsSchema));


module.exports = {
  getContributions,
  getContributionsHandler
};
