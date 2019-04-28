const app = require("express")()
const Prismic = require("prismic-javascript")
const sm = require('sitemap')
const locales = ['fr', 'en']

const initApi = (req) => {
  return Prismic.getApi('https://foliolucasjouin.cdn.prismic.io/api/v2', {
    req: req
  })
}

const createSitemap = (res) => {
  let urlRoutes = []

  let sitemap = sm.createSitemap({
    hostname: 'https://lucasjouin.com',
    cacheTime: 60
  })

  initApi(req = null).then((api) => {
    api.query('').then((response) => {

      const docs = response.results
      docs.forEach(doc => {
        locales.forEach(locale => {
          if (doc.type === 'project-page') {
            urlRoutes.push(`/${locale}/work/${doc.uid}`)
          } else if (doc.type === 'home-page') {
            urlRoutes.push(`/${locale}`)
          }
          else {
            urlRoutes.push(`/${locale}/${doc.uid}`)
          }
        })
      })
      urlRoutes.map((item) => {
        sitemap.add({
          url: item,
          changefreq: 'daily',
          priority: 1
        })
      })
      res.send(sitemap.toString())
    })
  })
}



// For ANY (*) GET,
// Now does ROUTING, Express does HANDLING
app.get('*', (req, res) => {
  res.header('Content-Type', 'application/xml');
  createSitemap(res)
})

// Export your app
module.exports = app
