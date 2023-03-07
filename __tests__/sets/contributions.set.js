'use strict';

const { successResponse } = require('../../src/utils/customResponse');

const contributionObject = {
  2023: [
    {
      titleNarrative: 'Organitation Test',
      transactionValueUsdSum: 1313
    }
  ],
  2022: [
    {
      titleNarrative: 'Organitation Test two',
      transactionValueUsdSum: 1300
    }
  ]
};

const event = {
  pathParameters: {
    countryCode: 'SD'
  },
  successResponse: successResponse(contributionObject)
};

const repositoryTestsTable = [
  {
      notFoundError: {
          'body': '{"type":"PARSE_error","status":404,"code":"not found","detail":"Data not found for the country code","message":"Data not found for the country code"}',
          'headers': {
              'Access-Control-Allow-Credentials': false,
              'Access-Control-Allow-Headers': '*',
              'Access-Control-Allow-Methods': '*',
              'Access-Control-Allow-Origin': '*'
          },
          'statusCode': 404
      }
  }
];

const handlerGetContributionTests =
  {
      queryStringParameters: {
        countryCode: 'SD'
      }
  };



module.exports = {
  contributionObject,
  event,
  repositoryTestsTable,
  handlerGetContributionTests
};
