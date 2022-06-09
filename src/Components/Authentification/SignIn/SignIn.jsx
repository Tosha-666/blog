import React from 'react'
import cookie from 'cookie_js'
import './SignIn.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { setUser, setLoading } from '../../store/userSlice'
import { loginUser } from '../../../api'

const SignIn = () => {
  const isAuth = useSelector((state) => state.user.isAuthorized)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const schema = yup.object({
    emailAddress: yup
      .string()
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, 'Enter valid email')
      .min(3, 'must be at least 3 characters long')
      .email('must be a valid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Your password needs to be at least 6 characters')
      .max(40, 'Your password needs to be not more 40 characters'),
  })
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) })

  const registrationUser = async (registrationData) => {
    dispatch(setLoading(true))
    const loginData = await loginUser(registrationData)
    dispatch(setUser(loginData))
    dispatch(setLoading(false))
    console.log(loginData)
    cookie.set('tokBlog', loginData.token, {
      expires: 7,
    })
    navigate('/')
    reset()
  }
  return (
    <div className="authentification-container">
      <h1 className="authentification-title">Sign In</h1>
      <form
        action="#"
        method="post"
        className="authentification-form"
        onSubmit={handleSubmit(registrationUser)}
      >
        <label htmlFor="EmailAdress" className="authentification-label">
          Email address
        </label>
        <input
          type="email"
          name="EmailAdress"
          id="EmailAdress"
          className={`authentification-input ${
            errors.emailAddress ? 'is-invalid' : ''
          }`}
          placeholder="Email Address"
          {...register('emailAddress')}
        />
        <div className="registration-error">
          {' '}
          {errors?.emailAddress && <p>{errors?.emailAddress?.message}</p>}
        </div>
        <label htmlFor="Password" className="authentification-label">
          Password
        </label>
        <input
          type="password"
          name="Password"
          id="Password"
          placeholder="Password"
          className={`authentification-input ${
            errors.password ? 'is-invalid' : ''
          }`}
          {...register('password')}
        />
        <div className="registration-error">
          {' '}
          {errors?.password && <p>{errors?.password?.message}</p>}
        </div>
        <input
          type="submit"
          className="authentification-send-form"
          value="Login"
        />
        <span>
          Don’t have an account?
          <Link to="/authentification">Sign Up</Link>
        </span>
      </form>
    </div>
  )
}

export default SignIn
