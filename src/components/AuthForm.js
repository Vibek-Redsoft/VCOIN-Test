import React, { useRef, useState, useEffect } from 'react';

import "./AuthForm.scss";

function AuthForm(props) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { closeModal, login, modalState, type, awaiting } = props

  async function handleSubmit(e) {
    e.preventDefault()
    
    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      if(closeModal) closeModal()
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  useEffect(() => {
    modalState && emailRef.current.focus()
  }, [modalState])

  if(!modalState && type !== 'view')
    return null

  return (
    <div className="login-modal">
      <div className={`login-form flex ai-center column ${loading || awaiting ? 'awaiting' : 'ready'}`} >
        {type !== 'view' ? <span role="button" className="close-button" onClick={() => props.closeModal()}>
          <picture>
            <source srcSet="images/close-icon.webp" type="image/webp" />
            <img src="images/close-icon.png" alt="Close" role="button" />
          </picture>
        </span> : null}
        <img className="logo" src="images/vcoin-logo.svg" alt="VCOIN Logo"/>
        <h2 className="login-title">Log in</h2>
        <form action="#" className="flex column ai-center w100" onSubmit={handleSubmit}>
          {error &&  <p className="error">{error}</p>}
          <div className="input-container">
            <input {...loading & 'disabled'} type="email" name="email" id="form-email" placeholder="e-mail" ref={emailRef} required />
            <span className="focus-input"></span>
          </div>
          <div className="input-container">
            <input {...loading & 'disabled'} type="password" name="password" id="form-password" placeholder="password" ref={passwordRef} required />
            <span className="focus-input"></span>
          </div>
          {/* <Link to="/">Forgot password</Link> */}
          <input {...loading & 'disabled'} type="submit" value="Log in" className="submit-button"/>
        </form>
      </div>
      <div className="login-bg" onClick={closeModal}>
        <picture>
          <source srcSet="images/login-bg.webp" type="image/webp" />
          <img src="images/login-bg.png" alt="login background" />
        </picture>
      </div>
      <div className="overlay" onClick={closeModal}></div>
    </div>
  )
}

export default AuthForm;
