'use strict';


// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/money-dev'
  },

  seedDB: true,

  // Access Token options
  accessToken: {
    expiresInMinutes: 1 // 1 minutes
  }
};
