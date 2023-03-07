'use strict';

const defaultString = {
  type: 'string',
  transform: ['trim'],
  minLength: 2,
  errorMessage: '${0#} property is not valid, must be string'
};

const getContributionsSchema = {
  type: 'object',
  properties: {
    queryStringParameters: {
      type: ['object', 'null'],
      properties: {
        countryCode: defaultString
      }
    }
  }
};

module.exports = {
  getContributionsSchema
};
