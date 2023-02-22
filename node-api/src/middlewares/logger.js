const morgan = require("morgan");

/*
* Morgan - Request logger middleware
*
* It logs details of incoming requests, such as request method, URL, status code, response time, and more,
* to the console or a file. This helps in debugging, analyzing and monitoring server requests and responses.
*
* */
export const morganHttpLoggerMdw = morgan("dev");