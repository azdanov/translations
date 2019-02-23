/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-nocheck
// @ts-ignore
const proxy = require('http-proxy-middleware')

module.exports = function config(app) {
  app.use(
    proxy('/.netlify/functions/', {
      target: 'http://localhost:9000/',
      pathRewrite: {
        '^/\\.netlify/functions': '',
      },
    }),
  )
}
