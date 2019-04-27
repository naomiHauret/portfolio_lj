import { memo } from 'react'
import { ds } from 'styles/tokens'
import { pxTo } from "design-system-utils"
import { css } from 'emotion'

const Container = memo(
  ({ contained, children, dynamicStyles, staticStyles, ...props }) => {
    const baseFontSize = ds.get("type.sizes.baseFontSize")

    return <div className={
      `mx-auto w-full px-20 md:px-0 ${contained === true ? "sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl" : "" } ${staticStyles ? staticStyles : ''}
    `.concat(' ', css({
          ...dynamicStyles,
        }))
    }>
      {children}
    </div>
  })

export default Container