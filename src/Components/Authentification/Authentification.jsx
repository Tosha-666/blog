import React from 'react'
import './Authentification.scss'

const Authentification = () => {
  return (
    <div className="authentification-container">
      <span className="authentification-title">Create new account</span>
      <form action="#" method="post" className="authentification-form">
        <label htmlFor="EmailAdress" className="authentification-label">
          Email address
        </label>
        <input
          type="email"
          name="EmailAdress"
          id="EmailAdress"
          className="authentification-input"
          placeholder="EmailAdress"
        />
        <label htmlFor="Password" className="authentification-label">
          Password
        </label>
        <input
          type="password"
          name="Password"
          id="Password"
          className="authentification-input"
          placeholder="Password"
        />

        <input
          type="submit"
          className="authentification-send-form"
          value="Create"
        />
        <span>
          Don’t have an account?
          <a href="#">Sign Up.</a>
        </span>
      </form>
    </div>
  )
}

export default Authentification
