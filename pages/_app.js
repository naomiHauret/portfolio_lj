import React from "react"
import Head from "next/head"
import Router from "next/router"
import App, { Container } from "next/app"
import { trackPageView } from "utils/analytics"
import SEO_TAGS from "utils/seo-parameters"
import "styles/index.css"

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  componentDidMount() {
    Router.onRouteChangeComplete = (url) => {
      trackPageView(url)
    }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Head>
          <title key="title">{SEO_TAGS.title}</title>
          <meta key="description" name="description" content={SEO_TAGS.description} />
          <meta key="twitter:card" name="twitter:card" content={SEO_TAGS.twitter.cardType} />
          <meta key="twitter:site" name="twitter:site" content={SEO_TAGS.twitter.handle} />
          <meta key="og:url" property="og:url" content={SEO_TAGS.openGraph.url} />
          <meta key="og:type" property="og:type" content={SEO_TAGS.openGraph.type} />
          <meta key="og:title" property="og:title" content={SEO_TAGS.openGraph.title} />
          <meta key="og:description" property="og:description" content={SEO_TAGS.openGraph.description} />
          <meta key="og:image" property="og:image" content={SEO_TAGS.openGraph.image} />
          <meta key="og:image:width" property="og:image:width" content={SEO_TAGS.openGraph.imageWidth} />
          <meta key="og:image:height" property="og:image:height" content={SEO_TAGS.openGraph.imageHeight} />
          <meta key="og:locale" property="og:locale" content={SEO_TAGS.openGraph.locale} />
        </Head>
        <Component {...pageProps} />
      </Container>
    )
  }
}
