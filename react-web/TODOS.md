# TODOS

## Lista no numerada para actualizar dependencias, separados según su urgencia:

### Urgente

- core-js: Se debe actualizar a la versión actual debido a que las versiones anteriores tienen problemas de mantenimiento y de compatibilidad web, y la detección de características en versiones antiguas puede ralentizar el rendimiento hasta 100 veces.
- svgo: La versión 1.3.2 ya no está soportada, por lo que se debe actualizar a la versión 2.x.x.
- request: Este paquete ha sido descontinuado, por lo que se deben buscar alternativas y actualizar a una versión más reciente.
- html-webpack-plugin: Esta versión está fuera de soporte y se debe buscar una alternativa más actualizada.

### Importante

* popper.js: La versión 1.16.1 es una versión antigua y se debe actualizar a la versión más reciente de @popperjs/core.
* rollup-plugin-terser: Esta versión ha sido descontinuada y se debe usar @rollup/plugin-terser.
* @surma/rollup-plugin-off-main-thread: Se debe utilizar @jridgewell/sourcemap-codec en lugar de sourcemap-codec.
* w3c-hr-time: Se debe usar el método performance.now() y performance.timeOrigin de la plataforma en lugar de esta librería.
* uuid: Las versiones antiguas de este paquete pueden utilizar Math.random() en ciertas circunstancias, lo que es problemático. Debe actualizarse a la versión 7 o posterior.

### Moderado

* react-popper: Las versiones 0.7.5 o 8.0.0 y posteriores son las recomendadas para su uso.
* browserslist: Las versiones 1.7.7 y 2.11.3 pueden presentar problemas al leer configuraciones de Browserslist mayores a 3.0.
* cssnano: La versión de postcss-svgo puede ser obsoleta, por lo que se debe actualizar a la versión 2.x.x.

### Esperar

* stable: La librería stable está obsoleta, pero como JavaScript moderno ya garantiza que Array#sort() es una ordenación estable, esta librería no es necesaria.



    "react-facebook-login": "^4.0.1",
    //"react-facebook-pixel": "^0.1.1",