import React, { memo } from "react"
import { linkResolver } from "utils/prismic"
import { RichText } from "prismic-reactjs"
import styles from "./styles.local.css"
import { useInView } from "react-intersection-observer"
import { useSpring, animated } from "react-spring"
const Section = memo((props) => {
  const { content, availablesLocales, locale, dataId, galleryId } = props
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  return (
    <section ref={ref} className="mt-50 md:mt-70 flex flex-col md:flex-row">
      <div className="w-full md:w-4/12 md:min-w-300 text-gray ">
        <animated.h2
          ref={ref}
          style={useSpring({
            delay: 350,
            transform: inView ? "translateY(0)" : "translateY(10px)",
            opacity: inView ? 1 : 0,
          })}
          className={`mb-20 md:mb-40 text-blue text-20 md:text-25 leading-32 font-bold relative ${styles.titleDecoration}`}
        >
          {content[`${dataId}-title-${availablesLocales[locale]}`]}
        </animated.h2>
        <animated.div
          ref={ref}
          style={useSpring({
            delay: 250,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            opacity: inView ? 1 : 0,
          })}
          className="leading-23 text-15 md:text-base"
        >
          {RichText.render(content[`${dataId}-paragraph-${availablesLocales[locale]}`], linkResolver)}
        </animated.div>
      </div>
      <animated.ul
        ref={ref}
        style={useSpring({
          delay: 450,
          transform: inView ? "translateY(0)" : "translateY(15px)",
          opacity: inView ? 1 : 0,
        })}
        className={`list-reset flex-grow  md:ml-60 mt-10 md:mt-0 ${styles.gridGallery}`}
      >
        {content[`${dataId}-gallery`].map((picture, key) => (
          <li className="w-full flex my-30 md:my-0 items-center justify-center flex-grow relative" key={key}>
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
      </animated.ul>
    </section>
  )
})

export default Section
