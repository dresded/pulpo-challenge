'use strict';
const { errorResponse } = require('../utils/customResponse');
const { ERRORSCODE } = require('../utils/constants');

/**
 * Custom error handler middleware
 * @returns {Object} Custom onError middleware
 */
const errorMiddleware = () => {
  /**
   * An error handler middleware for middy
   * @param {Object} obj.error The error thrown
   * @returns {Object} Object with the corresponding error
   */
  const handlerOnError = async ({ error }) => {
    console.log('API pulpo-challenge error: ', error);
    if (error.type === 'internal') { // Errors thrown manually
      return errorResponse(
        error.status,
        error.message,
        error.info
      );
    }
    if (error.code) {
      return errorResponse(
        400,
        error.message,
        ERRORSCODE.parse_error
      );
    }
    return errorResponse(
      500,
      'Internal Server Errors',
      ERRORSCODE.server_error
    );
  };

  return {
    onError: handlerOnError
  };
};

module.exports = {
  errorMiddleware
};
