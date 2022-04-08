import './App.scss'
import { Header } from '../Header'
// import { ArticleList } from '../ArticleList'
// import { Article } from '../Article'
import { Registration } from '../Registration'

const App = () => {
  return (
    <div className="main">
      <Header />
      <section className="container">
        {/* <ArticleList /> */}
        {/* <Article /> */}
        <Registration />
      </section>
    </div>
  )
}
export default App
