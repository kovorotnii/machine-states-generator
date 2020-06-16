const winston = require('winston');

module.exports = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ],
  format: winston.format.combine(
    winston.format.label({
      label: 'thingsboard-states-generator',
    }),
    winston.format.errors({ stack: true }),
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf((info) => `${info.timestamp} - ${info.label}:[${info.level}]: ${info.message}`),
  ),
});
