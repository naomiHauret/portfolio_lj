import { memo } from "react"
import Translate from "components/Translate"
import Navigation from "./Navigation"
import Container from "components/Container"
import SelectLanguage from "components/Layout/SelectLanguage"
import SocialLinks from "components/Layout/SocialLinks"
import { ds } from "styles/tokens"
import { css } from "emotion"

const Header = memo((props) => {
  const { locale, changeLang } = props
  return (
    <header className="py-30 z-5 bg-white fixed w-full pin-l pin-t" role="banner">
      <Container contained={true} staticStyles="flex items-center">
        <Navigation />
        <div className="hidden sm:flex sm:ml-auto">
          <div>
            <SelectLanguage onChange={changeLang} />
          </div>
          <SocialLinks />
        </div>
      </Container>
    </header>
  )
})

export default Header
