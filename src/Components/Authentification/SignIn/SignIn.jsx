import React, { useEffect } from 'react'
import cookie from 'cookie_js'
import './SignIn.scss'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

// import { ErrorIndicator } from '../../ErrorIndicator'
import { setUser, setLoading, setError } from '../../store/userSlice'
import { loginUser } from '../../../api'

const SignIn = () => {
  // const isAuth = useSelector((state) => state.user.isAuthorized)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  // const err = useSelector((state) => state.user.error)

  useEffect(() => {
    dispatch(setError(null))
    console.log('disp')
  }, [])

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
    dispatch(setError(null))
    const loginData = await loginUser(registrationData)
    console.log(loginData)

    if (loginData.status === 200) {
      dispatch(setUser(loginData.data.user))
      dispatch(setLoading(false))
      cookie.set('tokBlog', loginData.data.user.token, {
        expires: 7,
      })
      navigate('/')
      reset()
    } else {
      dispatch(setLoading(false))
      dispatch(setError(loginData))
    }
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
