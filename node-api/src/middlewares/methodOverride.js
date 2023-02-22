const methodOverride = require("method-override");

/* Middleware that allows HTTP methods other than GET and POST to be used in HTTP requests. */
export function methodOverrideMdw() {
    return methodOverride();
}