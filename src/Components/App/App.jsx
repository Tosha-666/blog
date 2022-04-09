import './App.scss'
import { Route, Routes, Switch } from 'react-router-dom'

import { Header } from '../Header'
import { ArticleList } from '../ArticleList'
import { Article } from '../Article'
import { Registration } from '../Registration'

const App = () => {
  return (
    <div className="main">
      <Header />
      <section className="container">
        <Routes>
          <Route path="/articleslist" element={<ArticleList />} />
          <Route path="/article" element={<Article />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>

        {/* <ArticleList /> */}
        {/* <Article /> */}
        {/* <Registration /> */}
      </section>
    </div>
  )
}
export default App
