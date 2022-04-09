import React from 'react'
import './Registration.scss'

const Registration = () => {
  return (
    <div className="registration-container">
      <span className="registration-title">Create new account</span>
      <form action="#" method="post" className="registration-form">
        <label htmlFor="UserName" className="registration-label">
          Username
        </label>
        <input
          type="text"
          name="Username"
          id="UserName"
          className="registration-input"
          placeholder="Username"
        />
        <label htmlFor="EmailAdress" className="registration-label">
          EmailAdress
        </label>
        <input
          type="email"
          name="EmailAdress"
          id="EmailAdress"
          className="registration-input"
          placeholder="EmailAdress"
        />
        <label htmlFor="Password" className="registration-label">
          Password
        </label>
        <input
          type="password"
          name="Password"
          id="Password"
          className="registration-input"
          placeholder="Password"
        />
        <label htmlFor="repeat_password" className="registration-label">
          Repeat password
        </label>
        <input
          type="password"
          name="Password"
          id="repeat_password"
          className="registration-input"
          placeholder="Password"
        />
        <hr />
        <input
          type="checkbox"
          className="registration-agreement"
          id="agreement"
          // checked
        />
        <label htmlFor="agreement" className="checkbox-label">
          I agree to the processing of my personal information
        </label>
        <input
          type="submit"
          className="registration-send-form"
          value="Create"
        />
        <span>
          Already have an account?
          <a href="#">Sign In.</a>
        </span>
      </form>
    </div>
  )
}

export default Registration
