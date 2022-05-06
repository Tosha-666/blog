import React, { useEffect, useState } from 'react'
import './EditProfile.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { editProfileData, getUserData } from '../../../api'
import { setUser } from '../../store/userSlice'

const EditProfile = () => {
  const token = useSelector((state) => state.user.token)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [userData, setUserData] = useState({})
  useEffect(async () => {
    console.log(await getUserData(token))
    const { username, email, image } = await getUserData(token)
    setUserData({ username, email, image })
  }, [])
  useEffect(() => {
    reset({
      username: userData.username,
      email: userData.email,
      image: userData.image,
      password: '',
    })
  }, [userData])

  const schema = yup.object({
    username: yup
      .string()
      .required()
      .min(3, 'Your username needs to be at least 3 characters')
      .max(20, 'Your username needs to be not more 20 characters'),
    email: yup
      .string()
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, 'Enter valid email')
      .min(3, 'must be at least 3 characters long')
      .email('must be a valid email'),
    password: yup
      .string()
      .min(6, 'Your password needs to be at least 6 characters')
      .max(40, 'Your password needs to be not more 40 characters'),
    image: yup.string().url().nullable(),
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) })
  console.log(getValues())

  // console.log(getValues())

  const submiteUserdata = async (data) => {
    const updatedData = await editProfileData(data, token)
    dispatch(setUser(updatedData.data.user))
    navigate('/')
    console.log(updatedData)
  }
  return (
    <div className="edit-profile-container">
      <h1 className="edit-profile-title">Edit Profile</h1>
      <form
        action="#"
        method="post"
        className="edit-profile-form"
        onSubmit={handleSubmit(submiteUserdata)}
      >
        <label htmlFor="UserName" className="edit-profile-label">
          Username
        </label>
        <input
          type="text"
          id="UserName"
          autoComplete="off"
          className={`edit-profile-input ${
            errors.userName ? 'is-invalid' : ''
          }`}
          placeholder="Username"
          {...register('username')}
        />

        <label htmlFor="EmailAdress" className="edit-profile-label">
          Email address
        </label>
        <input
          type="email"
          id="EmailAdress"
          className={`edit-profile-input ${
            errors.emailAddress ? 'is-invalid' : ''
          }`}
          placeholder="Email Address"
          {...register('email')}
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
          className={`edit-profile-input ${errors.image ? 'is-invalid' : ''}`}
          {...register('image')}
        />
        <input type="submit" className="edit-profile-send-form" value="Save" />
      </form>
    </div>
  )
}

export default EditProfile
