const Dotenv = require("dotenv-webpack");

module.exports = {
  resolve: {
    fallback: {
      crypto: false,
      stream: false,
      os: false,
    },
  },
  plugins: [new Dotenv()],
};
