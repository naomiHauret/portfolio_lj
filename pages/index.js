import { Fragment, PureComponent } from "react"
import { withRouter } from "next/router"
import Link from "next/link"
import { Client, Prismic, linkResolver } from "utils/prismic"
import Layout from "components/Layout"
import { RichText } from "prismic-reactjs"
import Translate from "components/Translate"
import { css } from "emotion"
import { ds } from "styles/tokens"
import { pxTo } from "design-system-utils"
import styles from "./home/styles.local.css"
import { t } from "utils/translation"
import ListProjects from './home/ListProjects'
import Intro from './home/Intro'
import HelloYou from './home/HelloYou'

const baseFontSize = ds.get("type.sizes.baseFontSize")

class Home extends PureComponent {
  static async getInitialProps({ req }) {
    try {
      const home = await Client(req).getSingle("home-page")
      const projects = await Client(req).query(Prismic.Predicates.at("document.type", "project-page"), { pageSize: 50 })
      const projectsList = projects.results.map((r) => ({
        "name-en_US":
          r.data["project-name-en_US"] === null ? r.data["project-name-fr_FR"] : r.data["project-name-en_US"],
        "name-fr_FR": r.data["project-name-fr_FR"],
        "image-preview": r.data["project-image-preview"],
        color: r.data["project-color"],
        uid: r.uid,
      }))
      return { home, projects: projectsList }
    } catch (error) {
      console.log(error)
      return { error: true }
    }
  }

  _addJSONLD = () => {
    return {
      __html: `{
        "@context": "http://schema.org",
        "@type": "ProfessionalService",
        "name": "Lucas Jouin",
        "description": "UX Designer",
        "image": "https://foliolucasjouin.cdn.prismic.io/foliolucasjouin%2F6b31c6e2-0e5a-4e3a-b08c-017c87c5b5d6_aboutme_logo_freelance.svg",
        "logo": "https://foliolucasjouin.cdn.prismic.io/foliolucasjouin%2F6b31c6e2-0e5a-4e3a-b08c-017c87c5b5d6_aboutme_logo_freelance.svg",
        "url": "https://lucasjouin.com",
        "sameAs": ["https://www.linkedin.com/in/lucasjouin","https://www.behance.net/lucasjouin65eb"],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nantes",
          "postalCode": "44000",
          "addressCountry": "France"
        }
      }`,
    }
  }

  render() {
    const { error, router, home, projects } = this.props
    const locale = router.query.lang ? router.query.lang : "en"
    const seo = {}
    let introductionParagraph
    let content
    let projectsData
    const workRegex = new RegExp('^\/(.*)#work$')
    const availablesLocales = {
      en: "en_US",
      fr: "fr_FR",
    }

    if (home && projects) {
      content = home.data
      Object.keys(content).filter((key) => {
        if (key.includes("socialmedia") || key.includes("meta")) seo[key] = content[key]
      })
    }
    return (
      <Layout locale={locale} seo={seo}>
        {this.props.error ? (
          <Fragment />
        ) : (
          <Fragment>
              <HelloYou appearBaseDelay={150} appearElementsDelay={2000} />
              <Intro appearBaseDelay={1050} className={`${ styles.headingDecoration } leading-40 sm:leading-50 block max-w-600 mx-auto text-20 sm:text-35 font-500 text-center mb-50 sm:my-100`}>
                {RichText.render(content[`introduction-paragraph-${availablesLocales[locale]}`], linkResolver)}
            </Intro>
            <nav id="work">
                <ListProjects startAnimNow={workRegex.test(router.asPath)} availablesLocales={availablesLocales} locale={locale} projects={projects} content={content}/>
            </nav>
          </Fragment>
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={this._addJSONLD()} />
      </Layout>
    )
  }
}

export default withRouter(Home)
