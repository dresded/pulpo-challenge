'use strict';

module.exports.ERRORSCODE = {
  request_missing_field: {
    CODE: 'client_error_1',
    TYPE: 'BAD_REQUEST',
    DETAIL: 'Invalid fields in the request.'
  },
  not_found: {
    CODE: 'resource_error',
    type: 'NOT_FOUND',
    DETAIL: 'Resource not found'
  },
  server_error: {
    CODE: 'server_error',
    type: 'SERVER_ERROR',
    DETAIL: 'An internal server error ocurred'
  },
  parse_error: {
    CODE: 'client_error_3',
    TYPE: 'BAD_REQUEST',
    DETAIL: 'There is something wrong with the parameters provided'
  }
};
