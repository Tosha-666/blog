import React from 'react'
import { useForm } from 'react-hook-form'
import './Registration.scss'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const Registration = () => {
  const schema = yup
    .object({
      password: yup
        .string()
        .required('Password is required')
        .min(6, 'Your password needs to be at least 6 characters')
        .max(20, 'Your username needs to be not more 20 characters'),
      passwordConfirm: yup
        .string()
        .required('Password confirm  required')
        .oneOf([yup.ref('password')], 'Passwords must match'),
    })
    .shape({
      registrationAgreement: yup.bool().oneOf([true], 'Accept is required'),
    })
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) })

  const onSubmit = (data) => {
    console.log(data)
    reset()
  }
  return (
    <div className="registration-container">
      <h1 className="registration-title">Create new account</h1>
      <form
        action="#"
        method="post"
        className="registration-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="UserName" className="registration-label">
          Username
        </label>
        <input
          type="text"
          name="Username"
          id="UserName"
          className={`registration-input ${
            errors.userName ? 'is-invalid' : ''
          }`}
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
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
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
          name="password"
          id="Password"
          className="registration-input"
          placeholder="Password"
          {...register('password', {
            required: true,
            maxLength: {
              value: 20,
              message: 'Your password needs to be not more 20 characters',
            },
            minLength: {
              value: 6,
              message: 'Your password needs to be at least 6 characters',
            },
          })}
        />
        <div className="registration-error">
          {' '}
          {errors?.password && <p>{errors?.password?.message}</p>}
        </div>
        <label htmlFor="repeat_password" className="registration-label">
          Repeat password
        </label>
        <input
          type="password"
          name="passwordConfirm"
          id="repeat_password"
          className="registration-input"
          placeholder="Password"
          {...register('passwordConfirm')}
        />
        <div className="registration-error">
          {' '}
          {errors?.passwordConfirm && <p>{errors?.passwordConfirm?.message}</p>}
        </div>
        <hr />
        <input
          type="checkbox"
          className="registration-agreement"
          name="registrationAgreement"
          id="agreement"
          {...register('registrationAgreement')}
          // checked
        />
        <label htmlFor="agreement" className="checkbox-label">
          I agree to the processing of my personal information
        </label>
        <div className="registration-error">
          {' '}
          {errors?.registrationAgreement && (
            <p>{errors?.registrationAgreement?.message}</p>
          )}
        </div>
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
