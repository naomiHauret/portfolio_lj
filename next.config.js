const path = require('path')
const withCSS = require('@zeit/next-css') // enable CSS + PostCSS
const withPurgeCSS = require('next-purgecss') // enable PurgeCSS
const withPlugins = require('next-compose-plugins')
const defaultGetLocalIdent = require('css-loader/lib/getLocalIdent')

const nextConfig = {
  // distDir: 'build',
  target: 'serverless',
  webpack: (config, options) => {
    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,
    ]

    return config
  }
}

module.exports = withPlugins(
  [
    [
      withCSS({
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,

        // Allow the usage of CSS modules without rewriting our vendors classes
        getLocalIdent: (loaderContext, localIdentName, localName, options) => {
          const fileName = path.basename(loaderContext.resourcePath)
          if (fileName.includes('.local.css') === true) {
            return defaultGetLocalIdent(loaderContext, localIdentName, localName, options)
          } else {
            return localName
          }
        }
      }
    }, withPurgeCSS({
    purgeCssPaths: [
      'pages/**/*',
      'components/**/*',
      'translations/**/*',
    ]
  }))],
  ],
  nextConfig
)
