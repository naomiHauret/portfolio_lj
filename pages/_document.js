// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import Document, { Head, Main, NextScript } from "next/document"
import { Fragment } from "react"

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
        gtag('config', 'UA-XXXXXXXX-X')
      `,
    }
  }

  render() {
    const { isProduction } = this.props
    return (
      <html>
        <Head>
          {isProduction && (
            <link rel="stylesheet" type="text/css" href={"/_next/static/css/styles.chunk.css?v=" + Date.now()} />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
          {isProduction && (
            <Fragment>
              <script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-X" />
              <script dangerouslySetInnerHTML={this._setGoogleTags()} />
            </Fragment>
          )}
        </body>
      </html>
    )
  }
}
