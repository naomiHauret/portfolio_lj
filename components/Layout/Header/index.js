import { memo } from "react"
import Translate from "components/Translate"
import Navigation from "./Navigation"
import Container from "components/Container"
import SelectLanguage from "components/Layout/SelectLanguage"
import SocialLinks from "components/Layout/SocialLinks"
import { ds } from "styles/tokens"
import { css } from "emotion"
import dynamic from "next/dynamic"

const options = {
  en: { value: "en", label: "English" },
  fr: { value: "fr", label: "Français" },
}

const Header = memo((props) => {
  const { locale, changeLang } = props

  const LoadingSelect = () => (
    <div className="flex items-center w-80 p-10 h-40 text-12 text-gray">{options[locale].label}</div>
  )
  const NoSSRLanguageSelect = dynamic(() => import("./../SelectLanguage"), {
    loading: () => <LoadingSelect />,
    ssr: false,
  })
  return (
    <header className="py-30 z-5 bg-white fixed w-full pin-l pin-t" role="banner">
      <Container contained={true} staticStyles="flex items-center">
        <Navigation />
        <div className="hidden sm:flex sm:ml-auto">
          <div>
            <NoSSRLanguageSelect onChange={changeLang} />
          </div>
          <SocialLinks />
        </div>
      </Container>
    </header>
  )
})

export default Header
