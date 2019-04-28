import { Fragment } from 'react'
import { css } from 'emotion'
import { pxTo } from 'design-system-utils'
import { ds } from 'styles/tokens'
import styles from './styles.local.css'
import { mq } from 'styles/tokens/helper'

const baseFontSize = ds.get("type.sizes.baseFontSize")
const themeSystem = {
  display: {
    input: 'inline-flex flex-row items-center',
    textarea: 'flex flex-col',
  }
}


const Input = (props) => {
  const { label, name, handleChange, tagType } = props
  const inputProps = {}
  Object.keys(props).filter(prop => ["label", "handleChange", "tagType"].includes(prop) === false).map(p =>
    inputProps[p] = props[p]
  )

  const InputTag = tagType
  return <Fragment>
    <label className={`${themeSystem.display[tagType]} text-blue text-15 sm:text-25 text-left whitespace-no-wrap`} htmlFor={name}>
      {label}
      <div className={
        `relative overflow-hidden ${tagType === 'textarea' ? "" : "w-6/12"} ${styles.wrapper}`.concat(
          ' ', css({
            marginLeft: tagType === 'input' ? '0.5ch' : 0,
            marginTop: tagType === 'textarea' ? '0.5ch' : 0,
            [mq.md]: {
              marginTop: tagType === 'textarea' ? '1ch' : 0,
            },
            '> span::after': {
              content: "' '",
              display: 'block',
              width: '100%',
              height: pxTo(2, baseFontSize, "rem"),
              position: 'absolute',
              bottom: tagType === 'textarea' ? `calc(100% - ${pxTo(50, baseFontSize, "rem")})` : 0,
              left: 0,
              backgroundColor: ds.get('colors.blue'),
              transition: "all 350ms ease-in-out",
              [mq.sm] : {
                height: pxTo(3, baseFontSize, "rem"),
              }
            },
            '&:focus-within': {
              '> span::after': {
                transform: 'translateX(125%)',
              },
            },
          })
        )}
      >
        <InputTag className={
          `
              ${tagType === 'textarea' ? 'w-full' : 'mt-10 md:mt-0 pb-10'}
              text-blue font-family-inherit text-inherit font-bold
              focus:outline-none
              h-full
            `.concat(' ', css({
              minHeight: tagType === 'textarea' ? pxTo(100, baseFontSize, "rem") : 0,
            }))
        }
          onChange={handleChange}
          required
          {...inputProps}
        />
        <span className="underline" />
        </div>
    </label>
  </Fragment>
}

export default Input
