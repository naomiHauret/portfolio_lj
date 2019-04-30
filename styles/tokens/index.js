const colors = require("./colors").default
const fontFamilies = require("./fontFamilies").default
const fontSizes = require("./fontSizes").default
const fontWeights = require("./fontWeights").default
const DesignSystem = require("design-system-utils").default
const pxTo = require("design-system-utils").pxTo

const pxFontSize = {
  base: fontSizes.base,
}

const colorPalette = {
  transparent: "transparent",
  ...colors,
}

const myDesignSystem = {
  grid: {
    columns: {
      number: 12,
      width: 45,
      gutter: 35,
    },
    width: {
      xs: "100%",
      sm: 750,
      md: 965,
      lg: 965,
      xl: 965,
    },
  },
  breakpoints: {
    xs: 480,
    sm: 720,
    md: 991,
    lg: 1024,
    xl: 1260,
  },
  type: {
    sizes: fontSizes,
    fontFamily: fontFamilies,
    fontWeight: fontWeights,
  },
  colors: {
    ...colorPalette,
  },
  borderWidths: {
    1: pxTo(1, pxFontSize.base, "rem"),
    2: pxTo(2, pxFontSize.base, "rem"),
    3: pxTo(3, pxFontSize.base, "rem"),
  },
  shadows: {
    default: `0 ${pxTo(2, pxFontSize.base, "rem")} ${pxTo(4, pxFontSize.base, "rem")} 0 rgba(0,0,0,0.2)`,
  },
}

const ds = new DesignSystem(myDesignSystem, {
  useModularScale: true,
  fontSizeUnit: "rem",
})

module.exports = {
  ds,
  colorPalette,
  fontFamilies,
  fontWeights,
  fontSizes,
}
