import React, { useState, memo, Fragment } from "react"
import { Translation as TranslationContext } from "store/Translation"
import Container from "components/Container"
import FormContact from "./FormContact"
import Header from "./Header"
import Footer from "./Footer"
import SEOHead from "./SEOHead"
import SelectLanguage from "./SelectLanguage"
import SocialLinks from "./SocialLinks"
import { withRouter } from "next/router"

const Layout = memo((props) => {
  const { children, seo, locale, router } = props
  const [translation, setLocale] = useState({ locale: props.locale, fallback: "en" })
  const availableLocales = {
    fr: "fr_FR",
    en: "en_US",
  }
  const title = Object.keys(seo).filter((key) => key.includes(`metatitle-${locale}_`) === true && seo[key])
  const metadescription = Object.keys(seo).filter((key) => key.includes(`metatitle-${locale}_`) === true && seo[key])
  const socialmediaTitle = Object.keys(seo).filter(
    (key) => key.includes(`socialmedia-title-${locale}_`) === true && seo[key],
  )
  const socialmediaDescription = Object.keys(seo).filter(
    (key) => key.includes(`socialmedia-description-${locale}_`) === true && seo[key],
  )
  const socialmediaPreview = {
    url: seo['socialmedia-preview'].url,
    width:  seo['socialmedia-preview'].dimensions.width,
    height:  seo['socialmedia-preview'].dimensions.height,
  }

  return (
    <Fragment>
      <SEOHead
        title={seo[title]}
        metadescription={seo[metadescription]}
        socialmediaTitle={seo[socialmediaTitle]}
        socialmediaDescription={seo[socialmediaDescription]}
        socialmediaLocale={availableLocales[locale]}
        socialmediaPreview={socialmediaPreview}
      />
      <TranslationContext.Provider value={translation}>
        <Header router={router} changeLang={setLocale} locale={locale} />
        <main role="main" className="mt-100 flex-grow">
          <Container contained={true}>{children}</Container>
        </main>
        <Container contained={true} staticStyles="md:px-1/12 mt-30 sm:mt-75">
          <FormContact />
        </Container>
        <Container contained={true}>
          <div className="text-center sm:hidden">
            <SocialLinks />
            <SelectLanguage router={router} onChange={setLocale} />
          </div>
          <Footer />
        </Container>
      </TranslationContext.Provider>
    </Fragment>
  )
})

export default withRouter(Layout)
