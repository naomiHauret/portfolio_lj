import React, { memo } from "react"
import { useMediaQuery } from "react-responsive"
import Button from "components/Button"
import { ds } from "styles/tokens"
import Translate from "components/Translate"

const ViewerPDF = memo((props) => {
  const isLargeScreen = useMediaQuery({
    query: `(min-width: ${ds.get("breakpoints.sm")}px)`,
  })
  const { src } = props
  if (isLargeScreen) {
    return (
      <>
        <embed
          src={src}
          className="sm:min-h-60vh md:min-h-65vh lg:min-h-70vh"
          type="application/pdf"
          width="100%"
        ></embed>
        <a className="block text-center mb-20 text-13" href={src} target="_blank">
          <Translate id="pages.work.openPDF" />
        </a>
      </>
    )
  }
  return (
    <Button tagType="a" href={src} target="_blank">
      <Translate id="pages.work.openPDF" />
    </Button>
  )
})

export default ViewerPDF
