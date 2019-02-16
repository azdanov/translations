/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires,global-require */
const PurgecssPlugin = require('purgecss-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const glob = require('glob-all')
const path = require('path')

module.exports = {
  babel: {
    plugins: ['lodash'],
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const prodPlugins = [
        // Enable/Disable before npm build
        // new (require('webpack-bundle-analyzer')).BundleAnalyzerPlugin(),
        new LodashModuleReplacementPlugin(),
        new PurgecssPlugin({
          paths: [
            paths.appHtml,
            ...glob.sync(`${paths.appSrc}/**/*.{js,jsx,mjs,ts,tsx}`),
          ],
          keyframes: true,
          fontFace: true,
          whitelist: ['active'],
        }),
        new PrerenderSPAPlugin({
          routes: ['/'],
          staticDir: path.join(__dirname, 'build'),
        }),
      ]

      if (env === 'production') {
        webpackConfig.plugins = webpackConfig.plugins.concat(prodPlugins)
      }

      return webpackConfig
    },
  },
}
