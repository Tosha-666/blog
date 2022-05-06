import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import './SignUp.scss'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { setUser } from '../../store/userSlice'
import { api } from '../../../api'

const SignUp = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const schema = yup
    .object({
      userName: yup
        .string()
        .required('Username is required')
        .min(3, 'Your username needs to be at least 3 characters')
        .max(20, 'Your username needs to be not more 20 characters'),
      emailAddress: yup
        .string()
        .matches(
          /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
          'Enter valid email'
        )

        .min(3, 'must be at least 3 characters long')
        .email('must be a valid email'),
      password: yup
        .string()
        .required('Password is required')
        .min(6, 'Your password needs to be at least 6 characters')
        .max(40, 'Your password needs to be not more 40 characters'),
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

  const registrationUser = async (registrationData) => {
    console.log(registrationData)
    const regData = await api.post('api/users', {
      user: {
        username: registrationData.userName,
        email: registrationData.emailAddress,
        password: registrationData.password,
      },
    })

    dispatch(setUser(regData.data.user))
    navigate('/')
    console.log(regData)
    reset()
  }
  // const onSubmit = (data) => {
  //   console.log(data)
  //   reset()
  // }
  return (
    <div className="registration-container">
      <h1 className="registration-title">Create new account</h1>
      <form
        action="#"
        method="post"
        className="registration-form"
        onSubmit={handleSubmit(registrationUser)}
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
          {...register('userName')}
        />
        <div className="registration-error">
          {' '}
          {errors?.userName && <p>{errors?.userName?.message}</p>}
        </div>

        <label htmlFor="EmailAddress" className="registration-label">
          Email Address
        </label>
        <input
          type="email"
          name="EmailAddress"
          id="EmailAdress"
          className={`registration-input ${
            errors.emailAddress ? 'is-invalid' : ''
          }`}
          placeholder="Email Address"
          {...register('emailAddress')}
        />
        <div className="registration-error">
          {' '}
          {errors?.emailAddress && <p>{errors?.emailAddress?.message}</p>}
        </div>
        <label htmlFor="Password" className="registration-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="Password"
          className={`registration-input ${
            errors.password ? 'is-invalid' : ''
          }`}
          placeholder="Password"
          {...register('password')}
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
          className={`registration-input ${
            errors.passwordConfirm ? 'is-invalid' : ''
          }`}
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
          <Link to="/authentification/">Sign In</Link>
          {/* <a href="#">Sign In.</a> */}
        </span>
      </form>
    </div>
  )
}

export default SignUp
