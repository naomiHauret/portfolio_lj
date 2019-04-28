import dotize from "dotize"
import fr from "translations/fr"
import en from "translations/en"

const langs = {
  en: dotize.convert(en),
  fr: dotize.convert(fr),
}

export const t = (id, translation, values) => {
  let translated = Object.keys(langs).includes(translation.locale)
    ? langs[translation.locale][id]
    : langs[translation.fallback][id]
  let translatedWithVariables = translated

  if (translated !== undefined && translated !== null) {
    values !== undefined &&
      Object.keys(values).map((v) => {
        let pattern = new RegExp(`%${v}%`, "gi") // Regex = %...%
        translatedWithVariables = translatedWithVariables.replace(pattern, values[v]) // replace everything between the % AND the % symbols
      })
    return translatedWithVariables
  }

  // Simple translated string with no interpolation
  if (translated !== undefined && translated !== null) return translated
}
