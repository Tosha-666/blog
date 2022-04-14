import React from 'react'

import './ArticlePreview.scss'

const ArticlePreview = ({
  title,
  author,
  creationData,
  description,
  userAvatar,
}) => {
  return (
    <div className="article-list-preview">
      <div className="article-list-info">
        <div className="article-list-header">
          <span className="article-list-title">{title}</span>
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
