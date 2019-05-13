import Head from "next/head"
import React, { memo } from "react"
import Translate from "components/Translate"

const SEOHead = memo((props) => {
  const { title, metadescription, socialmediaTitle, socialmediaDescription, socialmediaLocale } = props
  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="description" name="description" content={metadescription} />
      <meta key="og:title" property="og:title" content={socialmediaTitle} />
      <meta key="og:description" property="og:description" content={socialmediaDescription} />
      <meta key="og:locale" property="og:locale" content={socialmediaLocale} />
    </Head>
  )
})

export default SEOHead
