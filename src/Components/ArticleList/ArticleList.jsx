import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './ArticleList.scss'
import { Pagination } from 'antd'
import 'antd/dist/antd.css'

import { getArticles } from '../../api'
import { ArticlePreview } from '../ArticlePreview'

const ArticleList = () => {
  const token = useSelector((state) => state.user.token)
  const isAuth = useSelector((state) => state.user.isAuthorized)
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(0)
  const [totalArticles, setTotalArticles] = useState(0)

  const articlesPerPage = 5

  useEffect(async () => {
    console.log(page)

    const offset = (page > 0 ? page - 1 : 0) * articlesPerPage
    const { articles, articlesCount } = await getArticles(
      token,
      offset,
      articlesPerPage
    )
    setTotalArticles(articlesCount)

    setPosts(articles)
    console.log(posts.length)
  }, [page, isAuth])

  // const getArticles = async () => {
  //   const articles = await api.get('articles', {
  //     headers: {
  //       ...(token ? { 'Authorization': `Token ${token}` } : {}),
  //     },
  //     params: {
  //       limit: 10,
  //       offset: 0,
  //     },
  //   })
  //   if (articles.status === 200) {
  //     console.log(articles)
  //     setPosts(articles.data.articles)
  //   }
  // }
  // let k = 0
  // const articlesArr = useSelector((state) => state.articles.articles)
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
          userAvatar={article.author.image}
        />
      ))}
      {!!totalArticles && (
        <div className="pagination">
          {' '}
          <Pagination
            size="small"
            current={page}
            defaultPageSize={articlesPerPage}
            onChange={(page) => setPage(page)}
            total={totalArticles}
            hideOnSinglePage
          />
        </div>
      )}
    </div>
  )
}

export default ArticleList
