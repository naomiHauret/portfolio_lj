import React, { memo } from "react"
import { useSpring, animated } from "react-spring"
import useWindowScroll from "@react-hook/window-scroll"

import { css } from "emotion"
const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const transn2 = (x, y) => `translate3d(${x / 37}px,${y / 32}px,0)`
const transn1 = (x, y) => `translate3d(${x / 12}px,${y / -20}px,0)`
const transn0 = (x, y) => `translate3d(${x / -30}px,${y / 18}px,0)`

const DecorPicture = memo((props) => {
  const { portrait, appearBaseDelay, appearElementsDelay } = props
  const baseDelay = appearBaseDelay
  const [parallaxProps, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 5, tension: 250, friction: 20 } }))
  const scrollY = useWindowScroll(60 /*fps*/)

  return (
    <animated.div
      className="relative"
      onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
      style={useSpring({
        to: [{ opacity: 1, transform: "translateY(0)" }],
        from: { opacity: 0, transform: "translateY(20px)" },
        delay: baseDelay,
      })}
    >
      {/********* PINK ZIGZAG ********* */}
      <animated.div
        style={useSpring({
          to: [{ opacity: 1, transform: "translateY(0)" }],
          from: { opacity: 0, transform: "translateY(35px)" },
          delay: baseDelay + appearElementsDelay + 10,
        })}
        className={`absolute`.concat(
          " ",
          css({
            bottom: "-20px",
            right: 0,
          }),
        )}
      >
        <animated.div
          style={useSpring({
            transform: `translateY(${scrollY * -0.05}%)`,
          })}
        >
          <animated.svg
            style={{
              opacity: 1 - scrollY / 200,

              transform: parallaxProps.xy.interpolate(transn0),
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="106"
            height="122"
          >
            <defs>
              <linearGradient id="a" x1="11.897%" x2="105.371%" y1="37.49%" y2="54.418%">
                <stop offset="0%" stopColor="#C73DFF" />
                <stop offset="100%" stopColor="#FFF" />
              </linearGradient>
            </defs>
            <path
              fill="none"
              stroke="url(#a)"
              strokeLinecap="round"
              strokeWidth="5"
              d="M-20.9 47.26c46.888-27.823 70.331-32.593 70.331-14.309 0 27.426-25.4 70.124 0 70.124s80.67-44.268 80.67-29.467"
              transform="rotate(-59 54.6 62.575)"
            />
          </animated.svg>
        </animated.div>
      </animated.div>
      {/********* END PINK ZIGZAG ********* */}
      {/********* BLUE SQUARE ***************/}
      <animated.div
        style={useSpring({
          to: [{ opacity: 1, transform: "rotate(0) translateX(0)" }],
          from: { opacity: 0, transform: "rotate(-25deg) translateX(-15px)" },
          delay: baseDelay + +appearElementsDelay + 50,
        })}
        className={`absolute`.concat(
          " ",
          css({
            left: "15px",
            bottom: "67px",
          }),
        )}
      >
        <animated.div
          style={useSpring({
            transform: `translateY(${scrollY * -0.25}%) translateX(${scrollY * -0.075}%)`,
          })}
        >
          <animated.svg
            style={{
              opacity: 1 - scrollY / 200,

              transform: parallaxProps.xy.interpolate(transn1),
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="57"
            height="56"
          >
            <defs>
              <linearGradient id="b" x1="50%" x2="97.804%" y1="35.474%" y2="111.502%">
                <stop offset="0%" stopColor="#68D5FF" />
                <stop offset="100%" stopColor="#FFF" />
              </linearGradient>
            </defs>
            <path
              fill="url(#b)"
              fillRule="evenodd"
              transform="rotate(-13 22.656 29.904)"
              d="M12.835-.596l37.321 7.094v53.906l-55-11z"
            />
          </animated.svg>
        </animated.div>
      </animated.div>
      {/********* END BLUE SQUARE ********* */}
      {/********* GRADIENT LINE ***************/}
      <animated.div
        style={useSpring({
          to: [{ opacity: 1, transform: "scale(1) translateY(0)" }],
          from: { opacity: 0, transform: "scale(0) translateY(-15px)" },
          delay: baseDelay + appearElementsDelay + 100,
        })}
        className={`absolute`.concat(
          " ",
          css({
            zIndex: -1,
            top: "30px",
            left: "30px",
          }),
        )}
      >
        <animated.div
          style={useSpring({
            transform: `translateY(${scrollY * -0.025}%) translateX(${scrollY * 0.05}%)`,
          })}
        >
          <animated.svg
            style={{
              opacity: 1 - scrollY / 200,

              transform: parallaxProps.xy.interpolate(transn2),
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="233"
            height="168"
          >
            <defs>
              <linearGradient id="c" x1="0%" y1="50%" y2="50%">
                <stop offset="0%" stopColor="#EEEE52" />
                <stop offset="61.043%" stopColor="#EB58E2" />
                <stop offset="100%" stopColor="#2EBDFF" />
              </linearGradient>
            </defs>
            <path
              fill="url(#c)"
              fillRule="evenodd"
              transform="rotate(35 116.198 83.659)"
              d="M-21.802 78.159h276v11h-276z"
            />
          </animated.svg>
        </animated.div>
      </animated.div>
      {/********* END GRADIENT LINE ********* */}

      <img alt="" className="rounded-full overflow-hidden text-center md:text-left" src={portrait} />
    </animated.div>
  )
})

export default DecorPicture
