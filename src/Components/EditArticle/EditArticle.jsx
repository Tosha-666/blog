import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import './EditArticle.scss'

import { TagsInput } from '../TagsInput'

const EditArticle = ({
  title = 'top',
  description = 'cop',
  text = 'lop',
  tags = [''],
}) => {
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: { title, description, text },
  })
  const [tagInput, setTagsInput] = useState(tags)
  let k = 0

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
  const deleteTag = (id) => {
    console.log(id)
    // console.log(tagInput.findIndex((el) => tagInput.indexOf(el) + 1 === 3))
    // const delIndex = tagInput.findIndex((el) => tagInput.indexOf(el))
    // console.log(delIndex)
    setTagsInput((prev) => {
      // console.log(prev)
      // console.log([...prev.slice(0, id)])
      // console.log([...prev.slice(0, id + 1)])
      // // console.log([...prev.slice(0, prev[id]), ...prev.slice(prev[id + 1])])
      console.log([...prev.slice(0, id), ...prev.slice(id + 1)])
      return [...prev.slice(0, id), ...prev.slice(id + 1)]
    })
  }
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
              deleteTag={deleteTag}
              id={k}
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
