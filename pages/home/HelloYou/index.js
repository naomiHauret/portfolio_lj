import React, { useRef, useCallback, Fragment, memo } from 'react'
import styles from './styles.local.css'
import { useSpring, animated } from 'react-spring'
import { css } from "emotion"
import useWindowScroll from '@react-hook/window-scroll'
const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const transn2 = (x, y) => `translate3d(${x / 37}px,${y / 12}px,0)`
const transn1 = (x, y) => `translate3d(${x / 12}px,${y / 20}px,0)`
const trans0 = (x, y) => `translate3d(${x / 40}px,${y / 37}px,0)`
const trans1 = (x, y) => `translate3d(${x / -27}px,${y / -24}px,0)`
const trans2 = (x, y) => `translate3d(${x / -20}px,${y / 5}px,0)`
const trans3 = (x, y) => `translate3d(${x / 13}px,${y / -20 }px,0)`
const trans4 = (x, y) => `translate3d(${x / 19}px,${y / 17 }px,0)`


const HelloYou = memo(
  (props) => {

    const baseDelay = props.appearBaseDelay
    const elementsDelay = props.appearElementsDelay
    const [parallaxProps, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 5, tension: 350, friction: 140 } }))
    const scrollY = useWindowScroll(60 /*fps*/)

    return <animated.div style={{
      opacity: 1 - scrollY / 200,
      transform: `translateY(-${scrollY / 150 * 10}%)`
    }}
    onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
    {/********** HELLO YOU ***************/}
    <animated.div className="flex items-center justify-center relative mt-260 mb-20" aria-hidden="true">
        <animated.div style={
              useSpring({
                to: [{ opacity: 1, transform: 'translateY(0)' }], from: { opacity: 0, transform: 'translateY(20%)' },
                delay: baseDelay
              }, )
            }>
            <animated.svg style={{ transform: parallaxProps.xy.interpolate(trans0)}} xmlns="http://www.w3.org/2000/svg" width="794" height="149">
              <path
                fill="#090B1F"
                d="M39 113H0V5h39v37.5h28.5V5h39v108h-39V72.5H39V113zm116.25-46.5h18.9c0-5.25-3.9-10.5-9.45-10.5-5.25 0-8.25 4.05-9.45 10.5zm-35.1 7.5c0-25.2 18.6-42 45-42 26.7 0 43.5 16.95 43.5 42.45 0 2.4-.15 7.2-.45 8.55h-52.5c1.8 5.7 5.25 9 10.95 9 4.95 0 7.8-2.55 9-6l30 3.75c-3 15.15-20.1 26.25-41.25 26.25-26.25 0-44.25-16.8-44.25-42zM220.8.5h34.5V113h-34.5V.5zm49.5 0h34.5V113h-34.5V.5zM361.8 32c27 0 45 16.8 45 42s-18 42-45 42-45-16.8-45-42 18-42 45-42zm0 54c6.3 0 10.5-4.8 10.5-12s-4.2-12-10.5-12-10.5 4.8-10.5 12 4.2 12 10.5 12zm111.9 60v-23.25c1.35.45 5.25.75 7.5.75 7.65 0 12.75 0 15.15-8.7L456.45 35h37.5l15 36.45L519.45 35h35.25l-29.25 82.5c-8.55 23.85-19.5 31.5-33.75 31.5-5.7 0-13.2-1.2-18-3zm265.05-33h-33v-11.7c-5.7 8.85-13.65 14.7-24 14.7-14.7 0-25.5-12.6-25.5-30V35h34.5v42c0 5.4 2.7 9 6.75 9s6.75-3.6 6.75-9V35h34.5v78zm35.55 3c-10.8 0-18.75-7.5-18.75-18s7.95-18 18.75-18c10.95 0 18.75 7.5 18.75 18s-7.8 18-18.75 18zM791.55 5v30l-9 39h-16.5l-9-39V5h34.5zM600.6 32c27 0 45 16.8 45 42s-18 42-45 42-45-16.8-45-42 18-42 45-42zm0 54c6.3 0 10.5-4.8 10.5-12s-4.2-12-10.5-12-10.5 4.8-10.5 12 4.2 12 10.5 12z"
              />
            </animated.svg>
          </animated.div>
    {/********** END HELLO YOU ***************/}
    {/********** CIRCLE ***************/}
        <animated.div style={
          useSpring({
            to: [{ opacity: 1, transform: 'scale(0.95)' }, { transform: 'scale(1)' }], from: { opacity: 0, transform: 'scale(1.5)' },
            delay: baseDelay + elementsDelay + 250
          })
        }
          className={`absolute`.concat(' ', css({
            left: 0,
            top: "-70px",
          }))}
        >

        <animated.div style={
          useSpring({
            transform: `translateY(${scrollY * -0.6}%) translateX(${0.25 * scrollY * -1}%)`
          })
        }>

            <animated.svg style={{ transform: parallaxProps.xy.interpolate(transn1)}} xmlns="http://www.w3.org/2000/svg" width="45" height="45">
                <defs>
                  <linearGradient id="a" x1="38.355%" x2="50%" y1="-19.876%" y2="119.385%">
                    <stop offset="0%" stopColor="#079BF6" />
                    <stop offset="100%" stopColor="#F82075" />
                  </linearGradient>
                </defs>
                <circle cx="22.5" cy="22.5" r="22.5" fill="url(#a)" fillRule="evenodd" />
              </animated.svg>
            </animated.div>
        </animated.div>
    {/********** END CIRCLE ***************/}
    {/********** TRIANGLE ***************/}
        <animated.div
          className={`absolute`.concat(' ', css({
            top: "30px",
            left: "-30px",
          }))}
          style={
            useSpring({
              to: [{ opacity: 1, transform: 'scale(1) translateY(0) rotate(0deg)' }], from: { opacity: 0, transform: 'scale(1) translateY(15%) rotate(30deg)' },
              delay: baseDelay + elementsDelay + 340
            })
          }
          >
          <animated.div style={
            useSpring({
              transform: `rotate(${scrollY * 0.1}deg) translateY(${scrollY * 0.4}%) translateX(${0.4 * scrollY * -1}%)`
            })
          }>
            <animated.svg style={{ transform: parallaxProps.xy.interpolate(trans1)}} xmlns="http://www.w3.org/2000/svg" width="130" height="78">
              <defs>
                <linearGradient id="b" x1="14.739%" x2="69.409%" y1="32%" y2="56.101%">
                  <stop offset="0%" stopColor="#EEE" />
                  <stop offset="100%" stopColor="#FF0F3E" />
                </linearGradient>
              </defs>
              <path fill="url(#b)" fillRule="evenodd" d="M21.659 0L0 78l130-51.909z" />
            </animated.svg>
          </animated.div>

            </animated.div>
    {/********** END TRIANGLE ***************/}

    {/********** VERTICAL LINE ***************/}
        <animated.div
          style={
            useSpring({
              to: [{ opacity: 1, transform: 'scale(0.95)' }, { transform: 'scale(1)' }], from: { opacity: 0, transform: 'scale(1.5)' },
              delay: baseDelay + elementsDelay + 450
            })
          }
          className={`absolute`.concat(' ', css({
            left: "185px",
            top: "-58px",
            zIndex: -1
          }))}>
          <animated.div style={
            useSpring({
              transform: `translateY(${scrollY * -0.15}%)`
            })
          }>
            <animated.svg style={{ transform: parallaxProps.xy.interpolate(transn2)}} xmlns="http://www.w3.org/2000/svg" width="95" height="227">
              <defs>
                <linearGradient id="c" x1="50%" x2="50%" y1="1.573%" y2="100%">
                  <stop offset="0%" stopColor="#FE529C" />
                  <stop offset="44.093%" stopColor="#F60D54" />
                  <stop offset="100%" stopColor="#FCE559" />
                </linearGradient>
              </defs>
              <path
                fill="url(#c)"
                d="M4.353 225.413a2 2 0 0 1-3.706-1.506l90.5-222.66a2 2 0 0 1 3.706 1.506l-90.5 222.66z"
              />
            </animated.svg>
            </animated.div>
          </animated.div>
        {/********** END VERTICAL LINE***************/}

        {/************** ZIGZAG ********************/}
        <animated.div
          style={{ transform: parallaxProps.xy.interpolate(trans3) }}
          className={`absolute`.concat(' ', css({
            top: "-58px",
            left: "473px",
            zIndex: -1
          }))}>
          <animated.div style={
            useSpring({
              transform: `translateX(${scrollY * 0.05}%)`
            })
          }>
            <animated.svg
            style={
              useSpring({
                to: [{ opacity: 1, width: '267px' }], from: { opacity: 0, width: '0' },
                delay: baseDelay + elementsDelay + 270
              })
            }
        xmlns="http://www.w3.org/2000/svg" width="267" height="120">
              <defs>
                <linearGradient id="d" x1="0%" x2="60.426%" y1="52.453%" y2="51.241%">
                  <stop offset="0%" stopColor="#FF39C4" />
                  <stop offset="100%" stopColor="#5F7CF1" />
                </linearGradient>
              </defs>
              <path
                fill="url(#d)"
                d="M71.76 27.259c-2.35.58-6.473 3.095-12.052 7.51-11.729 9.28-29.473 26.54-53.158 51.725a3.5 3.5 0 0 1-5.1-4.795c23.903-25.417 41.85-42.873 53.915-52.42 6.318-4.999 11.118-7.926 14.716-8.816 5.241-1.295 8.801 1.7 8.801 7.15 0 12.33 1.079 35.961 2.64 52.39.83 8.747 1.785 15.59 2.817 19.944 5.31-11.268 20.2-33.64 34.563-51.903 8.22-10.453 15.475-18.553 20.859-23.091 3.351-2.826 6.064-4.403 8.558-4.57 4.062-.274 6.19 2.834 6.19 7.23 0 11.424 3.106 37.24 7.04 56.644 2.231 11.01 4.62 19.576 6.932 24.564.721 1.555 1.397 2.656 1.888 3.261.04-.056.082-.117.126-.183 1.82-2.725 2.286-3.554 11.671-20.542 7.541-13.65 13.025-23.254 19.102-33.193 8.708-14.243 16.844-26.073 24.585-35.362 14.542-17.454 27.243-25.483 38.4-21.207a3.5 3.5 0 1 1-2.506 6.536c-7.266-2.785-17.774 3.859-30.517 19.152-7.487 8.986-15.445 20.555-23.99 34.532-6.011 9.832-11.451 19.36-18.947 32.927-9.633 17.438-9.982 18.058-11.978 21.046-2.21 3.307-5.368 4.687-8.595 3.038-2.206-1.127-3.936-3.495-5.59-7.06-2.6-5.607-5.11-14.611-7.442-26.118-3.985-19.655-7.125-45.636-7.179-57.72-.816.483-1.931 1.276-3.237 2.377-4.932 4.158-11.919 11.959-19.867 22.066-15.136 19.246-30.985 43.345-34.653 52.661-.61 1.551-1.251 2.736-2.019 3.616-1.257 1.441-3 2.194-4.925 1.627-2.425-.714-3.592-2.802-4.667-6.397-1.396-4.673-2.58-12.605-3.588-23.212-1.582-16.654-2.671-40.506-2.671-53.052 0-.14-.004-.267-.011-.381a5.434 5.434 0 0 0-.11.026z"
              />
            </animated.svg>
        </animated.div>
        </animated.div>
        {/************** END ZIGZAG ********************/}

        {/********** DOUBLE TRIANGLE ***************/}
        <animated.div
          style={
            useSpring({
              to: [{ opacity: 1, transform: 'translateX(0) rotate(0deg)' }], from: { opacity: 0, transform: 'translateX(30px) rotate(90deg)' },
              delay: baseDelay + elementsDelay + 200
            })
          }
          className={`absolute`.concat(' ', css({
            top: "-70px",
            right: 0,
          }))}>
          <animated.div style={
            useSpring({
              transform: `translateX(${scrollY * 0.3}%) translateY(${scrollY * -0.4}%)`
            })
          }>
          <animated.svg style={{ transform: parallaxProps.xy.interpolate(trans2)}} xmlns="http://www.w3.org/2000/svg" width="119" height="96">
              <defs>
                <linearGradient id="e" x1="50%" x2="50%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#06D1BB" />
                  <stop offset="100%" stopColor="#068299" />
                </linearGradient>
              </defs>
              <path
                fill="url(#e)"
                fillRule="evenodd"
                transform="rotate(-168 57.133 50.726)"
                d="M46.467 6.726L.92 81.3l89.393 13.426-29.925-44 52.958-8.7z"
              />
            </animated.svg>
          </animated.div>
          </animated.div>
        {/********** END DOUBLE TRIANGLE ***************/}

        {/********** HORIZONTAL LINE ***************/}
        <animated.div
          style={{ transform: parallaxProps.xy.interpolate(trans4) }}
          className={`absolute overflow-hidden`.concat(' ', css({
            bottom: "18px",
            right: "-12px",
          }))}
        >
          <animated.div style={
            useSpring({
              transform: `translateY(${scrollY * 0.3}%)`
            })
          }>
        <animated.svg style={
            useSpring({
              to: [{ transform: 'translateX(0)' }], from: { transform: 'translateX(-100%)' },
              delay: baseDelay + elementsDelay + 350
            })
          }  xmlns="http://www.w3.org/2000/svg" width="217" height="46">
              <defs>
                <linearGradient id="f" x1="0%" y1="50%" y2="50%">
                  <stop offset="0%" stopColor="#EEEE52" />
                  <stop offset="61.043%" stopColor="#EB58E2" />
                  <stop offset="100%" stopColor="#2EBDFF" />
                </linearGradient>
              </defs>
              <path

                fill="url(#f)"
                fillRule="evenodd"
                transform="rotate(-9 108.103 22.9)"
                d="M-.397 16.899h217v12h-217z"
              />
            </animated.svg>
        </animated.div>
        </animated.div>
        {/********** END HORIZONTAL LINE ***************/}
      </animated.div>
    </animated.div>
})

export default HelloYou