import React from 'react'
import './ArticleList.scss'

const ArticleList = () => {
  return (
    <div className="article-container">
      <div className="article-preview">
        <div className="article-info">
          <div className="article-header">
            <span className="article-title">Some article title</span>
            <button className="article-like"></button>
            <span className="article-like-count">10</span>
          </div>
          <div className="article-tag-list">
            <span className="article-tag-item">Tag</span>
          </div>
          <span className="article-content">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Perspiciatis, quam dicta mollitia vitae, dolor, rerum commodi illo
            laudantium debitis alias tempora repellat exercitationem voluptatem
            accusamus saepe facere asperiores voluptatum itaque.
          </span>
        </div>
        <div className="people-info">
          <img src="" alt="" className="article-author-image" />
          <span className="article-author-name">John Doe</span>
          <span className="article-release-date"></span>
        </div>
      </div>
    </div>
  )
}

export default ArticleList
