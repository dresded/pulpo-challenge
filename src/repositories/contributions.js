'use strict';
const Parse = require('parse/node');
const axios = require('axios');
const { createErrorObject } = require('../utils/customResponse');
const { ERRORSCODE } = require('../utils/constants');

/**
 * Get a list of years to search for information
 * @param {Number} currentYear Current year from which the list of years will be obtained
 * @returns {Array} Array with the five years before the current year
 */
const yearsToConsult = async (currentYear) => {
  const numberOfYearsToSearch = 5;
  const yearList = [];
  for (let i = 0; i < numberOfYearsToSearch; i++) {
    yearList.push(currentYear - i);
  }
  return yearList;
};

/**
 * Obtains contributions by country code and list of years
 * @param {String} countryCode Country code to search in the database
 * @param {Array} yearList Year list to search in the database
 * @returns {Object} List of contributions saved in the BD
 */
const getContributionsInDB = async (countryCode, yearList) => {
  const Contributions = Parse.Object.extend('Contributions');
  const query = new Parse.Query(Contributions);
  query.equalTo('countryCode', countryCode);
  query.containedIn('year', yearList);
  const found = await query.find();

  return found.map(item => item.toJSON());
};

/**
 * Get, save or update the information in the database if it does not exist in the database
 * @param {Array} savedContributions Contributions made to a country saved in the database
 * @param {Array} yearList List of years to obtain information
 * @param {Number} currentYear Current year to update or save information 
 * @param {String} countryCode Country code to search in the database
 * @returns {Array} List of contributions
 */
const getContributionsByYear = async (savedContributions, yearList, currentYear, countryCode) => {
  const contributionList = {};

  for (let i = 0; i < yearList.length; i++) {
    const year = yearList[i];
    const yearInfo = savedContributions.find(e => e.year === year);
    let contributionInfo = null;

    if (year === currentYear) {
      contributionInfo = await updateOrInsertCurrentYear(yearInfo, countryCode, year);
    } else if (yearInfo) {
        contributionInfo = yearInfo;
    } else {
      const iatiInfo = await getIatiInfo(countryCode, year);
      contributionInfo = await saveContribution(iatiInfo, countryCode, year);
    }
    contributionList[year] = contributionInfo.contributions;
  };

  return contributionList;
};

/**
 * Check the IATI API to obtain the contributions made to a country
 * @param {String} countryCode Country code to search in the database
 * @param {Number} year Year code to search in the database
 * @returns {Array} Information returned by the IATI API ordered by the amount of contribution
 */
const getIatiInfo = async (countryCode, year) => {
  const iatiUrl = process.env.IATI_URL
    .replaceAll('[country_code]', countryCode)
    .replaceAll('[year]', year);

  const {data} = await axios.get(iatiUrl);
  const info = [];
  if (data.response.docs.length === 0) {
    throw createErrorObject(404, 'Data not found for the country code', ERRORSCODE.not_found);
  }
  const iatiInfoByYear = data.response.docs.reduce((accumulator, currentValue) => {
    const transactionValueUsdSum = currentValue.transaction_value_usd_sum;
      if (transactionValueUsdSum) {
        const objectToSave = {
        titleNarrative: currentValue.title_narrative[0],
        transactionValueUsdSum: Math.round(transactionValueUsdSum)
      };
      info.push(objectToSave);
    }
    return info;
  });

  const orderedInfo = orderContributions(iatiInfoByYear);
  return orderedInfo;
};

/**
 * Order the data for the amount of contribution
* @param {Array} iatiInfo List with the data to be ordered
 * @returns {Array} List with ordered data
 */
const orderContributions = (iatiInfo) => {
  return iatiInfo.sort((a,b) => {
    if (a.transactionValueUsdSum < b.transactionValueUsdSum) {
      return 1;
    }
    if (a.transactionValueUsdSum > b.transactionValueUsdSum) {
      return -1;
    }
    return 0;
  });
};

/**
 * Update or save the data of the current year
 * @param {Array} yearInfo Contributions info made to a country in the current year
 * @param {String} countryCode Country code to search in the database
 * @param {Number} year Year corresponding to contributions
 * @returns {Array} List of contributions
 */
const updateOrInsertCurrentYear = async(yearInfo, countryCode, year) => {
  const iatiInfo = await getIatiInfo(countryCode, year);
  let contributionInfo = null;
  if (yearInfo) {
    contributionInfo = await updateContribution(yearInfo, iatiInfo);
  } else {
    contributionInfo = await saveContribution(iatiInfo, countryCode, year);
  }
  return contributionInfo;
};

/**
 * Save information in the database made to a country in a certain year
 * @param {Array} contributionData Information with contributions made
 * @param {String} countryCode Country code to search in the database
 * @param {Number} year Year corresponding to contributions
 * @returns {Array} List of contributions
 */
const saveContribution = async(contributionData, countryCode, year) => {
  const Contributions = Parse.Object.extend('Contributions');
  const newContribution = new Contributions();
  const contributionObject = {
    countryCode,
    year,
    contributions: contributionData
  };
  newContribution.set(contributionObject);

  const evaluationCreated = await newContribution.save({ useMasterKey: true });
  return evaluationCreated.toJSON();
};

/**
 * Update the information of the contributions made in the current year
 * @param {Array} yearInfo Information with contributions made in DB
 * @param {Array} iatiInfo Information with the new contributions made
 * @param {Number} year Year corresponding to contributions
 * @returns {Array} List of contributions
 */
const updateContribution = async(yearInfo, iatiInfo) => {
  const Contributions = Parse.Object.extend('Contributions');
  const query = new Parse.Query(Contributions);
  query.equalTo('objectId', yearInfo.objectId);

  const contribution = await query.first({useMasterKey: true});

  contribution.set('contributions', iatiInfo);
  const evaluationUpdated = await contribution.save(null, {useMasterKey: true});
  return evaluationUpdated.toJSON();
};

module.exports = {
  getContributionsInDB,
  yearsToConsult,
  getContributionsByYear
};
