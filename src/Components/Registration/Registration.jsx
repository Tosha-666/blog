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
        <label htmlFor="Password" className="registration-label">
          Repeat password
        </label>
        <input
          type="password"
          name="Password"
          id="Password"
          className="registration-input"
          placeholder="Password"
        />
      </form>
    </div>
  )
}

export default Registration
