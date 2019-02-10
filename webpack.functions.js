/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */
const Dotenv = require('dotenv-webpack')

const config =
  process.env.LAMBDA_TRANSLATION_API === 'http://localhost:3030'
    ? { path: './.env.test' }
    : { path: './.env' }

// @see https://github.com/netlify/netlify-lambda#webpack-configuration
module.exports = {
  plugins: [new Dotenv(config)],
}
