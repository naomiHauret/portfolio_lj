import React, { memo } from "react"
import { css } from "emotion"

const Container = memo(({ contained, children, dynamicStyles, staticStyles, ...props }) => {
  return (
    <div
      className={`mx-auto w-full px-20 ${contained === true ? "sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl" : ""} ${
        staticStyles ? staticStyles : ""
      }
    `.concat(
        " ",
        css({
          ...dynamicStyles,
        }),
      )}
    >
      {children}
    </div>
  )
})

export default Container
