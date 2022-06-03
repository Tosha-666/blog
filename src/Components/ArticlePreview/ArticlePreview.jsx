import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { favoriteArticle, unFavoriteArticle } from '../../api'

import './ArticlePreview.scss'

const ArticlePreview = ({
  title,
  author,
  creationData,
  description,
  userAvatar,
  tagList,
  favoritesCount,
  favorited,
  slug,
}) => {
  const token = useSelector((state) => state.user.token)

  useEffect(() => {
    setLike({ likeCount: favoritesCount, like: favorited })
  }, [])

  const [like, setLike] = useState({
    likeCount: 0,
    like: false,
  })

  const favourArticle = async (slug, token) => {
    const { favorited, favoritesCount } = like.like
      ? await unFavoriteArticle(slug, token)
      : await favoriteArticle(slug, token)
    setLike({ likeCount: favoritesCount, like: favorited })
    console.log(favorited)
  }

  // console.log(title, tagList)
  return (
    <div className="article-list-preview">
      <div className="article-list-info">
        <div className="article-list-header">
          <Link to={`article/${slug}`}>
            <span className="article-list-title">{title}</span>
          </Link>

          <button
            className={
              like.like ? 'article-list-like active' : 'article-list-like'
            }
            onClick={() => favourArticle(slug, token)}
          ></button>
          <span className="article-like-count">{like.likeCount}</span>
        </div>
        <div className="article-tag-list">
          {tagList.map((tag) => (
            <span className="article-tag-item" key={tag}>
              {tag}
            </span>
          ))}
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
