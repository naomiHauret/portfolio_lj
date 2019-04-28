import { useAsyncEndpoint } from "utils/useAsyncEndpoint"
import { MAILER_KEY } from "utils/config"

export function useSendMail() {
  return useAsyncEndpoint((data) => ({
    url: `https://www.enformed.io/${MAILER_KEY}`,
    params: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    },
  }))
}
