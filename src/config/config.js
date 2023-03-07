'use strict';

/** 
 * Loads environment configuration
 * @return {void} 
 */
const loadEnvConfig = () => {
    if (!process.env.ENVIRONMENT || process.env.ENVIRONMENT === '') {
        require('dotenv').config();
    }
};

module.exports = { loadEnvConfig };

