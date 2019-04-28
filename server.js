const express = require("express")
const dev = process.env.NODE_ENV !== "production"
const next = require("next")
const app = next({ dev })
const handle = app.getRequestHandler()
const Prismic = require("prismic-javascript")

app
  .prepare()
  .then(() => {
    const server = express()

    server.get("/", (req, res) => {
      const nextJsPage = "/index"
      const queryParams = { lang: "en" }
      app.render(req, res, nextJsPage, queryParams)
    })

    server.get("/:lang", (req, res) => {
      const nextJsPage = "/index"
      const queryParams = { lang: req.params.lang }
      app.render(req, res, nextJsPage, queryParams)
    })

    server.get("/:lang/about", (req, res) => {
      const nextJsPage = "/about"
      const queryParams = { lang: req.params.lang }
      app.render(req, res, nextJsPage, queryParams)
    })

    server.get("/:lang/work/:slug", (req, res) => {
      const nextJsPage = "/work"
      const queryParams = { slug: req.params.slug, lang: req.params.lang }
      app.render(req, res, nextJsPage, queryParams)
    })

    server.get("/about", (req, res) => {
      res.redirect(301, "/en/about")
    })

    server.get("/work", (req, res) => {
      res.redirect(301, "/en")
    })

    server.get("/work/:slug", (req, res) => {
      const queryParams = { slug: req.params.slug }

      res.redirect(301, "/en/work")
    })

    server.get("*", (req, res) => handle(req, res))

    server.listen(3000, (err) => {
      if (err) throw err
      console.log("> Ready http://localhost:3000 <")
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
