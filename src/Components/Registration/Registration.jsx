import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import './Registration.scss'

const Registration = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur' })

  const [repeatPassword, setRepeatPassword] = useState('')
  return (
    <div className="registration-container">
      <h1 className="registration-title">Create new account</h1>
      <form
        action="#"
        method="post"
        className="registration-form"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <label htmlFor="UserName" className="registration-label">
          Username
        </label>
        <input
          type="text"
          name="Username"
          id="UserName"
          className="registration-input"
          placeholder="Username"
          {...register('userName', {
            required: true,
            maxLength: {
              value: 20,
              message: 'Your username needs to be not more 20 characters',
            },
            minLength: {
              value: 3,
              message: 'Your username needs to be at least 10 characters',
            },
          })}
        />
        <div className="registration-error">
          {' '}
          {errors?.userName && <p>{errors?.userName?.message}</p>}
          {errors?.userName?.type === 'required' && (
            <p>This field is required</p>
          )}
        </div>

        <label htmlFor="EmailAddress" className="registration-label">
          Email Address
        </label>
        <input
          type="email"
          name="EmailAddress"
          id="EmailAdress"
          className="registration-input"
          placeholder="Email Address"
          {...register('emailAddress', {
            required: true,
            pattern: /\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*\\.\\w{2,4}/,
          })}
        />
        <div className="registration-error">
          {' '}
          {errors?.emailAddress?.type === 'pattern' && (
            <p>Enter valid Email Address</p>
          )}
        </div>
        <label htmlFor="Password" className="registration-label">
          Password
        </label>
        <input
          type="password"
          name="Password"
          id="Password"
          className="registration-input"
          placeholder="Password"
          {...register('password')}
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
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
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
