const bodyParser = require('body-parser');


/*
* The bodyParser middleware is used in to parse incoming request bodies in a middleware before the handlers.
* - Allows the server to receive data in various formats, such as JSON or URL encoded data, and convert it into
* a usable format in JavaScript. This middleware adds the parsed data to the request object, making it available
* for other middleware and request handlers to use.
*
* */
export const bodyParserMdw = {
    json: bodyParser.json(), // for parsing application/json
    urlencoded: bodyParser.urlencoded({ extended: true }) // for parsing application/x-www-form-urlencoded
};