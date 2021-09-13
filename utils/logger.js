const { createLogger, format, transports } = require("winston");

module.exports = createLogger({
  format: format.combine(
    format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
    format.align(),
    format.printf((i) => `${i.level}: ${[i.timestamp]}: ${i.message}`)
  ),
  transports: [
    new transports.File({
      filename: "logs/info.log",
      level: "info",
      format: format.combine(
        format.printf((i) =>
          i.level === "info" ? `${i.level}: ${i.timestamp} ${i.message}` : ""
        )
      ),
    }),
    new transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
});

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   defaultMeta: { service: 'user-service' },
//   transports: [
//     //
//     // - Write all logs with level `error` and below to `error.log`
//     // - Write all logs with level `info` and below to `combined.log`
//     //
//     new winston.transports.File({ filename: 'error.log', level: 'error' }),
//     new winston.transports.File({ filename: 'combined.log' }),
//   ],
//   format: winston.format.combine(
//     winston.format.label({
//         label: `Label🏷️`
//     }),
//     winston.format.timestamp({
//        format: 'MMM-DD-YYYY HH:mm:ss'
//    }),
//     winston.format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
// )
// });
