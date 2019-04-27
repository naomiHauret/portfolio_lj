import { memo } from 'react'
import Translate from 'components/Translate'

const Footer = memo(
  (props) => {
    return (
        <footer className="pb-40 leadin-13 mt-auto text-center text-violet text-12" role="contentinfo">
          <div className="mb-10 sm:mb-5">
            <Translate id='footer.designBy' values={{ name: "Lucas Jouin", emoji: "🤙" }} />
          </div>
          <div>
            <Translate id='footer.codeBy' values={{ name: "Naomi Hauret", emoji: "🤘🏻" }} />
          </div>
        </footer>
    )
  }
)

export default Footer