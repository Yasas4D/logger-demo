const express = require("express");
const feedRouts = require("./routes/feed");
const authRouts = require("./routes/auth");
const app = express();

// Require logger.js
const logger = require("./utils/logger");

// const winston = require('winston');

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

logger.error("Hello, Winston logger, the second error!");
logger.info("Hello, Winston logger, some info!");

app.use("/feed", feedRouts);
app.use("/auth", authRouts);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

app.listen(8080);
