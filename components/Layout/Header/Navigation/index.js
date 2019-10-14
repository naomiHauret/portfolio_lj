import React from "react"
import Translate from "components/Translate"
import Link from "./Link"
import styles from "./styles.local.css"
import { t } from "utils/translation"
import { DEFAULT_LANG } from "utils/config"

const Navigation = (props) => {
  const { router } = props
  const locale = router.query.lang ? router.query.lang : DEFAULT_LANG
  const activeWorkLinkRegex = new RegExp("^/((work)?)$")
  const activeAboutLinkRegex = new RegExp("^/about$")

  return (
    <nav role="navigation">
      <ul className={`list-reset lowercase ${styles.links} flex items-center`}>
        <li className={`w-150 relative ${styles.withDecoration}`}>
          <Link as={`/${locale}`} href={`/?lang=${locale}`} passHref>
            <a>
              <strong className="text-blue text-base font-bold ">
                Lucas
                <br />
                Jouin
              </strong>
            </a>
          </Link>
        </li>
        <li className="sm:mt-0 mr-20 sm:mr-30">
          <Link
            active={activeWorkLinkRegex.test(router.pathname)}
            activeClassName={`${styles.active}`}
            as={`/${locale}#work`}
            href={`/?lang=${locale}#work`}
            passHref
          >
            <a>
              <Translate id="nav.work" />
            </a>
          </Link>
        </li>
        <li className="sm:mt-0">
          <Link
            active={activeAboutLinkRegex.test(router.pathname)}
            prefetch
            activeClassName={`${styles.active} pointer-events-none`}
            as={`/${locale}/about`}
            href={`/about?lang=${locale}`}
            passHref
          >
            <a>
              <Translate id="nav.about" />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
