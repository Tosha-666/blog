import './App.scss'
import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getArticles } from '../store/articles'
import { Header } from '../Header'
import { ArticleList } from '../ArticleList'
import { Article } from '../Article'
import { Registration } from '../Registration'
import { Authentification } from '../Authentification'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getArticles())
  }, [])

  return (
    <div className="main">
      <Header />
      <section className="container">
        <Routes>
          <Route path="/" element={<ArticleList />} exact />
          <Route path="/article/" element={<Article />} />
          <Route path="/article/:slug" />
          <Route path="/registration/" element={<Registration />} />
          <Route path="/authentification/" element={<Authentification />} />
        </Routes>
      </section>
    </div>
  )
}
export default App
