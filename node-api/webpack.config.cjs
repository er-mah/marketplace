/**
 * Esto dice a Webpack que utilice babel-loader para transpilar todos
 * los archivos .js y .mjs (archivos de módulo) en tu proyecto.
 */
module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
