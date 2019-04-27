import { memo } from 'react'
import Translate from 'components/Translate'
import { ds } from 'styles/tokens'
import { css } from 'emotion'

const socials = [
  {
    icon: <svg fill={ds.get('colors.blue')} aria-hidden="true" className="relative z-10 w-15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" ><path fill={ds.get('colors.blue')} d="M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1c.3-4.2.6-8.7.6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z" /></svg>,
    link: 'https://www.behance.net/lucasjouin65eb',
    name: 'Behance',
  },
  {
    icon: <svg fill={ds.get('colors.blue')} aria-hidden="true" className="relative z-10 w-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" ><path fill={ds.get('colors.blue')} d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" /></svg>,
    link: 'https://www.linkedin.com/in/lucasjouin',
    name: 'Linkedin',
  }
]

const SocialLinks = memo(
  (props) => {
    const { locale, changeLang } = props
    return (
        <ul className="list-reset flex justify-center sm:justify-start items-center">
            {socials.map((e, index) => <li className={`${index === 0 ? "ml-20" : ""} ${index < socials.length ? "mr-10" : ""}`} key={index}>
              <a title={e.label} className={`relative overflow-hidden text-blue border-2 border-solid border-blue rounded-full flex items-center justify-center h-30 w-30`.concat(" ", css({
                transition: "all 250ms ease-in-out",
                "> svg path": {
                  transition: "all 350ms ease-in-out",
                },
                "&:hover": {
                  borderWidth: 0,
                  "> svg path": {
                    fill: ds.get('colors.white'),
                  },
                  "&::after": {
                    transform: "translateY(0)",
                  },
                },
                "&::after": {
                  content: "' '",
                  display: 'block',
                  position: "absolute",
                  width: "200%",
                  height: "200%",
                  zIndex: -1,
                  transform: "translateY(150%)",
                  backgroundColor: ds.get('colors.blue'),
                  transition: "all 250ms ease-in-out",
                }
              }))} href={e.link}>
                {e.icon}
                <span className="hidden">
                  <Translate id='socials.goTo' value={{ label: e.label }} />
                </span>
              </a>
            </li>
            )}
          </ul>
    )
  }
)

export default SocialLinks