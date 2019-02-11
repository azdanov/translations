/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */
const Dotenv = require('dotenv-webpack')

const config =
  process.env.NODE_ENV === 'test' ? { path: './.env.test' } : { path: './.env' }

// @see https://github.com/netlify/netlify-lambda#webpack-configuration
module.exports = {
  plugins: [new Dotenv(config)],
}
