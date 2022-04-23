import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import './EditArticle.scss'
import { TagsInput } from '../TagsInput'

const EditArticle = () => {
  const { register, handleSubmit, reset, control } = useForm()
  const [tagInput, setTagsInput] = useState([''])
  let k = 1
  const addTag = (e) => {
    e.preventDefault()
    setTagsInput((prevstate) => {
      console.log(prevstate)
      return [...prevstate, '']
    })
  }
  const editArticle = (data) => {
    console.log(data)
  }
  // const deleteTag = (id) => {
  //   tagInput
  // }
  return (
    <div className="edit-article-container">
      <h1 className="edit-article-title">Edit article</h1>

      <form className="edit-article-form" onSubmit={handleSubmit(editArticle)}>
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
              control={control}
            />
          ))}
          <button className="edit-article-tags-add" onClick={addTag}>
            Add Tag
          </button>
        </div>

        <input type="submit" className="edit-article-form-send" value="Send" />
      </form>
    </div>
  )
}
export default EditArticle
