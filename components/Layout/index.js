import { useState, memo, Fragment } from 'react'
import { Translation as TranslationContext } from "store/Translation"
import Container from 'components/Container'
import FormContact from './FormContact'
import Header from './Header'
import Footer from './Footer'
import SEOHead from './SEOHead'
import SelectLanguage from './SelectLanguage'
import SocialLinks from './SocialLinks'

const Layout = memo(
  props => {
    const  { children, seo, locale } = props
    const [translation, setLocale] = useState({ locale: props.locale, fallback: 'en' })
    const availableLocales = {
      fr: 'fr_FR',
      en: 'en_US',
    }
    const title = Object.keys(seo).filter(key => key.includes(`metatitle-${locale}_`) === true && seo[key])
    const metadescription = Object.keys(seo).filter(key => key.includes(`metatitle-${locale}_`) === true && seo[key])
    const socialmediaTitle = Object.keys(seo).filter(key => key.includes(`socialmedia-title-${locale}_`) === true && seo[key])
    const socialmediaDescription = Object.keys(seo).filter(key => key.includes(`socialmedia-description-${locale}_`) === true && seo[key])
    return (
      <Fragment>
        <SEOHead
          title={seo[title]}
          metadescription={seo[metadescription]}
          socialmediaTitle={seo[socialmediaTitle]}
          socialmediaDescription={seo[socialmediaTitle]}
          socialmediaLocale={availableLocales[locale]}
        />
        <TranslationContext.Provider value={translation}>
          <Header changeLang={setLocale} locale={locale} />
          <main role="main" className="mt-100 flex-grow">
            <Container contained={true}>
              {children}
            </Container>
          </main>
          <div className="w-full px-20 md:px-3/12 mt-30 sm:mt-75">
            <FormContact />
          </div>
          <Container contained={true}>
            <div className="text-center sm:hidden">
              <SocialLinks />
              <SelectLanguage onChange={setLocale} />
            </div>
            <Footer />
          </Container>
        </TranslationContext.Provider>
      </Fragment>
    )
  }
)

export default Layout