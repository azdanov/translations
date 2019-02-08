/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */
const Dotenv = require('dotenv-webpack')

// @see https://github.com/netlify/netlify-lambda#webpack-configuration
module.exports = {
  plugins: [new Dotenv()],
}
