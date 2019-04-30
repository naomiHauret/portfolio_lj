const pxTo = require("design-system-utils").pxTo
const ds = require("./styles/tokens/index.js").ds
const colors = require("./styles/tokens/index.js").colorPalette
const fontFamilies = require("./styles/tokens/index.js").fontFamilies
const fontWeights = require("./styles/tokens/index.js").fontWeights
const fontSizes = require("./styles/tokens/index.js").fontSizes
const shadows = ds.get("shadows")

const baseFontSize = ds.get("type.baseFontSize")
const columns = ds.get("grid.columns.number")
const widths = {}
const paddings = {}
const margins = {}
for (let index = 1; index < columns + 1; index++) {
  widths[`${index}/${columns}`] = `${(index / columns) * 100}%`
  paddings[`${index}/${columns}`] = `${(index / columns) * 100}%`
  margins[`${index}/${columns}`] = `${(index / columns) * 100}%`
}
const fsizes = {}
Object.keys(fontSizes).map((size) => (fsizes[size] = pxTo(ds.get(`type.sizes.${size}`), baseFontSize, "rem")))

/*
Tailwind - The Utility-First CSS Framework
View the full documentation at https://tailwindcss.com.
*/

/*
|-------------------------------------------------------------------------------
| Colors                                    https://tailwindcss.com/docs/colors
|-------------------------------------------------------------------------------
*/

