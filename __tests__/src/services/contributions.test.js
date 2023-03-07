'use strict';

const contributionsService = require('../../../src/services/contributions');
const contributionsRepository = require('../../../src/repositories/contributions');
const { evaluationObject } = require('../../sets/contributions.set');

jest.mock('../../../src/repositories/contributions');

describe('Tests for getContributions service function', () => {
  it('should return an object with a contribution list correctly', async () => {
    contributionsRepository.getContributionsInDB.mockImplementationOnce(() => Promise.resolve(evaluationObject));
    const res = await contributionsService.getContributions();
    expect(res).toEqual(evaluationObject);
  });
  it('should return an error if the repository call fails', async () => {
    contributionsRepository.getContributionsInDB.mockImplementationOnce(() => Promise.reject('Mock error'));
    try {
      await await contributionsService.getContributions();
    } catch (err) {
      expect(err).toEqual('Mock error');
    }
  });
});

