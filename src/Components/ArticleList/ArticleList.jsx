import React, { useState, useEffect } from 'react'

import './ArticleList.scss'
import api from '../../api'
import { ArticlePreview } from '../ArticlePreview'

const ArticleList = () => {
  const [articleList, setArticleList] = useState([])

  useEffect(() => {
    getArticles(articleList)
  }, [])

  const getArticles = async () => {
    const articles = await api.get('api/articles', {
      params: {
        limit: 20,
        offset: 0,
      },
    })
    if (articles.status === 200) {
      console.log(articles.data.articles)
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
