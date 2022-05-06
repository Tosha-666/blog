import './App.scss'
import { Route, Routes } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'

// import { getArticles } from '../store/articles'
import { Layout } from '../Layout'
import { ArticleList } from '../ArticleList'
import { Article } from '../Article'
import { SignUp } from '../Authentification/signUp'
import { SignIn } from '../Authentification/SignIn'
import { EditArticle } from '../ChangeArticle/EditArticle'
import { CreateArticle } from '../ChangeArticle/CreateArticle'
import { EditProfile } from '../Authentification/EditProfile'
import RequireAuth from '../hoc/RequireAuth'

const App = () => {
  return (
    <div className="main">
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
          {/* <Route path="createArticle" element={<EditArticle />} /> */}
        </Route>
      </Routes>
    </div>
  )
}
export default App
