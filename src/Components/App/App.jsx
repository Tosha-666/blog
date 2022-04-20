import './App.scss'
import { Route, Routes } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'

// import { getArticles } from '../store/articles'
import { Layout } from '../Layout'
import { ArticleList } from '../ArticleList'
import { Article } from '../Article'
import { Registration } from '../Registration'
import { Authentification } from '../Authentification'
import { EditArticle } from '../EditArticle'

const App = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<ArticleList />} />
          <Route path="registration" element={<Registration />} />
          <Route path="authentification" element={<Authentification />} />
          <Route path="article" element={<Article />} />
          <Route path="article/:slug" element={<Article />} /> */}
          <Route path="/article" element={<EditArticle />} />
        </Route>
      </Routes>
    </div>
  )
}
export default App
