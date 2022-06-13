import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import cookie from 'cookie_js'
import { useDispatch } from 'react-redux'

import { NewArticleForm } from '../NewArticleForm'
import { setLoading, setError } from '../../store/userSlice'
import { edit, getArticle } from '../../../api'

import './EditArticle.scss'

const EditArticle = () => {
  const dispatch = useDispatch()
  const token = cookie.get('tokBlog')

  const { slug } = useParams()

  console.log(slug)
  const [aboutArticle, setAboutArticle] = useState({
    title: null,
    description: null,
    content: null,
    tagList: null,
  })

  useEffect(async () => {
    dispatch(setLoading(true))
    dispatch(setError(null))
    // console.log(await getArticle(slug, token))
    const articleInfo = await getArticle(slug, token)
    const { title, description, body, tagList } = articleInfo.data.article
    const arrOfTags = []
    console.log(tagList)
    tagList.map((tagItem) => arrOfTags.push({ tag: tagItem }))
    setAboutArticle({
      title: title,
      description: description,
      content: body,
      tagList: arrOfTags,
    })
    if (articleInfo.status === 200) {
      dispatch(setLoading(false))
    } else {
      dispatch(setLoading(false))
      dispatch(setError(articleInfo))
    }
  }, [])

  return (
    <div className="edit-article-container">
      <h1 className="edit-article-title">Edit article</h1>

      <NewArticleForm
        sendChanges={edit}
        title={aboutArticle.title}
        description={aboutArticle.description}
        content={aboutArticle.content}
        tagList={aboutArticle.tagList}
        slug={slug}
      />
    </div>
  )
}

export default EditArticle
