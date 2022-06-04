import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import format from 'date-fns/format'
import ReactMarkdown from 'react-markdown'

import {
  getArticle,
  deleteArticle,
  favoriteArticle,
  unFavoriteArticle,
} from '../../api'
import ModalWindow from '../ModalWindow/ModalWindow'

import './Article.scss'

const Article = () => {
  const authorise = useSelector((state) => state.user.isAuthorized)
  const user = useSelector((state) => state.user.username)
  const token = useSelector((state) => state.user.token)
  const navigate = useNavigate()

  const { slug } = useParams()

  const [aboutArticle, setAboutArticle] = useState({
    title: '',
    likeCount: 0,
    description: '',
    author: '',
    date: '',
    content: '',
    avatar: '',
    tagList: [],
  })

  const [like, setLike] = useState({
    likeCount: 0,
    like: false,
  })

  const [delModal, setDelModal] = useState(false)

  useEffect(async () => {
    console.log(await getArticle(slug, token))
    const {
      title,
      favoritesCount,
      favorited,
      description,
      createdAt,
      body,
      author: { username, image },
      tagList,
    } = await getArticle(slug, token)

    setAboutArticle({
      title,
      description,
      author: username,
      date: createdAt,
      content: body,
      avatar: image,
      tagList,
    })
    setLike({ likeCount: favoritesCount, like: favorited })
  }, [])

  const delArticle = async (slug, token) => {
    const res = deleteArticle(slug, token)
    navigate('/')
    console.log(res)
  }

  const favourArticle = async (slug, token) => {
    const { favorited, favoritesCount } = like.like
      ? await unFavoriteArticle(slug, token)
      : await favoriteArticle(slug, token)
    setLike({ likeCount: favoritesCount, like: favorited })
  }

  const closeDelModal = (b) => {
    setDelModal(b)
  }

  const formatData = (date) => {
    const year = Number(date.slice(0, 4))
    const month = Number(date.slice(5, 7))
    const day = Number(date.slice(8, 10))
    const data = format(new Date(year, month, day), 'MMMM d, y')
    return data
  }

  return (
    <div className="article-container">
      <div className="article-preview">
        <div className="article-info">
          <div className="article-header">
            <span className="article-title">{aboutArticle.title}</span>
            <button
              className={like.like ? 'article-like active' : 'article-like'}
              onClick={() => favourArticle(slug, token)}
            ></button>
            <span className="article-like-count">{like.likeCount}</span>
          </div>
          <div className="article-tag-list">
            {aboutArticle.tagList.map((tag) => (
              <span className="article-tag-item" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <span className="article-content">{aboutArticle.description}</span>
        </div>
        <div className="user-personalize">
          <div className="people-info">
            <div className="user-name-wrapper">
              <span className="article-author-name">{aboutArticle.author}</span>
              <span className="article-release-date">
                {formatData(aboutArticle.date)}
              </span>
            </div>
            <img
              src={aboutArticle.avatar}
              alt=""
              className="article-author-image"
            />
          </div>
          {authorise && user === aboutArticle.author ? (
            <div className="article-edit">
              <button className="delete" onClick={() => setDelModal(true)}>
                Delete
              </button>
              <button className="edit">
                <Link to={`/article/${slug}/edit`}>Edit</Link>
              </button>
              {delModal && (
                <ModalWindow
                  delArticle={delArticle}
                  slug={slug}
                  token={token}
                  closeDelModal={closeDelModal}
                />
              )}
            </div>
          ) : null}
        </div>
        <span className="article-content-all">
          <ReactMarkdown>{aboutArticle.content}</ReactMarkdown>
        </span>
      </div>
    </div>
  )
}
export default Article
