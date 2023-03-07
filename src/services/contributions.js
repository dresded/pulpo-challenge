'use strict';

const moment = require('moment');
const { 
  getContributionsInDB,
  yearsToConsult,
  getContributionsByYear
} = require('../repositories/contributions');

/**
 * Obtain the contributions saved in the database or obtain and save the information of a new country
 * @param {String} countryCode Country code to search
 * @returns {Object} Object with the information of the contributions made to a country
 */
const  getContributions = async (countryCode = 'SD') => {
  const currentYear = moment().year();
  const yearList = await yearsToConsult(currentYear);
  const savedContributions = await getContributionsInDB(countryCode, yearList);
  const contributionsByYear = await getContributionsByYear(savedContributions, yearList, currentYear, countryCode);

  return contributionsByYear;
};


module.exports = {
  getContributions
};
