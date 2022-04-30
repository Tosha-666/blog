import React from 'react'

import { NewArticleForm } from '../NewArticleForm'
import { create } from '../../../api'

const EditArticle = () => {
  return (
    <div className="edit-article-container">
      <h1 className="edit-article-title">CreateArticle</h1>
      <NewArticleForm sendChanges={create} />
    </div>
  )
}

export default EditArticle
