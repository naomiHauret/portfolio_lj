import { Fragment, PureComponent } from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { Client, Prismic, linkResolver } from 'utils/prismic'
import Layout from 'components/Layout'
import { RichText } from 'prismic-reactjs'
import Translate from 'components/Translate'
import { css } from 'emotion'
import { ds } from 'styles/tokens'
import { pxTo } from "design-system-utils"
import styles from './styles.local.css'
import  { t } from 'utils/translation'

const baseFontSize = ds.get("type.sizes.baseFontSize")

class Home extends PureComponent {
  static async getInitialProps({req}) {
    try {
      const home = await Client(req).getSingle('home-page')
      const projects = await Client(req).query(Prismic.Predicates.at('document.type', 'project-page'), { pageSize: 50 })
      const projectsList = projects.results.map(r => ({
        'name-en_US': r.data['project-name-en_US'] === null ? r.data['project-name-fr_FR'] : r.data['project-name-en_US'],
        'name-fr_FR': r.data['project-name-fr_FR'],
        'image-preview': r.data['project-image-preview'],
        'color': r.data['project-color'],
        'uid': r.uid
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
          "image": "https://via.placeholder.com/150",
          "name": "Lucas Jouin",
          "makesOffer": "UX DESIGN",
          "email": "mailto:lucasjouin@gmail.com",
          "url": "http://www.lucasjouin.fr",
          "sameAs": [
            "https://www.linkedin.com/in/lucasjouin",
            "https://www.behance.net/lucasjouin65eb",
          ]
    }`
    }
  }

  render() {
    const { error, router, home, projects} = this.props
    const locale = router.query.lang ? router.query.lang : 'en'
    const seo = {}
    let introductionParagraph
    let content
    let projectsData
    const availablesLocales = {
      en: 'en_US',
      fr: 'fr_FR'
    }
    if(home && projects) {
      content = home.data
      Object.keys(content).filter(key => {
        if(key.includes('socialmedia') || key.includes('meta')) seo[key] = content[key ]
      })
    }

    return <Layout
      locale={locale}
      seo={seo}
    >
      {this.props.error ? <Fragment>

        </Fragment> : <Fragment>
        <h1 className={`${styles.headingDecoration} leading-40 sm:leading-50 block max-w-600 mx-auto text-20 sm:text-35 font-500 text-center mb-50 sm:my-100`}>
            {RichText.render(content[`introduction-paragraph-${availablesLocales[locale]}`], linkResolver)}
        </h1>
        <nav id="work">
          <ul className={`list-reset mx-auto ${styles.projectsGrid}`}>
            {projects.map(project => <li className="md:cursor-pointer relative" key={project.uid}>
                <Link
                  as={`/${locale}/work/${project.uid}`}
                  href={`/work?lang=${locale}&slug=${project.uid}`}
                  passHref
                >
                  <a title={t('pages.home.goToProject', { locale, fallback: 'en' }, {
                    name: project[`name-${availablesLocales[locale]}`]
                  })} className="block absolute pin-l pin-t w-full h-full">
                <figure className={`relative h-full w-full p-40 sm:p-30 m-0 flex items-center justify-center`.concat(' ', css({
                  backgroundColor: project.color
                }))}>
                    <img className="h-full w-full max-w-300" src={project['image-preview']['menu-preview'].url} />
                  <figcaption className="hidden">
                      <Translate id='pages.home.goToProject' values={{
                        name: project[`name-${availablesLocales[locale]}`]
                      }}/>
                  </figcaption>
                      </figure>
                      </a>
                </Link>
              </li>)
            }
            <li>
                <aside className="sm:ml-20 ">
                  <h2 className={`mt-30 mb-20 sm:mt-20 text-20 text-blue font-bold relative ${styles.subTitleDecoration}`}>
                    <Translate id='pages.home.seeMore' />
                  </h2>
                  <section className={`font-500 text-gray leading-30 text-14`}>
                    {RichText.render(content[`more-paragraph-${availablesLocales[locale]}`], linkResolver)}
                  </section>
                </aside>
            </li>
          </ul>
        </nav>
        </Fragment>
      }
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={this._addJSONLD()}
      />
    </Layout>
  }
}

export default withRouter(Home)