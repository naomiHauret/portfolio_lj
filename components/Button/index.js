import React, { memo } from "react"
import styles from "./styles.local.css"

const Button = memo((props) => {
  const { children, additionalStyles, tagType } = props
  const ButtonTag = tagType
  const buttonProps = {}
  Object.keys(props)
    .filter((prop) => ["additionalStyles", "tagType"].includes(prop) === false)
    .map((p) => (buttonProps[p] = props[p]))

  return (
    <ButtonTag
      className={`${additionalStyles}
            font-bold rounded-full text-blue border-blue border-2 border-solid px-20 py-10 block text-center
            ${tagType === "a" ? `no-underline ${styles.buttonLink}` : ""}
        `}
      {...buttonProps}
    >
      {children}
    </ButtonTag>
  )
})

Button.defaultProps = {
  tagType: "button",
}

export default Button
