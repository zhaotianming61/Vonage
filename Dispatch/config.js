require('dotenv').config({
    path: __dirname + '/.env'
  });
  
  var config = {
    API_KEY: process.env.NEXMO_API_KEY || '',
    API_SECRET: process.env.NEXMO_API_SECRET || '', 
    APP_ID: process.env.APP_ID || '', 
    PRIVATE_KEY: process.env.PRIVATE_KEY || '', 
    VIRTUAL_NUMBER: process.env.VIRTUAL_NUMBER || '', 
    To_NUMBER: process.env.To_NUMBER || '', 
    MSG_FROM: process.env.MSG_FROM || '', 
    MSG_TO: process.env.MSG_TO || '', 
  };
  
  module.exports = config;