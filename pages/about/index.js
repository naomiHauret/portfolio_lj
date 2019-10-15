import { Fragment, PureComponent } from "react"
import { withRouter } from "next/router"
import Layout from "components/Layout"
import { Client } from "utils/prismic"
import { DEFAULT_LANG } from "utils/config"
import Section from "./Section"
import DecorPicture from "./DecorPicture"
import MainParagraph from "./MainParagraph"

class About extends PureComponent {
  static async getInitialProps({ req }) {
    try {
      const about = await Client(req).getSingle("about-page")
      return { page: about }
    } catch (error) {
      console.log(error)
      return { error: true }
    }
  }
  _addJSONLD = () => {
    return {
      __html: `{
        "@context": "http://schema.org",
        "@type": "Person",
        "name": "Lucas Jouin",
        "jobTitle": "UX Designer",
        "knowsAbout": "UX Design, UI Design",
        "email": "mailto:lucasjouin@gmail.com",
        "image": "https://mir-s3-cdn-cf.behance.net/user/276/926fbb29837889.5824a477cc130.png",
        "alumniOf": "ECV Digital",
        "url": "https://lucasjouin.com",
		    "sameAs": ["https://www.linkedin.com/in/lucasjouin","https://www.behance.net/lucasjouin65eb"]
    }`,
    }
  }

  render() {
    const { error, page, router } = this.props
    const locale = router.query.lang ? router.query.lang : DEFAULT_LANG
    const availablesLocales = {
      en: "en_US",
      fr: "fr_FR",
    }
    const seo = {}
    let content
    let portraits
    if (page) {
      content = page.data
      portraits = content["portaits-gallery"].map((item) => item.portrait.url)
      Object.keys(content).filter((key) => {
        if (key.includes("socialmedia") || key.includes("meta")) seo[key] = content[key]
      })
    }

    return (
      <Layout seo={seo} locale={locale}>
        {this.props.error ? (
          <Fragment />
        ) : (
          <Fragment>
            <div className="md:pl-90 md:pr-60 mb-40 sm:mb-70">
              <section className="flex flex-col-reverse md:flex-row">
                <MainParagraph content={content} availablesLocales={availablesLocales} locale={locale} />
                <div className="w-full md:w-4/12  md:ml-60 text-center md:text-left">
                  <DecorPicture
                    appearBaseDelay={350}
                    appearElementsDelay={120}
                    portrait={portraits[Math.floor(Math.random() * portraits.length)]}
                  />
                </div>
              </section>

              <Section
                content={content}
                availablesLocales={availablesLocales}
                locale={locale}
                dataId="experiences"
                galleryId="experience"
              />
              <Section
                content={content}
                availablesLocales={availablesLocales}
                locale={locale}
                dataId="formations"
                galleryId="formation"
              />
              <Section
                content={content}
                availablesLocales={availablesLocales}
                locale={locale}
                dataId="skills"
                galleryId="skill"
              />

              <script type="application/ld+json" dangerouslySetInnerHTML={this._addJSONLD()} />
            </div>
          </Fragment>
        )}
      </Layout>
    )
  }
}
export default withRouter(About)
