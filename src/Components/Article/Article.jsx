import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import cookie from 'cookie_js'
import format from 'date-fns/format'
import ReactMarkdown from 'react-markdown'
import { Tag } from 'antd'
import 'antd/dist/antd.css'

import { ErrorIndicator } from '../ErrorIndicator'
import { setLoading, setError } from '../store/userSlice'
import {
  getArticle,
  deleteArticle,
  favoriteArticle,
  unFavoriteArticle,
} from '../../api'
import ModalWindow from '../ModalWindow/ModalWindow'

import './Article.scss'

const Article = () => {
  const dispatch = useDispatch()

  const err = useSelector((state) => state.user.error)
  const authorise = useSelector((state) => state.user.isAuthorized)
  const user = useSelector((state) => state.user.username)
  const token = cookie.get('tokBlog')
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
    dispatch(setLoading(true))
    dispatch(setError(null))

    const articleInfo = await getArticle(slug, token)

    if (articleInfo.status === 200) {
      dispatch(setLoading(false))
      const {
        title,
        favoritesCount,
        favorited,
        description,
        createdAt,
        body,
        author: { username, image },
        tagList,
      } = articleInfo.data.article

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
    } else {
      dispatch(setLoading(false))
      dispatch(setError(articleInfo))
    }
  }, [])

  const delArticle = async (slug, token) => {
    dispatch(setLoading(true))
    dispatch(setError(null))
    const res = deleteArticle(slug, token)
    if (res.status === 200) {
      dispatch(setLoading(false))
    } else {
      dispatch(setLoading(false))
      dispatch(setError(res))
    }

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
  if (err) return <ErrorIndicator err={err} />
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
              <Tag key={tag}>{tag}</Tag>
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
