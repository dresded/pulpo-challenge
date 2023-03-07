'use strict';

const contributionsHandler = require('../../../src/handlers/contributions');
const contributionsService = require('../../../src/services/contributions');
const { event, contributionObject } = require('../../sets/contributions.set');

jest.mock('../../../src/services/contributions');


describe('Tests for getContributions handler', () => {
  it('should fetch a contribution list correctly', async () => {
    contributionsService.getContributions.mockImplementationOnce(() => Promise.resolve(contributionObject));
    const res = await contributionsHandler.getContributions(event);
    expect(res).toEqual(event.successResponse);
  });
  it('should throw an error if a service call fails', async () => {
    contributionsService.getContributions.mockImplementationOnce(() => Promise.reject('Error'));
    try {
      await contributionsHandler.getContributions(event);
    } catch (err) {
      expect(err).toEqual('Error');
    }
  });
});
