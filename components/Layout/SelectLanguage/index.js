import React, { PureComponent, Fragment } from "react"
import Select from "react-select"
import { pxTo } from "design-system-utils"
import { ds } from "styles/tokens"
import Router from "next/router"
import Link from "components/Layout/Header/Navigation/Link"
import Translate from "components/Translate"
import { DEFAULT_LANG } from "utils/config"

const baseFontSize = ds.get("type.sizes.baseFontSize")
const options = {
  en: { value: "en", label: "English" },
  fr: { value: "fr", label: "Français" },
}

class SelectLanguage extends PureComponent {
  state = {
    selectedOption: options[this.props.router.query.lang ? this.props.router.query.lang : DEFAULT_LANG],
  }

  _handleChange = (selectedOption) => {
    const { onChange, router } = this.props
    const newLocale = selectedOption.value
    this.setState({ selectedOption })
    onChange({ locale: newLocale, fallback: DEFAULT_LANG })
    let href
    let as
    switch (router.route) {
      case "/index":
        href = `/?lang=${newLocale}`
        as = `/${newLocale}`
        break

      case "/":
        href = `/?lang=${newLocale}`
        as = `/${newLocale}`
        break

      case "/about":
        href = `/about?lang=${newLocale}`
        as = `/${newLocale}/about`
        break

      case "/work":
        href = `/work?lang=${newLocale}&slug=${router.query.slug}`
        as = `/${newLocale}/work/${router.query.slug}`
        break

      default:
        break
    }

    Router.push(href, as, {
      shallow: true,
    })
  }

  render() {
    const { selectedOption } = this.state
    const { router } = this.props
    const locale = router.query.lang ? router.query.lang : DEFAULT_LANG
    const newLocale = locale === "en" ? "fr" : "en"
    let href
    let as

    switch (router.route) {
      case "/index":
        href = `/?lang=${newLocale}`
        as = `/${newLocale}`
        break

      case "/":
        href = `/?lang=${newLocale}`
        as = `/${newLocale}`
        break

      case "/about":
        href = `/about?lang=${newLocale}`
        as = `/${newLocale}/about`
        break

      case "/work":
        href = `/work?lang=${newLocale}&slug=${router.query.slug}`
        as = `/${newLocale}/work/${router.query.slug}`
        break

      default:
        break
    }
    const customStyles = {
      container: (base, state) => ({
        ...base,
        cursor: "pointer",
        border: 0,
        outline: 0,
        fontSize: pxTo(ds.get("type.sizes.12"), baseFontSize, "rem"),
      }),
      control: (base, state) => ({
        ...base,
        border: state.menuIsOpen ? pxTo(1, baseFontSize, "rem") : 0,
        outline: 0,
        boxShadow: "none",
      }),
      indicatorSeparator: (base, state) => ({
        background: "transparent",
      }),
      dropdownIndicator: (base, state) => ({
        ...base,
        padding: 0,
        opacity: state.isFocused === true ? 0 : 1,
      }),
      valueContainer: (base, state) => ({
        ...base,
      }),
      singleValue: (base, state) => ({
        ...base,
        position: "relative",
        transform: "unset",
        color: ds.get("colors.gray"),
      }),
      option: (base, state) => ({
        ...base,
        border: 0,
        outline: 0,
        backgroundColor: ds.get("colors.white"),
        color: ds.get("colors.gray"),
        fontWeight: state.isSelected ? "bold" : "100",
      }),
      menu: (base, state) => ({
        boxShadow: `0 ${pxTo(2, baseFontSize, "rem")} ${pxTo(4, baseFontSize, "rem")} 0 rgba(0,0,0,0.2)`,
        border: `${ds.get("colors.grayDark")} solid ${pxTo(1, baseFontSize, "rem")}`,
        zIndex: 5,
        position: "absolute",
        top: 0,
      }),
    }
    const goToWebsiteLabel = `goToWebsite.${newLocale}`
    return (
      <Fragment>
        <div className="hidden sm:block">
          <Select
            instanceId="selectLang"
            value={selectedOption}
            onChange={this._handleChange}
            options={Object.values(options)}
            styles={customStyles}
          />
        </div>
        <div className="text-center text-12 mb-30 mt-20 sm:my-0 sm:hidden">
          <Link as={as} href={href} passHref>
            <a>
              <Translate id={goToWebsiteLabel} />
            </a>
          </Link>
        </div>
      </Fragment>
    )
  }
}

export default SelectLanguage
