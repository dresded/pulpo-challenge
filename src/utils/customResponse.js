'use strict';

/** @typedef {object} errorObject
 * @property {string} CODE
 * @property {string} TYPE
 * @property {string} DETAIL
 */

const headers = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': false,
  'Access-Control-Allow-Methods': '*'
};

/**
 * errorBodyResponse returns an object understood by AWS as an error response
 * @param {String} type error type
 * @param {Number} status error http code
 * @param {String} code error code
 * @param {String} detail error detail
 * @param {String} message error message
 * @returns {Object} object describing http response 
 */
const errorBodyResponse = (type, status, code, detail, message) => {
  const body = JSON.stringify({
    type,
    status,
    code,
    detail,
    message
  });

  return {
    headers,
    statusCode: status,
    body
  };
};

/**
 * errorResponse abstracts errorBodyResponse's functionality in a simple interface
 * @param {Number} statusCode http response code
 * @param {String} message custom error message
 * @param {errorObject} errorObj object matching the enum format we have for errors
 * @returns {Object} as returned by errorBodyResponse
 */
const errorResponse = (statusCode, message, errorObj) => {
  return errorBodyResponse(
    errorObj.TYPE,
    statusCode,
    errorObj.CODE,
    errorObj.DETAIL,
    message
  );
};

/**
 * successResponse prepares the response in case everything worked perfectly
 * @param {String|Object} message is either a json with requested details or a success message
 * @returns {Object} valid request response object
 */
const successResponse = message => {
  const msg = typeof message !== 'string' ? JSON.stringify(message) : message;
  return {
    headers,
    statusCode: 200,
    body: msg
  };
};

/**
 * Create a custom error object for the error handler
 * @param {Number} status The http status of the error
 * @param {String} message The message of the error
 * @param {Object} info More info of the error
 * @param {String} stack stack trace of the error
 * @returns {Object} Object with information about the error
 */
const createErrorObject = (status, message, info, stack) => {
  return {
    type: 'internal',
    status,
    message,
    info,
    stack
  };
};

module.exports = {
  errorResponse,
  successResponse,
  createErrorObject
};
