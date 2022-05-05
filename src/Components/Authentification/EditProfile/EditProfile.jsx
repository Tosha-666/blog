import React from 'react'
import './EditProfile.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { setUser } from '../../store/userSlice'
import api from '../../../api'

const EditProfile = () => {
  const isAuth = useSelector((state) => state.user.isAuthorized)

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const schema = yup.object({
    userName: yup
      .string()
      .required('Username is required')
      .min(3, 'Your username needs to be at least 3 characters')
      .max(20, 'Your username needs to be not more 20 characters'),
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
    avatarImage: yup.string().url().nullable(),
  })
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) })

  console.log(getValues())

  const registrationUser = async (registrationData) => {
    console.log(registrationData)
    const regData = await api.post('users/login', {
      user: {
        email: registrationData.emailAddress,
        password: registrationData.password,
      },
    })
    console.log(regData)
    dispatch(setUser(regData.data.user))
    console.log(isAuth)
    navigate('/')
    reset()
  }
  return (
    <div className="edit-profile-container">
      <h1 className="edit-profile-title">Edit Profile</h1>
      <form
        action="#"
        method="post"
        className="edit-profile-form"
        onSubmit={handleSubmit(registrationUser)}
      >
        <label htmlFor="UserName" className="edit-profile-label">
          Username
        </label>
        <input
          type="text"
          name="Username"
          id="UserName"
          className={`edit-profile-input ${
            errors.userName ? 'is-invalid' : ''
          }`}
          placeholder="Username"
          {...register('userName')}
        />

        <label htmlFor="EmailAdress" className="edit-profile-label">
          Email address
        </label>
        <input
          type="email"
          name="EmailAdress"
          id="EmailAdress"
          className={`edit-profile-input ${
            errors.emailAddress ? 'is-invalid' : ''
          }`}
          placeholder="Email Address"
          {...register('emailAddress')}
        />
        <div className="registration-error">
          {' '}
          {errors?.emailAddress && <p>{errors?.emailAddress?.message}</p>}
        </div>

        <label htmlFor="Password" className="edit-profile-label">
          New password
        </label>
        <input
          type="password"
          name="Password"
          id="Password"
          placeholder="Password"
          className={`edit-profile-input ${
            errors.password ? 'is-invalid' : ''
          }`}
          {...register('password')}
        />
        <div className="registration-error">
          {' '}
          {errors?.password && <p>{errors?.password?.message}</p>}
        </div>
        <label htmlFor="avatarImage" className="edit-profile-label">
          Avatar image (url)
        </label>
        <input
          type="url"
          name="avatarImage"
          id="avatarImage"
          placeholder="Avatar image"
          className={`edit-profile-input ${
            errors.password ? 'is-invalid' : ''
          }`}
          {...register('avatarImage')}
        />
        <input type="submit" className="edit-profile-send-form" value="Save" />
      </form>
    </div>
  )
}

export default EditProfile
