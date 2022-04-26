import React from 'react'
import { Link } from 'react-router-dom'

import './ArticlePreview.scss'

const ArticlePreview = ({
  title,
  author,
  creationData,
  description,
  userAvatar,
  slug,
}) => {
  return (
    <div className="article-list-preview">
      <div className="article-list-info">
        <div className="article-list-header">
          <Link to={`article/${slug}`}>
            <span className="article-list-title">{title}</span>
          </Link>

          <button className="article-list-like"></button>
          <span className="article-like-count">10</span>
        </div>
        <div className="article-tag-list">
          <span className="article-tag-item">Tag</span>
        </div>
        <span className="article-content">{description}</span>
      </div>
      <div className="people-info">
        <div className="user-name-wrapper">
          <span className="article-author-name">{author}</span>
          <span className="article-release-date">{creationData}</span>
        </div>
        <img src={userAvatar} alt="" className="article-author-image" />
      </div>
    </div>
  )
}

export default ArticlePreview
