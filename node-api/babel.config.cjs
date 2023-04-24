/**
 * Esto configura Babel con el preset @babel/preset-env para transpilar el
 * código a la versión de ECMAScript que el proyecto tenga como destino,
 * y el plugin @babel/plugin-syntax-dynamic-import para permitir el uso de
 * la sintaxis de importación dinámica.
 */
require('dotenv').config();



module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: ["@babel/plugin-syntax-dynamic-import"],
};
