import './App.scss'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Spin } from 'antd'
import 'antd/dist/antd.css'
import cookie from 'cookie_js'

import { Layout } from '../Layout'
import { ArticleList } from '../ArticleList'
import { Article } from '../Article'
import { SignUp } from '../Authentification/signUp'
import { SignIn } from '../Authentification/SignIn'
import { EditArticle } from '../ChangeArticle/EditArticle'
import { CreateArticle } from '../ChangeArticle/CreateArticle'
import { EditProfile } from '../Authentification/EditProfile'
import { getUserData } from '../../api'
import { setUser, setLoading, setError } from '../store/userSlice'
import RequireAuth from '../hoc/RequireAuth'

const App = () => {
  const isAuth = useSelector((state) => state.user.isAuthorized)
  const loading = useSelector((state) => state.user.loading)

  const dispatch = useDispatch()

  useEffect(async () => {
    if (isAuth) {
      return
    } else {
      if (cookie.get('tokBlog')) {
        dispatch(setLoading(true))
        const userData = await getUserData(cookie.get('tokBlog'))
        if (userData.status === 200) {
          dispatch(setLoading(false))
          dispatch(setUser(userData.data.user))
        } else {
          dispatch(setLoading(false))
          dispatch(setError(userData.message))
        }
      } else return
    }
  }, [])

  return (
    <div className="main">
      {loading && <Spin size="large" className="spinner" />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticleList />} />
          <Route path="authentification" element={<SignUp />} />
          <Route
            path="editProfile"
            element={
              <RequireAuth>
                <EditProfile />
              </RequireAuth>
            }
          />
          <Route path="registration" element={<SignIn />} />
          <Route path="article" element={<Article />} />
          <Route path="article/:slug" element={<Article />} />
          <Route
            path="article/create"
            element={
              <RequireAuth>
                <CreateArticle />
              </RequireAuth>
            }
          />
          <Route
            path="/article/:slug/edit"
            element={
              <RequireAuth>
                <EditArticle />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </div>
  )
}
export default App
