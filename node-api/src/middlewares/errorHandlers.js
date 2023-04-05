/* logErrorsMdw function is an error-handling middleware function that logs any errors that occur in a request
to the server.
- It takes four parameters - err, req, res, and next - and simply calls next(err), which passes the error to the next
middleware function in the chain. The purpose of this function is to provide a simple way to log errors in the server,
allowing developers to quickly diagnose and fix issues.
 * */
import {errorResponse} from "../utils/index.js";

export function logErrorsMdw(err, req, res, next) {
  console.error(err);
  next(err);
}

/*
 * clientErrorHandlerMdw that is used to handle errors that occur in the client-side requests.
 * - If the request is an XMLHttpRequest (Ajax) request, it sends a JSON response with a 500 status code and an
 * error message.
 * - If the request is not an XMLHttpRequest, the error is passed to the next middleware in the chain for further
 * processing.
 * */
export function clientErrorHandlerMdw(err, req, res, next) {
  if (req.xhr) {
    res
      .status(500)
      .json(errorResponse("Something went wrong! Please try again later."));
  } else {
    next(err);
  }
}

/*
errorHandlerMdw is an error handling middleware that logs the error to the console and sends a response with a 500
status code and an error message in the response body. It is designed to be the last error handling middleware in the
middleware chain, so if none of the previous error handling middleware catch the error, this one will.
* */
export function errorHandlerMdw(err, req, res, next) {
  console.log(err);
  errorResponse(err.message);
}


