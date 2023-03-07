'use strict';

const Parse = require('parse/node');

/**
 * Initialize parse
 * @returns {void}
 */
const initializeParse = () => {
    Parse.serverURL = process.env.PARSE_URL;
    Parse.initialize(
        process.env.APP_ID,
        process.env.JAVASCRIPT_KEY,
        process.env.MASTER_KEY
    );
};

module.exports = {
    initializeParse
};
