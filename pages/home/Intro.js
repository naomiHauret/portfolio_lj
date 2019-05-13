import React, { memo, useRef, Fragment } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from 'react-spring'

const Intro = memo(
  (props) => {
    const baseDelay = props.appearBaseDelay
    const componentProps = {}
    const [ref, inView] = useInView({
      threshold: 0.5,
    })


    Object.keys(props)
      .filter((prop) => ["children", "appearBaseDelay"].includes(prop) === false)
      .map((p) => (componentProps[p] = props[p]))

      return <Fragment>
      <animated.h1 ref={ref} style={
          useSpring({
            to: [{ opacity: 1, transform: 'translateY(0)' }],
            from: { opacity: 0, transform: 'translateY(10%)' },
            delay: baseDelay
          },)
      } {...componentProps}>
        {props.children}
      </animated.h1>
    </Fragment>
  }
)

export default Intro