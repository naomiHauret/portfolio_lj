import React, { memo, Fragment, useState, useEffect, createRef } from "react"
import Translate from "components/Translate"
import Input from "./Input"
import { MAIL_TARGET, CAPTCHA_KEY_WEBSITE } from "utils/config"
import { useInView } from "react-intersection-observer"
import { useSpring, animated } from "react-spring"
import Button from "components/Button"
import styles from "./styles.local.css"
import { MAILER_KEY } from "utils/config"
import {useApiRequest, PENDING, SUCCESS, ERROR} from "./hooks"
import ReCAPTCHA from "react-google-recaptcha"

const FormContact = memo((props) => {
  // Initial state
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    message: "",
  })
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const recaptchaRef = createRef()
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  const [{ status, response }, makeRequest] = useApiRequest(
    `https://www.enformed.io/${MAILER_KEY}`,
    {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sender: formData.name.trim(),
          email: formData.mail.trim(),
          message: formData.message.trim(),
          "*reply": "email",
          "*subject": "Nouveau mail",
          "*default_email": MAIL_TARGET,
        }),
    }
  )


  // componentDidUpdate
  useEffect(() => {

    if (
      recaptchaRef.current.getValue() !== "" &&
      document.forms["sendEmail"].elements["*honeypot"].value === "" &&
      document.forms["sendEmail"].elements["*nutellajar"].value === "" &&
      document.forms["sendEmail"].elements["jamjar"].value === "" &&
      document.forms["sendEmail"].checkValidity() &&
      formData.name.trim() !== "" &&
      formData.mail.trim() !== "" &&
      formData.message.trim() !== ""
    ) {
      setSubmitDisabled(false)
    } else {
      setSubmitDisabled(true)
    }
  })
  
  const handleSubmit = (e) => {
    e.preventDefault()  
    makeRequest()
    setFormData({
      name: "",
      mail: "",
      message: "",  
    })
    return
  }
  
  const buttonLabel =  ( formData.name.trim() !== "" ||
  formData.mail.trim() !== "" ||
  formData.message.trim() !== "") ? "submit" : status === PENDING ? "pending" : status === SUCCESS ? "success" : status === ERROR ? "error" : "submit"
  return (
    <Fragment>
      <animated.form
        ref={ref}
        className={styles.form}
        name="sendEmail"
        role="form"
        onSubmit={handleSubmit}
        style={useSpring({
          delay: 350,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          opacity: inView ? 1 : 0,
        })}
      >
        <fieldset className={`${styles.wrapper} ${(formData.mail !== "") ? styles.wrapperVisible : styles.wrapperHidden}`}>
          <legend className="text-blue text-20 sm:text-35 font-bold mb-35">
            <Translate id="formContact.legend" />
          </legend>
          <div className="mb-40 sm:mb-50">
            <Input
              handleChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              value={formData.name}
              label={<Translate id="formContact.fields.name" />}
              name="fc_name"
              type="text"
              tagType="input"
              pattern=".{3,50}"
              minLength="3"
              maxLength="50"
              size="50"
              placeholder=" "
            />
          </div>
          <div className="mb-60 md:mb-40">
            <Input
              handleChange={(e) =>
                setFormData({
                  ...formData,
                  mail: e.target.value,
                })
              }
              value={formData.mail}
              label={<Translate id="formContact.fields.mail" />}
              name="fc_email"
              type="email"
              tagType="input"
              pattern=".{5,45}"
              maxLength="45"
              minLength="5"
              size="45"
              placeholder="        @"
              pattern="[^@\s]+@[^@\s]+"
            />
          </div>
          <div className="mb-60 md:mb-40">
            <Input
              handleChange={(e) =>
                setFormData({
                  ...formData,
                  message: e.target.value,
                })
              }
              value={formData.message}
              label={<Translate id="formContact.fields.message" />}
              name="fc_message"
              tagType="textarea"
              minLength="5"
              maxLength="250"
              placeholder=" "
            />
          </div>
        </fieldset>
        <input type="hidden" name="*reply" value="email" />
        <input type="hidden" name="*subject" value="Lucas, un nouveau mail envoyé depuis ton site !" />
        <input type="hidden" name="*honeypot" />
        <input type="hidden" name="*nutellajar" />
        <input type="hidden" name="jamjar" />

        <ReCAPTCHA
            style={{ display: "flex", justifyContent: 'center' }}
            ref={recaptchaRef}
            sitekey={CAPTCHA_KEY_WEBSITE}
          />
        <Button
          additionalStyles={`${submitDisabled === true ? "opacity-50" : "opacity-100"} mt-30 sm:mt-60 mb-50 sm:mb-80 mx-auto`}
          type="submit"
          disabled={submitDisabled}
        >
          
          <Translate id={`formContact.${buttonLabel}`} />
        </Button>
      </animated.form>
    </Fragment>
  )
})

export default FormContact
