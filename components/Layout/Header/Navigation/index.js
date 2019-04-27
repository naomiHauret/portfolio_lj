import { withRouter } from 'next/router'
import Translate from 'components/Translate'
import Link from './Link'
import styles from './styles.local.css'

const Navigation =  (props) => {
  const { router } = props
  const locale = router.query.lang ? router.query.lang : 'en'
  return (

    <nav role="navigation">
      <ul className={`list-reset ${styles.links} flex items-center`}>
        <li className={`w-150 relative ${styles.withDecoration}`}>
          <Link
            prefetch
            as={`/${locale}`}
            href={`/?lang=${locale}`}
            passHref
          >
            <a>
              <strong className="text-blue text-base lowercase font-bold ">
                Lucas<br />Jouin
              </strong>
            </a>
          </Link>
        </li>
        <li className="sm:mt-0 mr-20 sm:mr-30">
          <Link
            prefetch
            activeClassName={`${styles.active}`}
            as={`/${locale}#work`}
            href={`/?lang=${locale}#work`}
            passHref
          >
            <a>
              <Translate id='nav.work' />
            </a>
          </Link>
        </li>
        <li className="sm:mt-0">
          <Link
            prefetch
            activeClassName={`${styles.active}`}
            as={`/${locale}/about`}
            href={`/about?lang=${locale}`}
            passHref
          >
            <a>
              <Translate id='nav.about' />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
)}

export default withRouter(Navigation)