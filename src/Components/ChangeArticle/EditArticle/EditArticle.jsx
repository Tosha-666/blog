import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { NewArticleForm } from '../NewArticleForm'
import { edit, getArticle } from '../../../api'

import './EditArticle.scss'

const EditArticle = () => {
  const token = useSelector((state) => state.user.token)

  const { slug } = useParams()

  console.log(slug)
  const [aboutArticle, setAboutArticle] = useState({
    title: null,
    description: null,
    content: null,
    tagList: null,
  })

  useEffect(async () => {
    // console.log(await getArticle(slug, token))
    const { title, description, body, tagList } = await getArticle(slug, token)

    setAboutArticle({
      title: title,
      description: description,
      content: body,
      tagList: tagList,
    })
  }, [])

  return (
    <div className="edit-article-container">
      <h1 className="edit-article-title">CreateArticle</h1>

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
