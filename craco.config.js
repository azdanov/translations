/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const path = require('path')

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const prodPlugins = [
        new PurgecssPlugin({
          paths: [
            paths.appHtml,
            ...glob.sync(`${paths.appSrc}/**/*.{js,jsx,mjs,ts,tsx}`),
          ],
          keyframes: true,
          fontFace: true,
          whitelist: [
            'active',
            'aligned',
            'attached',
            'basic',
            'bottom',
            'bulleted',
            'button',
            'center',
            'centered',
            'circular',
            'column',
            'computer',
            'container',
            'content',
            'copyright',
            'divider',
            'dropdown',
            'eight',
            'exchange',
            'fitted',
            'fluid',
            'footer',
            'fourteen',
            'grid',
            'header',
            'hero',
            'hidden',
            'icon',
            'image',
            'img',
            'input',
            'item',
            'label',
            'labeled',
            'large',
            'left',
            'line',
            'link',
            'list',
            'loader',
            'long',
            'medium',
            'menu',
            'mobile',
            'nine',
            'outline',
            'paragraph',
            'placeholder',
            'pointing',
            'relaxed',
            'right',
            'row',
            'search',
            'secondary',
            'segment',
            'short',
            'sub',
            'tablet',
            'tertiary',
            'text',
            'toast',
            'top',
            'ui',
            'vertically',
            'very',
            'wide',
          ],
        }),
        new PrerenderSPAPlugin({
          routes: ['/'],
          staticDir: path.join(__dirname, 'build'),
        }),
        new HtmlCriticalWebpackPlugin({
          base: path.resolve(__dirname, 'build'),
          src: 'index.html',
          dest: 'index.html',
          inline: true,
          minify: true,
          extract: true,
          width: 1300,
          height: 900,
          penthouse: {
            blockJSRequests: false,
          },
        }),
      ]

      if (env === 'production') {
        webpackConfig.plugins = webpackConfig.plugins.concat(prodPlugins)
      }

      return webpackConfig
    },
  },
}
