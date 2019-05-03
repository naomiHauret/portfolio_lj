import { ANALYTICS } from "utils/config"

export const trackPageView = (url) => {
  try {
    window.gtag("config", `"${ANALYTICS}"`, {
      page_location: url,
    })
  } catch (error) {
    // silences the error in dev mode
    // and/or if gtag fails to load
  }
}
