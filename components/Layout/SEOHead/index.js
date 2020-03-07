import Head from "next/head"
import React, { memo } from "react"
import Translate from "components/Translate"

const SEOHead = memo((props) => {
  const { title, metadescription, socialmediaTitle, socialmediaDescription, socialmediaLocale, socialmediaPreview } = props
  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="description" name="description" content={metadescription} />
      <meta key="og:title" property="og:title" content={socialmediaTitle} />
      <meta key="og:description" property="og:description" content={socialmediaDescription} />
      <meta key="og:locale" property="og:locale" content={socialmediaLocale} />
      <meta key="og:image" property="og:image" content={socialmediaPreview.url} />
      <meta key="og:image:width" property="og:image:width" content={socialmediaPreview.width} />
      <meta key="og:image:height" property="og:image:height" content={socialmediaPreview.height} />
    </Head>
  )
})

export default SEOHead
