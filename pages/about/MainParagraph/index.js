import React, { memo } from "react"
import { useSpring, animated } from "react-spring"
import { linkResolver } from "utils/prismic"
import { RichText } from "prismic-reactjs"
const MainParagraph = memo((props) => {
  const { availablesLocales, locale, content } = props

  return (
    <animated.div
      style={useSpring({
        to: [{ opacity: 1, transform: "translateY(0)" }],
        from: { opacity: 0, transform: "translateY(20px)" },
        delay: 50,
      })}
      className="leading-23 text-15 md:text-base text-gray w-full md:min-w-460 md:w-6/12 pt-50"
    >
      {RichText.render(content[`about-paragraph-${availablesLocales[locale]}`], linkResolver)}
    </animated.div>
  )
})

export default MainParagraph
