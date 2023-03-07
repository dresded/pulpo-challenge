'use strict';

const mockParse = require('../../mocks/parse');
const contributionsRepository = require('../../../src/repositories/contributions');
const { event, contributionObject, repositoryTestsTable, handlerGetContributionTests } = require('../../sets/contributions.set');

jest.mock('parse/node', () => mockParse);

describe('Tests for getContributions repository', () => {
  const { pathParameters: { objectId } } = event;
  it('should return an object with a contribution list correctly', async () => {
    /* eslint-disable require-jsdoc */
    mockParse.mockQueryStaticProperty('or', () => {
      return {
        find() {
          return {
            toJSON() {
              return {contributionObject};
            }
          };
        }
      };
    });
    const res = await contributionsRepository.getContributionsInDB(objectId);
    expect(res).not.toBeNull();
  });

  it('should throw an error if the id is not valid', async () => {
    const testsValues = repositoryTestsTable[0];
    mockParse.resetQueryProperty(contributionObject);
    try {
        await contributionsRepository.getContributionsInDB(handlerGetContributionTests.queryStringParameters);
    } catch (e) {
        expect(e).toStrictEqual(testsValues.notFoundError);
    }
  });
});
