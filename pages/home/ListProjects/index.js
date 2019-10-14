import React, { useRef, useCallback, Fragment, memo } from "react"
import { useSpring, useTransition, animated } from "react-spring"
import { css } from "emotion"
import Link from "next/link"
import { Client, Prismic, linkResolver } from "utils/prismic"
import { RichText } from "prismic-reactjs"
import Translate from "components/Translate"
import { t } from "utils/translation"
import styles from "./styles.local.css"

const ListProjects = memo((props) => {
  const { startAnimNow, projects, content, locale, availablesLocales } = props
  return (
    <ul className={`list-reset mx-auto ${styles.projectsGrid}`}>
      {projects.map((project, k) => (
        <li className="md:cursor-pointer overflow-hidden relative" key={project.uid}>
          <animated.div
            className="absolute pin-t pin-l bg-violet h-full w-full z-10"
            style={useSpring({
              to: [{ transform: "translateX(0)" }, { transform: "translateX(100%)" }],
              from: { transform: "translateX(100%)", width: "100%" },
              delay: startAnimNow === true ? k * 100 : 2500 + k * 100,
            })}
          />
          <Link as={`/${locale}/work/${project.uid}`} href={`/work?lang=${locale}&slug=${project.uid}`} passHref>
            <a
              title={t(
                "pages.home.goToProject",
                { locale, fallback: "en" },
                {
                  name: project[`name-${availablesLocales[locale]}`],
                },
              )}
              className="block absolute pin-l pin-t w-full h-full"
            >
              <animated.figure
                style={useSpring({
                  to: { opacity: 1, transform: "translateX(0)" },
                  from: { opacity: 0, transform: "translateX(-100%)" },
                  delay: startAnimNow === true ? 700 + k * 100 : 3150 + k * 100,
                })}
                className={`relative p-0 m-0 h-full w-full `.concat(
                  " ",
                  css({
                    backgroundColor: project.color,
                  }),
                )}
              >
                <div className="p-40 h-full sm:p-30 m-0 flex items-center justify-center">
                  <img alt="" className="h-full w-full max-w-300" src={project["image-preview"]["menu-preview"].url} />
                </div>
                <figcaption className="hidden">
                  <Translate
                    id="pages.home.goToProject"
                    values={{
                      name: project[`name-${availablesLocales[locale]}`],
                    }}
                  />
                </figcaption>
              </animated.figure>
            </a>
          </Link>
        </li>
      ))}
      <li>
        <aside className="sm:ml-20 ">
          <animated.h2
            style={useSpring({
              to: { opacity: 1, transform: "translateX(0)" },
              from: { opacity: 0, transform: "translateX(-10px)" },
              delay: startAnimNow === true ? 1500 : 3950,
            })}
            className={`mt-30 mb-20 sm:mt-20 text-20 text-blue font-bold relative ${styles.subTitleDecoration}`}
          >
            <Translate id="pages.home.seeMore" />
          </animated.h2>
          <animated.div
            className={`font-500 text-gray leading-30 text-14`}
            style={useSpring({
              to: { opacity: 1, transform: "translateX(0)" },
              from: { opacity: 0, transform: "translateX(-15px)" },
              delay: startAnimNow === true ? 1750 : 4150,
            })}
          >
            {RichText.render(content[`more-paragraph-${availablesLocales[locale]}`], linkResolver)}
          </animated.div>
        </aside>
      </li>
    </ul>
  )
})

export default ListProjects
