import { useState, memo } from "react"
import { Translation as TranslationContext } from "store/Translation"
import { t } from "utils/translation"
import PropTypes from "prop-types"

const Translate = memo((props) => {
  const { id, values } = props

  // use dangerouslySetInnerHTML so we can use markup in our translations
  return (
    <TranslationContext.Consumer>
      {(translationObject) => <span dangerouslySetInnerHTML={{ __html: t(id, translationObject, values) }} />}
    </TranslationContext.Consumer>
  )
})

Translate.propTypes = {
  /**
   * "id" ; required
   * key of the translated string in our translations
   * see "translations" folder
   */
  id: PropTypes.string.isRequired,

  /**
   * "values" ; optional
   *  id/value object of a variable in translated string
   *  see t function in "utils/translation" for specific usage
   */
  values: PropTypes.object,
}

export default Translate
