import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import './ArticleList.scss'
import { api } from '../../api'
import { ArticlePreview } from '../ArticlePreview'

const ArticleList = () => {
  const token = useSelector((state) => state.user.token)
  const [articleList, setArticleList] = useState([])

  useEffect(() => {
    getArticles(articleList)
  }, [])

  const getArticles = async () => {
    const articles = await api.get('articles', {
      headers: {
        ...(token ? { 'Authorization': `Token ${token}` } : {}),
      },
      params: {
        limit: 10,
        offset: 0,
      },
    })
    if (articles.status === 200) {
      console.log(articles)
      setArticleList(articles.data.articles)
    }
  }
  // let k = 0
  // const articlesArr = useSelector((state) => state.articles.articles)
  return (
    <div className="article-preview-container">
      {articleList.map((article) => (
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
    </div>
  )
}

export default ArticleList
