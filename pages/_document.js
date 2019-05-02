// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import Document, { Head, Main, NextScript } from "next/document"
import { Fragment } from "react"
import { ANALYTICS } from 'utils/config'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const isProduction = process.env.NODE_ENV === "production"
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps, isProduction }
  }

  _setGoogleTags() {
    return {
      __html: `
        window.dataLayer = window.dataLayer || []
        function gtag(){dataLayer.push(arguments)}
        gtag('js', new Date())
        gtag('config', "${ANALYTICS}")
      `,
    }
  }

  render() {
    const { isProduction } = this.props
    return (
      <html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="google-site-verification" content="ei5FqA2JEo-PM4QEbGyceut41bVwh2wTqY1pwxJvHWg" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <meta name="author" content="Lucas Jouin" />
          <link rel="icon" href="/static/favicon/32x32.ico" />
          <link crossorigin="anonymous" rel="preload" href="/static/fonts/Objectivity-Regular.woff2" as="font" />
          <link crossorigin="anonymous" rel="preload" href="/static/fonts/Objectivity-Bold.woff2" as="font" />
          <link crossorigin="anonymous" rel="preload" href="/static/fonts/Objectivity-ExtraBold.woff2" as="font" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {isProduction && (
            <Fragment>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS}`} />
              <script dangerouslySetInnerHTML={this._setGoogleTags()} />
            </Fragment>
          )}
        </body>
      </html>
    )
  }
}
