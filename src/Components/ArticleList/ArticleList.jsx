import React from 'react'
import { useSelector } from 'react-redux'

import './ArticleList.scss'
import { ArticlePreview } from '../ArticlePreview'

const ArticleList = () => {
  let k = 0
  const articlesArr = useSelector((state) => state.articles.articles)
  return (
    <div className="article-preview-container">
      {articlesArr.map((article) => (
        <ArticlePreview
          key={k++}
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
