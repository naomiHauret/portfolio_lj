const path = require("path")
const withCSS = require("@zeit/next-css") // enable CSS + PostCSS
const withPurgeCSS = require("next-purgecss") // enable PurgeCSS
const withPlugins = require("next-compose-plugins")
const defaultGetLocalIdent = require("css-loader/lib/getLocalIdent")

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:/]+/g) || []
  }
}

const nextConfig = {
  target: "serverless",
  webpack: (config, options) => {
    config.plugins = config.plugins || []

    config.plugins = [...config.plugins]

    return config
  },
}

module.exports = withPlugins(
  [
    [
      withCSS(
        withPurgeCSS({
          purgeCss: {
            purgeCssPaths: ["pages/**/*", "components/**/*"],
            extractors: [
              {
                extractor: TailwindExtractor,
                extensions: ["js", "local.css", "css"],
              },
            ],
          },
          cssModules: true,
          cssLoaderOptions: {
            importLoaders: 1,

            // Allow the usage of CSS modules without rewriting our vendors classes
            getLocalIdent: (loaderContext, localIdentName, localName, options) => {
              const fileName = path.basename(loaderContext.resourcePath)
              if (fileName.includes(".local.css") === true) {
                return defaultGetLocalIdent(loaderContext, localIdentName, localName, options)
              } else {
                return localName
              }
            },
          },
        }),
      ),
    ],
  ],
  nextConfig,
)
