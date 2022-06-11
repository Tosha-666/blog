import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './ArticleList.scss'
import { Pagination } from 'antd'
import cookie from 'cookie_js'
import 'antd/dist/antd.css'

import { ErrorIndicator } from '../ErrorIndicator'
import { getArticles } from '../../api'
import { setLoading, setError } from '../store/userSlice'
import { ArticlePreview } from '../ArticlePreview'

const ArticleList = () => {
  const dispatch = useDispatch()

  const token = cookie.get('tokBlog')

  const err = useSelector((state) => state.user.error)
  const isAuth = useSelector((state) => state.user.isAuthorized)

  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(0)
  const [totalArticles, setTotalArticles] = useState(0)
  const [articlesPerPage, setArticlesPerPage] = useState(10)

  useEffect(async () => {
    const offset = (page > 0 ? page - 1 : 0) * articlesPerPage
    dispatch(setLoading(true))
    dispatch(setError(null))
    const articles = await getArticles(token, offset, articlesPerPage)
    console.log(articles)
    if (articles.status === 200) {
      dispatch(setLoading(false))
      setTotalArticles(articles.data.articlesCount)
      setPosts(articles.data.articles)
    } else {
      dispatch(setLoading(false))
      dispatch(setError(articles))
    }
  }, [page, isAuth, articlesPerPage])
  if (err) return <ErrorIndicator err={err} />
  return (
    <div className="article-preview-container">
      {posts.map((article) => (
        <ArticlePreview
          key={article.slug}
          slug={article.slug}
          title={article.title}
          author={article.author.username}
          creationData={article.createdAt}
          description={article.description}
          tagList={article.tagList}
          userAvatar={article.author.image}
          favoritesCount={article.favoritesCount}
          favorited={article.favorited}
        />
      ))}
      {totalArticles && (
        <div className="pagination">
          {' '}
          <Pagination
            size="small"
            // current={page}
            // defaultPageSize={articlesPerPage}
            onShowSizeChange={(curr, pages) => setArticlesPerPage(pages)}
            showSizeChanger={true}
            onChange={(page) => setPage(page)}
            total={totalArticles}
            hideOnSinglePage
            // simple
          />
        </div>
      )}
    </div>
  )
}

export default ArticleList
