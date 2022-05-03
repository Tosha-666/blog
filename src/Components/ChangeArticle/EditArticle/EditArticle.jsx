import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { NewArticleForm } from '../NewArticleForm'
import { create, getArticle } from '../../../api'

import './EditArticle.scss'

const EditArticle = () => {
  const token = useSelector((state) => state.user.token)

  const { slug } = useParams()

  // console.log(slug)
  const [title, setTitle] = useState('')
  // const [likeCount, setlikeCount] = useState('')
  // const [tags, setTags] = useState('')
  const [description, setDescription] = useState('')
  // const [author, setAuthor] = useState('')
  // const [date, setDate] = useState('')
  const [content, setContent] = useState('')
  // const [avatar, setAvatar] = useState('')
  const [tagList, setTaglist] = useState([])

  useEffect(async () => {
    // console.log(await getArticle(slug, token))
    const {
      title,
      // favoritesCount,
      description,
      // createdAt,
      body,
      // author: { username, image },
      tagList,
    } = await getArticle(slug, token)
    // console.log(
    //   title,
    //   favoritesCount,
    //   description,
    //   createdAt,
    //   body,
    //   username,
    //   image,
    //   tagList
    // )
    setTitle(title)
    // setlikeCount(favoritesCount)
    // setTags(articleData.tagList[0])
    setDescription(description)
    // setAuthor(username)
    // setDate(createdAt)
    setContent(body)
    // setAvatar(image)
    setTaglist(tagList)
  }, [])

  return (
    <div className="edit-article-container">
      <h1 className="edit-article-title">CreateArticle</h1>
      {tagList && (
        <NewArticleForm
          sendChanges={create}
          title={title}
          description={description}
          text={content}
          tagList={tagList}
        />
      )}
    </div>
  )
}

export default EditArticle
