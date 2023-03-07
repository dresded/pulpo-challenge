'use strict';

const { validatorMiddleware } = require('./validator');
const { errorMiddleware } = require('./error');

module.exports = {
  validatorMiddleware,
  errorMiddleware
};