module.exports = {
  customMedia: {
    "--screen-sm-below": `(max-width: ${pxTo(ds.get("breakpoints.sm") - 1, baseFontSize, "rem")})`,
    "--screen-mobile": `(max-width: ${pxTo(ds.get("breakpoints.md") - 1, baseFontSize, "rem")})`,
    "--screen-sm": `(min-width: ${pxTo(ds.get("breakpoints.sm"), baseFontSize, "rem")})`,
    "--screen-md": `(min-width: ${pxTo(ds.get("breakpoints.md"), baseFontSize, "rem")})`,
    "--screen-lg": `(min-width: ${pxTo(ds.get("breakpoints.lg"), baseFontSize, "rem")})`,
    "--screen-xl": `(min-width: ${pxTo(ds.get("breakpoints.xl"), baseFontSize, "rem")})`,
  },

  /*
  |-----------------------------------------------------------------------------
  | Colors                                  https://tailwindcss.com/docs/colors
  |-----------------------------------------------------------------------------
  */

  colors,

  /*
  |-----------------------------------------------------------------------------
  | Screens                      https://tailwindcss.com/docs/responsive-design
  |-----------------------------------------------------------------------------
  | Class name: .{screen}:{utility}
  */

  screens: {
    xs: 0,
    sm: pxTo(ds.get("breakpoints.sm"), baseFontSize, "rem"),
    md: pxTo(ds.get("breakpoints.md"), baseFontSize, "rem"),
    lg: pxTo(ds.get("breakpoints.lg"), baseFontSize, "rem"),
    xl: pxTo(ds.get("breakpoints.lg"), baseFontSize, "rem"),
  },

  /*
  |-----------------------------------------------------------------------------
  | Fonts                                    https://tailwindcss.com/docs/fonts
  |-----------------------------------------------------------------------------
  | Class name: .font-{name}
  */

  fonts: {
    unset: ["unset"],
    "family-inherit": ["inherit"],
    base: fontFamilies.base.split(),
  },

  /*
  |-----------------------------------------------------------------------------
  | Text sizes                         https://tailwindcss.com/docs/text-sizing
  |-----------------------------------------------------------------------------
  | Class name: .text-{size}
  */

  textSizes: {
    inherit: "inherit",
    px: `${ds.get("type.sizes.base")}px`, // 16px

    // rem conversion
    ...fsizes,
  },

  /*
  |-----------------------------------------------------------------------------
  | Font weights                       https://tailwindcss.com/docs/font-weight
  |-----------------------------------------------------------------------------
  | Class name: .font-{weight}
  */

  fontWeights: {
    ...fontWeights,
  },

  /*
  |-----------------------------------------------------------------------------
  | Leading (line height)              https://tailwindcss.com/docs/line-height
  |-----------------------------------------------------------------------------
  | Class name: .leading-{size}
  */

  leading: {
    13: pxTo(13, baseFontSize, "rem"),
    20: pxTo(20, baseFontSize, "rem"),
    23: pxTo(23, baseFontSize, "rem"),
    30: pxTo(30, baseFontSize, "rem"),
    32: pxTo(32, baseFontSize, "rem"),
    40: pxTo(40, baseFontSize, "rem"),
    50: pxTo(50, baseFontSize, "rem"),
  },

  /*
  |-----------------------------------------------------------------------------
  | Tracking (letter spacing)       https://tailwindcss.com/docs/letter-spacing
  |-----------------------------------------------------------------------------
  | Class name: .tracking-{size}
  */

  tracking: {
    0: 0,
    default: pxTo(0.73, baseFontSize, "rem"),
  },

  /*
  |-----------------------------------------------------------------------------
  | Text colors                         https://tailwindcss.com/docs/text-color
  |-----------------------------------------------------------------------------
  | Class name: .text-{color}
  */

  textColors: colors,

  /*
  |-----------------------------------------------------------------------------
  | Background colors             https://tailwindcss.com/docs/background-color
  |-----------------------------------------------------------------------------
  | Class name: .bg-{color}
  */

  backgroundColors: colors,

  /*
  |-----------------------------------------------------------------------------
  | Background sizes               https://tailwindcss.com/docs/background-size
  |-----------------------------------------------------------------------------
  | Class name: .bg-{size}
  */

  backgroundSize: {},

  /*
  |-----------------------------------------------------------------------------
  | Border widths                     https://tailwindcss.com/docs/border-width
  |-----------------------------------------------------------------------------
  | Class name: .border{-side?}{-width?}
  */

  borderWidths: {
    0: "0",
    ...ds.get("borderWidths"),
  },

  /*
  |-----------------------------------------------------------------------------
  | Border colors                     https://tailwindcss.com/docs/border-color
  |-----------------------------------------------------------------------------
  | Class name: .border-{color}
  */

  borderColors: {
    ...colors,
  },

  /*
  |-----------------------------------------------------------------------------
  | Border radius                    https://tailwindcss.com/docs/border-radius
  |-----------------------------------------------------------------------------
  | Class name: .rounded{-side?}{-size?}
  */

  borderRadius: {
    none: "0",
    full: "9999px",
  },

  /*
  |-----------------------------------------------------------------------------
  | Width                                    https://tailwindcss.com/docs/width
  |-----------------------------------------------------------------------------
  | Class name: .w-{size}
  */

  width: {
    auto: "auto",
    0: "0",
    1: pxTo(1, baseFontSize, "rem"),
    5: pxTo(5, baseFontSize, "rem"),
    10: pxTo(10, baseFontSize, "rem"),
    12: pxTo(12, baseFontSize, "rem"),
    15: pxTo(15, baseFontSize, "rem"),
    30: pxTo(30, baseFontSize, "rem"),
    40: pxTo(40, baseFontSize, "rem"),
    50: pxTo(50, baseFontSize, "rem"),
    80: pxTo(80, baseFontSize, "rem"),
    150: pxTo(150, baseFontSize, "rem"),
    screen: "100vw",
    full: "100%",
    ...widths,
  },

  /*
  |-----------------------------------------------------------------------------
  | Height                                  https://tailwindcss.com/docs/height
  |-----------------------------------------------------------------------------
  | Class name: .h-{size}
  */

  height: {
    0: "0",
    1: pxTo(1, baseFontSize, "rem"),
    2: pxTo(2, baseFontSize, "rem"),
    30: pxTo(30, baseFontSize, "rem"),
    40: pxTo(40, baseFontSize, "rem"),
    170: pxTo(170, baseFontSize, "rem"),
    200: pxTo(200, baseFontSize, "rem"),
    full: "100%",
    screen: "100vh",
  },

  /*
  |-----------------------------------------------------------------------------
  | Minimum width                        https://tailwindcss.com/docs/min-width
  |-----------------------------------------------------------------------------
  | Class name: .min-w-{size}
  */

  minWidth: {
    0: "0",
    full: "100%",
    ...widths,
  },

  /*
  |-----------------------------------------------------------------------------
  | Minimum height                      https://tailwindcss.com/docs/min-height
  |-----------------------------------------------------------------------------
  | Class name: .min-h-{size}
  */

  minHeight: {
    0: "0",
    full: "100%",
    screen: "100vh",
  },

  /*
  |-----------------------------------------------------------------------------
  | Maximum width                        https://tailwindcss.com/docs/max-width
  |-----------------------------------------------------------------------------
  | Class name: .max-w-{size}
  */

  maxWidth: {
    0: "0",
    145: pxTo(145, baseFontSize, "rem"),
    300: pxTo(300, baseFontSize, "rem"),
    600: pxTo(600, baseFontSize, "rem"),
    sm: pxTo(ds.get("grid.width.sm"), baseFontSize, "rem"),
    md: pxTo(ds.get("grid.width.md"), baseFontSize, "rem"),
    lg: pxTo(ds.get("grid.width.lg"), baseFontSize, "rem"),
    xl: pxTo(ds.get("grid.width.xl"), baseFontSize, "rem"),
    full: "100%",
    ...widths,
  },

  /*
  |-----------------------------------------------------------------------------
  | Maximum height                      https://tailwindcss.com/docs/max-height
  |-----------------------------------------------------------------------------
  | Class name: .max-h-{size}
  */

  maxHeight: {
    0: "0",
    full: "100%",
    screen: "100vh",
  },

  /*
  |-----------------------------------------------------------------------------
  | Padding                                https://tailwindcss.com/docs/padding
  |-----------------------------------------------------------------------------
  | Class name: .p{side?}-{size}
  */

  padding: {
    unset: "unset",
    0: "0",
    2: pxTo(2, baseFontSize, "rem"),
    5: pxTo(5, baseFontSize, "rem"),
    10: pxTo(10, baseFontSize, "rem"),
    15: pxTo(15, baseFontSize, "rem"),
    20: pxTo(20, baseFontSize, "rem"),
    25: pxTo(25, baseFontSize, "rem"),
    30: pxTo(30, baseFontSize, "rem"),
    40: pxTo(40, baseFontSize, "rem"),
    50: pxTo(50, baseFontSize, "rem"),
    60: pxTo(60, baseFontSize, "rem"),
    70: pxTo(70, baseFontSize, "rem"),
    80: pxTo(80, baseFontSize, "rem"),
    90: pxTo(90, baseFontSize, "rem"),
    100: pxTo(100, baseFontSize, "rem"),
    120: pxTo(120, baseFontSize, "rem"),
    150: pxTo(150, baseFontSize, "rem"),
    200: pxTo(200, baseFontSize, "rem"),
    250: pxTo(250, baseFontSize, "rem"),
    ...paddings,
  },

  /*
  |-----------------------------------------------------------------------------
  | Margin                                  https://tailwindcss.com/docs/margin
  |-----------------------------------------------------------------------------
  | Class name: .m{side?}-{size}
  */

  margin: {
    unset: "unset",
    auto: "auto",
    0: "0",
    2: pxTo(2, baseFontSize, "rem"),
    5: pxTo(5, baseFontSize, "rem"),
    10: pxTo(10, baseFontSize, "rem"),
    15: pxTo(15, baseFontSize, "rem"),
    20: pxTo(20, baseFontSize, "rem"),
    25: pxTo(25, baseFontSize, "rem"),
    30: pxTo(30, baseFontSize, "rem"),
    35: pxTo(35, baseFontSize, "rem"),
    40: pxTo(40, baseFontSize, "rem"),
    50: pxTo(50, baseFontSize, "rem"),
    60: pxTo(60, baseFontSize, "rem"),
    70: pxTo(70, baseFontSize, "rem"),
    75: pxTo(75, baseFontSize, "rem"),
    80: pxTo(80, baseFontSize, "rem"),
    90: pxTo(90, baseFontSize, "rem"),
    100: pxTo(100, baseFontSize, "rem"),
    120: pxTo(120, baseFontSize, "rem"),
    200: pxTo(200, baseFontSize, "rem"),
    250: pxTo(250, baseFontSize, "rem"),
    ...margins,
  },

  /*
  |-----------------------------------------------------------------------------
  | Negative margin                https://tailwindcss.com/docs/negative-margin
  |-----------------------------------------------------------------------------
  | Class name: .-m{side?}-{size}
  */

  negativeMargin: {
    unset: "unset",
    px: "1px",
    0: "0",
    2: pxTo(2, baseFontSize, "rem"),
    5: pxTo(5, baseFontSize, "rem"),
    10: pxTo(10, baseFontSize, "rem"),
    15: pxTo(15, baseFontSize, "rem"),
    20: pxTo(20, baseFontSize, "rem"),
    25: pxTo(25, baseFontSize, "rem"),
    30: pxTo(30, baseFontSize, "rem"),
    40: pxTo(40, baseFontSize, "rem"),
    50: pxTo(50, baseFontSize, "rem"),
    60: pxTo(60, baseFontSize, "rem"),
    100: pxTo(100, baseFontSize, "rem"),
  },

  /*
  |-----------------------------------------------------------------------------
  | Shadows                                https://tailwindcss.com/docs/shadows
  |-----------------------------------------------------------------------------
  | Class name: .shadow-{size?}
  */

  shadows: {
    ...shadows,
  },

  /*
  |-----------------------------------------------------------------------------
  | Z-index                                https://tailwindcss.com/docs/z-index
  |-----------------------------------------------------------------------------
  | Class name: .z-{index}
  */

  zIndex: {
    0: 0,
    1: 1,
    5: 5,
    10: 10,
  },

  /*
  |-----------------------------------------------------------------------------
  | Opacity                                https://tailwindcss.com/docs/opacity
  |-----------------------------------------------------------------------------
  | Class name: .opacity-{name}
  */

  opacity: {
    0: "0",
    50: ".5",
    100: "1",
  },

  /*
  |-----------------------------------------------------------------------------
  | SVG fill                                   https://tailwindcss.com/docs/svg
  |-----------------------------------------------------------------------------
  | Class name: .fill-{name}
  */

  svgFill: {},

  /*
  |-----------------------------------------------------------------------------
  | SVG stroke                                 https://tailwindcss.com/docs/svg
  |-----------------------------------------------------------------------------
  | Class name: .stroke-{name}
  */

  svgStroke: {},

  /*
  |-----------------------------------------------------------------------------
  | Modules                  https://tailwindcss.com/docs/configuration#modules
  |-----------------------------------------------------------------------------
  |
  | Here is where you control which modules are generated and what variants are
  | generated for each of those modules.
  |
  | Currently supported variants:
  |   - responsive
  |   - hover
  |   - focus
  |   - active
  |   - group-hover
  |
  | To disable a module completely, use `false` instead of an array.
  |
  */

  modules: {
    appearance: ["responsive"],
    backgroundAttachment: false,
    backgroundColors: ["responsive", "hover", "focus", "focus-within"],
    backgroundPosition: false,
    backgroundRepeat: false,
    backgroundSize: false,
    borderCollapse: false,
    borderColors: ["responsive", "hover", "focus"],
    borderRadius: ["responsive"],
    borderStyle: ["responsive"],
    borderWidths: ["responsive"],
    cursor: ["responsive"],
    display: ["responsive"],
    flexbox: ["responsive"],
    float: false,
    fonts: ["responsive"],
    fontWeights: ["responsive", "hover", "focus"],
    height: ["responsive"],
    leading: ["responsive"],
    lists: ["responsive"],
    margin: ["responsive"],
    maxHeight: ["responsive"],
    maxWidth: ["responsive"],
    minHeight: ["responsive"],
    minWidth: ["responsive"],
    negativeMargin: ["responsive"],
    opacity: ["responsive", "hover", "focus"],
    outline: ["focus"],
    overflow: ["responsive"],
    padding: ["responsive"],
    pointerEvents: ["responsive"],
    position: ["responsive"],
    resize: false,
    shadows: ["responsive", "hover", "focus"],
    svgFill: false,
    svgStroke: false,
    tableLayout: false,
    textAlign: ["responsive"],
    textColors: ["responsive", "hover", "focus"],
    textSizes: ["responsive"],
    textStyle: ["responsive", "hover", "focus"],
    tracking: ["responsive"],
    userSelect: ["responsive"],
    verticalAlign: false,
    visibility: false,
    whitespace: false,
    width: ["responsive"],
    zIndex: ["responsive"],
  },

  /*
  |-----------------------------------------------------------------------------
  | Plugins                                https://tailwindcss.com/docs/plugins
  |-----------------------------------------------------------------------------
  |
  | Here is where you can register any plugins you'd like to use in your
  | project. Tailwind's built-in `container` plugin is enabled by default to
  | give you a Bootstrap-style responsive container component out of the box.
  |
  | Be sure to view the complete plugin documentation to learn more about how
  | the plugin system works.
  |
  */

  plugins: [
    require("tailwindcss/plugins/container")({
      // center: true,
      // padding: '1rem',
    }),
  ],

  /*
  |-----------------------------------------------------------------------------
  | Advanced Options         https://tailwindcss.com/docs/configuration#options
  |-----------------------------------------------------------------------------
  |
  | Here is where you can tweak advanced configuration options. We recommend
  | leaving these options alone unless you absolutely need to change them.
  |
  */

  options: {
    prefix: "",
    important: false,
    separator: ":",
  },
}
