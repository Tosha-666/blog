import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'

import { getArticle, deleteArticle } from '../../api'

import './Article.scss'

const Article = () => {
  const authorise = useSelector((state) => state.user.isAuthorized)
  const user = useSelector((state) => state.user.username)
  const token = useSelector((state) => state.user.token)
  const navigate = useNavigate()

  const { slug } = useParams()

  const [title, setTitle] = useState('')
  const [likeCount, setlikeCount] = useState('')
  const [description, setDescription] = useState('')
  const [author, setAuthor] = useState('')
  const [date, setDate] = useState('')
  const [content, setContent] = useState('')
  const [avatar, setAvatar] = useState('')
  const [tagList, setTaglist] = useState([])

  useEffect(async () => {
    console.log(await getArticle(slug, token))
    const {
      title,
      favoritesCount,
      description,
      createdAt,
      body,
      author: { username, image },
      tagList,
    } = await getArticle(slug, token)

    setTitle(title)
    setlikeCount(favoritesCount)
    setDescription(description)
    setAuthor(username)
    setDate(createdAt)
    setContent(body)
    setAvatar(image)
    setTaglist(tagList)
  }, [])

  const delArticle = async (slug, token) => {
    const res = deleteArticle(slug, token)
    navigate('/')
    console.log(res)
  }
  return (
    <div className="article-container">
      <div className="article-preview">
        <div className="article-info">
          <div className="article-header">
            <span className="article-title">{title}</span>
            <button className="article-like"></button>
            <span className="article-like-count">{likeCount}</span>
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
        <div className="user-personalize">
          <div className="people-info">
            <div className="user-name-wrapper">
              <span className="article-author-name">{author}</span>
              <span className="article-release-date">{date}</span>
            </div>
            <img src={avatar} alt="" className="article-author-image" />
          </div>
          {authorise && user === author ? (
            <div className="article-edit">
              <button
                className="delete"
                onClick={() => delArticle(slug, token)}
              >
                Delete
              </button>
              <button className="edit">
                <Link
                  to={`/article/${slug}/edit`}
                  title={title}
                  description={description}
                  text={content}
                >
                  Edit
                </Link>
              </button>
            </div>
          ) : null}
        </div>
        <span className="article-content-all">{content}</span>
      </div>
    </div>
  )
}
export default Article
