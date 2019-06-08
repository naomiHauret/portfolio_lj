import { Fragment, PureComponent } from "react"
import { withRouter } from "next/router"
import Link from "next/link"
import Layout from "components/Layout"
import { Client, linkResolver } from "utils/prismic"
import { RichText } from "prismic-reactjs"
import styles from "./styles.local.css"
import { css } from "emotion"

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
  _renderSection = (content, availablesLocales, locale, dataId, galleryId) => {
    return (
      <section className="mt-50 md:mt-70 flex flex-col md:flex-row">
        <div className="w-full md:w-4/12 md:min-w-300 text-gray ">
          <h2
            className={`mb-20 md:mb-40 text-blue text-20 md:text-25 leading-32 font-bold relative ${
              styles.titleDecoration
            }`}
          >
            {content[`${dataId}-title-${availablesLocales[locale]}`]}
          </h2>
          <div className="leading-23 text-15 md:text-base">
            {RichText.render(content[`${dataId}-paragraph-${availablesLocales[locale]}`], linkResolver)}
          </div>
        </div>
        <ul className={`list-reset flex-grow  md:ml-60 mt-10 md:mt-0 ${styles.gridGallery}`}>
          {content[`${dataId}-gallery`].map((picture, key) => (
            <li
              className="w-full flex my-30 md:my-0 items-center justify-center flex-grow relative"
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
    const locale = router.query.lang ? router.query.lang : "fr"
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
                <div className="leading-23 text-15 md:text-base text-gray w-full md:min-w-460 md:w-6/12 pt-50">
                  {RichText.render(content[`about-paragraph-${availablesLocales[locale]}`], linkResolver)}
                </div>
                <div className="w-full md:w-4/12  md:ml-60 text-center md:text-left">
                <div className="relative">
                  {/********* PINK ZIGZAG ********* */}
                  <div className={`absolute`.concat(" ", css({
                    bottom: "-20px",
                    right: 0
                  }))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="106" height="122"><defs><linearGradient id="a" x1="11.897%" x2="105.371%" y1="37.49%" y2="54.418%"><stop offset="0%" stopColor="#C73DFF"/><stop offset="100%" stopColor="#FFF"/></linearGradient></defs><path fill="none" stroke="url(#a)" stroke-linecap="round" stroke-width="5" d="M-20.9 47.26c46.888-27.823 70.331-32.593 70.331-14.309 0 27.426-25.4 70.124 0 70.124s80.67-44.268 80.67-29.467" transform="rotate(-59 54.6 62.575)"/></svg>
                  </div>
                  {/********* END PINK ZIGZAG ********* */}
                  {/********* BLUE SQUARE ***************/}
                  <div className={`absolute`.concat(" ", css({
                    left: "15px",
                    bottom: "67px",
                  }))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="57" height="56"><defs><linearGradient id="b" x1="50%" x2="97.804%" y1="35.474%" y2="111.502%"><stop offset="0%" stopColor="#68D5FF"/><stop offset="100%" stopColor="#FFF"/></linearGradient></defs><path fill="url(#b)" fillRule="evenodd" transform="rotate(-13 22.656 29.904)" d="M12.835-.596l37.321 7.094v53.906l-55-11z"/></svg>
                  </div>
                  {/********* END BLUE SQUARE ********* */}
                  {/********* GRADIENT LINE ***************/}
                  <div className={`absolute`.concat(" ", css({
                    zIndex: -1,
                    top: "30px",
                    left: "30px",
                  }))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="233" height="168"><defs><linearGradient id="c" x1="0%" y1="50%" y2="50%"><stop offset="0%" stopColor="#EEEE52"/><stop offset="61.043%" stopColor="#EB58E2"/><stop offset="100%" stopColor="#2EBDFF"/></linearGradient></defs><path fill="url(#c)" fillRule="evenodd" transform="rotate(35 116.198 83.659)" d="M-21.802 78.159h276v11h-276z"/></svg>                  </div>
                  {/********* END GRADIENT LINE ********* */}

                    <img
                      alt=""
                      className="rounded-full overflow-hidden text-center md:text-left"
                      src={portraits[Math.floor(Math.random() * portraits.length)]}
                    />
                  </div>
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
