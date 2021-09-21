const { createLogger, format, transports } = require("winston");

const customFormat = format.combine(
  format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
  format.align(),
  format.printf((i) => `${i.level}: ${[i.timestamp]}: ${i.message}`)
);

const usersLogger = createLogger({
  transports: [
    new transports.File({
      filename: "logs/usersLog.log",
      format: customFormat,
    }),
  ],
});

const authLogger = createLogger({
  transports: [
    new transports.File({
      filename: "logs/authLog.log",
      format: customFormat,
    }),
  ],
});

const appLogger = createLogger({
  transports: [
    new transports.File({
      filename: "logs/appLog.log",
      format: customFormat,
    }),
  ],
});

module.exports = {
  usersLogger: usersLogger,
  authLogger: authLogger,
  appLogger: appLogger,
};
