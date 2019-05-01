import { Fragment, PureComponent } from "react"
import { withRouter } from "next/router"
import Link from "next/link"
import Layout from "components/Layout"
import { Client, linkResolver } from "utils/prismic"
import { RichText } from "prismic-reactjs"
import styles from "./styles.local.css"

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
        "image": "https://via.placeholder.com/150",
        "alumniOf": "ECV Digital",
        "url": "http://www.lucasjouin.fr",
        "sameAs" : [
          "https://www.linkedin.com/in/lucasjouin",
          "https://www.behance.net/lucasjouin65eb",
        ]
    }`,
    }
  }
  _renderSection = (content, availablesLocales, locale, dataId, galleryId) => {
    return (
      <section className="mt-50 md:mt-70 flex flex-col md:flex-row">
        <div className="w-full md:w-4/12 text-gray ">
          <h2
            className={`mb-20 md:mb-40 text-blue text-20 md:text-25 leading-32 font-bold relative ${
              styles.titleDecoration
            }`}
          >
            {content[`${dataId}-title-${availablesLocales[locale]}`]}
          </h2>
          <div className="leading-23  text-15 md:text-base">
            {RichText.render(content[`${dataId}-paragraph-${availablesLocales[locale]}`], linkResolver)}
          </div>
        </div>
        <ul className="list-reset flex-grow flex flex-wrap mt-10 md:mt-0">
          {content[`${dataId}-gallery`].map((picture, key) => (
            <li
              className="w-full sm:w-2/12 md:w-2/12 flex my-30 md:my-0 mx-10 items-center justify-center flex-grow relative"
              key={key}
            >
              {picture[`${galleryId}-logo`] !== undefined && (
                <img alt="" className="w-full h-full max-w-145 object-contain" src={picture[`${galleryId}-logo`].url} />
              )}
              {picture[`${galleryId}-link`] !== undefined && (
                <a
                  className="md:hover:cursor-pointer absolute pin-t opacity-0 block w-full h-full"
                  href={picture[`${galleryId}-link`].url}
                >
                  {picture[`${galleryId}-link`].url}
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    )
  }

  render() {
    const { error, page, router } = this.props
    const locale = router.query.lang ? router.query.lang : "en"
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
            <div className="md:pl-150  mb-40 sm:mb-70">
              <section className="flex flex-col-reverse md:flex-row">
                <div className="leading-23 text-15 md:text-base text-gray w-full md:w-6/12 pt-50">
                  {RichText.render(content[`about-paragraph-${availablesLocales[locale]}`], linkResolver)}
                </div>
                <div className="w-full md:w-4/12 md:ml-60 text-center md:text-left">
                  <img
                    alt=""
                    className="rounded-full overflow-hidden text-center md:text-left"
                    src={portraits[Math.floor(Math.random() * portraits.length)]}
                  />
                </div>
              </section>

              {this._renderSection(content, availablesLocales, locale, "experiences", "experience")}
              {this._renderSection(content, availablesLocales, locale, "formations", "formation")}
              {this._renderSection(content, availablesLocales, locale, "skills", "skill")}

              <script type="application/ld+json" dangerouslySetInnerHTML={this._addJSONLD()} />
            </div>
          </Fragment>
        )}
      </Layout>
    )
  }
}
export default withRouter(About)
