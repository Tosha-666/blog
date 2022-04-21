import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import './EditArticle.scss'
import { TagsInput } from '../TagsInput'

const EditArticle = () => {
  const { register, handleSubmit, reset } = useForm()
  const methods = useForm()
  const [tagInput, setTagsInput] = useState([''])
  let k = 1
  const addTag = (tag) => {
    setTagsInput((prevstate) => {
      return [tag, ...prevstate]
    })
  }
  const editArticle = (data) => {
    console.log(data)
  }
  return (
    <div className="edit-article-container">
      <h1 className="edit-article-title">Edit article</h1>
      <FormProvider {...methods}>
        <form
          className="edit-article-form"
          onSubmit={handleSubmit(editArticle)}
        >
          <label className="edit-article-form-label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            {...register('title')}
            className="edit-article-form-content"
          />
          <label className="edit-article-form-label" htmlFor="description">
            Short description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Title"
            {...register('description')}
            className="edit-article-form-content"
          />

          <label className="edit-article-form-label" htmlFor="text">
            Text{' '}
          </label>
          <textarea
            type="text"
            id="text"
            placeholder="Text"
            className="edit-article-form-content"
            {...register('text')}
          />

          <label className="edit-article-form-label" htmlFor="tag">
            Tags
          </label>
          <div>
            {tagInput.map((tag) => (
              <TagsInput
                tagInner={tag}
                key={k++}
                addTag={addTag}
                register={register}
                id={k++}
              />
            ))}
          </div>

          <input
            type="submit"
            className="edit-article-form-send"
            value="Send"
          />
        </form>
      </FormProvider>
    </div>
  )
}
export default EditArticle
