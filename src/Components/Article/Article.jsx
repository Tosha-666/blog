import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import api from '../../api'

import './Article.scss'

const Article = () => {
  const { slug } = useParams()

  const [title, setTitle] = useState('')
  const [likeCount, setlikeCount] = useState('')
  const [tags, setTags] = useState('')
  const [description, setDescription] = useState('')
  const [author, setAuthor] = useState('')
  const [date, setDate] = useState('')
  const [content, setContent] = useState('')
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    getAritcle(slug)
  }, [])
  const getAritcle = async (slug) => {
    const articleData = await api.get(`api/articles/${slug}`)
    console.log(articleData)
    setTitle(articleData.title)
    setlikeCount(articleData.favoritesCount)
    setTags(articleData.tagList[0])
    setDescription(articleData.description)
    setAuthor(articleData.author.username)
    setDate(articleData.createdAt)
    setContent(articleData.body)
    setAvatar(articleData.author.image)
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
            <span className="article-tag-item">{tags}</span>
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
          <div className="article-edit">
            <button className="delete">Delete</button>
            <button className="edit">Edit</button>
          </div>
        </div>
        <span className="article-content-all">{content}</span>
      </div>
    </div>
  )
}
export default Article
