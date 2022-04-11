import React from 'react'

import './ArticleList.scss'
import avatar from '../../images/user-avatar.svg'

const ArticleList = () => {
  return (
    <div className="article-list-preview">
      <div className="article-list-info">
        <div className="article-list-header">
          <span className="article-list-title">Some article title</span>
          <button className="article-list-like"></button>
          <span className="article-like-count">10</span>
        </div>
        <div className="article-tag-list">
          <span className="article-tag-item">Tag</span>
        </div>
        <span className="article-content">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Perspiciatis, quam dicta mollitia vitae, dolor, rerum commodi illo
          laudantium debitis alias tempora repellat exercitationem voluptatem
          accusamus saepe.
        </span>
      </div>
      <div className="people-info">
        <div className="user-name-wrapper">
          <span className="article-author-name">John Doe</span>
          <span className="article-release-date">March 5, 2020</span>
        </div>
        <img src={avatar} alt="" className="article-author-image" />
      </div>
    </div>
  )
}

export default ArticleList
