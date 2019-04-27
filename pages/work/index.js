import { Fragment, PureComponent } from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { Client, Prismic, linkResolver } from 'utils/prismic'
import Layout from 'components/Layout'
import { css } from 'emotion'
import Translate from 'components/Translate'
import { RichText } from 'prismic-reactjs'
import ImageZoom from 'react-medium-image-zoom'

class Work extends PureComponent {
  static async getInitialProps({ req, query }) {
    try {
      const project = await Client(req).getByUID('project-page', query.slug)
      return { project }

    } catch (error) {
      console.log(error)
      return { error: true }
    }
  }

  render() {
    const { error, router, project } = this.props
    const locale = router.query.lang ? router.query.lang : 'en'
    const seo = {}
    let content
    let projectsData
    const availablesLocales = {
      en: 'en_US',
      fr: 'fr_FR'
    }
    if(project) {
      content = project.data
      Object.keys(content).filter(key => {
        if (key.includes('socialmedia') || key.includes('meta')) seo[key] = content[key]
      })
    }

    if (this.props.error) return <Layout locale={locale}>Error</Layout>
    else {
      return <Layout locale={locale} seo={seo}>
        <section className="md:mx-2/12">
          <h1 className="text-center text-blue text-30 my-20">{content[`project-name-${availablesLocales[locale]}`]}</h1>
          <div className="text-violet font-500 text-13">
            {content[`project-date-${availablesLocales[locale]}`]}
          </div>
          <p className="text-grayLight mt-30 mb-20 leading-20 text-13 font-500">
            {content[`project-description-${availablesLocales[locale]}`]}
          </p>
          <div className={' p-40 sm:p-30 m-0 flex items-center justify-center w-full h-200'.concat(' ', css({
            backgroundColor: content['project-color']
          }))}>
            <img className="w-full h-full max-w-300" src={`${content["project-image-preview"].url}`} />
          </div>
          <div className="leading-23">
            {content[`body-${availablesLocales[locale]}`].map((slice, index) => {
              if (slice.slice_type === 'text') {
                return <div className="mt-30 font-500 text-gray" key={index}>
                  {RichText.render(slice.primary.text)}
                </div>
              } else if (slice.slice_type === 'image_gallery') {
                const galleryContent = slice.items.map((image, imageIndex) => {
                  return <ImageZoom
                    image={{
                      src: image['project-image'].url,
                      alt: RichText.asText(slice.items[0].image_captions),
                      className: 'w-full mt-30',
                    }}
                    zoomImage={{
                      src: image['project-image'].url,
                      alt: RichText.asText(slice.items[0].image_captions)
                    }}
                  />
                })
                return (
                  <figure className="p-0 m-0" key={index}>
                    {galleryContent}
                    <figcaption className="mt-15 text-gray text-13 font-300">
                      {RichText.asText(slice.items[0].image_captions)}
                    </figcaption>
                  </figure>
                )
              // Return null by default
              } else {
                return null
              }
            })
          }
          </div>
        </section>
        <section className="md:mx-2/12  text-center">
          <h2 className="font-bold text-30 text-blue my-50">
            <Translate id='pages.work.seeMore.title' />
          </h2>
          <p className="text-gray">
            <Translate id='pages.work.seeMore.paragraph' values={{
              workUrl: `/${locale}#work`,
              aboutUrl: `/${locale}/about`,
            }} />
          </p>
        </section>
      </Layout>
    }

  }
}

export default withRouter(Work)