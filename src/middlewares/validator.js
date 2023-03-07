'use strict';

const Ajv = require('ajv');

const { errorResponse } = require('../utils/customResponse');
const { ERRORSCODE } = require('../utils/constants');

const ajv = new Ajv({ strict: false, coerceTypes: true, allErrors: true, useDefaults: true, removeAdditional: true });
require('ajv-formats')(ajv);
require('ajv-keywords')(ajv, ['transform']);
require('ajv-errors')(ajv);

/**
 * Validates the request against a given schema
 * @param {Object} schema The schema to validate
 * @returns {Void} .
 */
const validatorMiddleware = (schema) => {
  /**
   * Custom 'before' middleware, validates the request
   * @param {Object} event The request object
   * @returns {Void} .
   */
  const validatorBefore = async ({ event }) => { /* eslint-disable-line */
    const validate = ajv.compile(schema);
    const isValid = validate(event); // validate() returns a boolean

    if (!isValid) {
      const [lastError] = validate.errors.slice(-1);
      return errorResponse(
        400,
        lastError.message,
        ERRORSCODE.request_missing_field
      );
    }
  };

  return {
    before: validatorBefore
  };
};


module.exports = {
  validatorMiddleware
};
