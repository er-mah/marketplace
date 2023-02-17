/*
 * Esta función recibe como parámetros un error (err), la solicitud (req), la respuesta (res) y la función next.
 * La función simplemente llama a next(err) para pasar el control al siguiente middleware. Se utiliza para registrar
 * el error en los registros de la aplicación.
 *
 * Esta función se utiliza para registrar errores en la consola. Es el primer middleware que se ejecuta
 * cuando se produce un error. Su propósito es simplemente registrar el error en la consola y luego pasar el
 * control al siguiente middleware. Esta función es útil para depurar la aplicación y para registrar errores que no
 * se han manejado en otros middleware.
 *
 * */
export function logErrors(err, req, res, next) {
    next(err);
}

/*
 * Esta función recibe como parámetros un error (err), la solicitud (req), la respuesta (res) y la función next.
 * La función verifica si la solicitud es una solicitud XMLHttpRequest (XHR) y, si es así, envía una respuesta de error
 * en formato JSON. Si no es una solicitud XHR, llama a next(err) para pasar el control al siguiente middleware.
 *
 * Esta función se utiliza para manejar errores que se producen cuando se realizan solicitudes a través de
 * XMLHttpRequest (XHR). En lugar de mostrar una página de error completa, esta función devuelve una respuesta
 * JSON que indica que algo ha fallado y que se debe intentar de nuevo más tarde. Esta función es útil cuando se
 * construyen aplicaciones web de una sola página (SPA) que utilizan XHR para realizar solicitudes.
 * */
export function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res
            .status(500)
            .send({ error: "Something went wrong! Please try again later." });
    } else {
        next(err);
    }
}
/*
* Esta función recibe como parámetros un error (err), la solicitud (req), la respuesta (res) y la función next.
* La función envía una respuesta de error con un código de estado HTTP 500 y un mensaje de error en formato JSON.
*
* Esta función se utiliza para manejar errores que no se han manejado en otros middleware. Si se produce un error en
* algún lugar de la aplicación y no se ha manejado en otros middleware, esta función se encarga de devolver una
* respuesta de error adecuada al cliente. En este caso, la función devuelve una respuesta JSON que contiene un
* mensaje de error y un código de estado HTTP 500 (Error interno del servidor).
* */
export function errorHandler(err, req, res, next) {
    console.log(err);
    res.status(500).send({ message: err.message });
}