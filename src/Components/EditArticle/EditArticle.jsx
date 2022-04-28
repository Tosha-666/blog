import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useSelector } from 'react-redux'
import axios from 'axios'

import api from '../../api'

import './EditArticle.scss'

const EditArticle = ({
  slug,
  title = '',
  description = '',
  text = '',
  tagList = [{ tag: '' }],
}) => {
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: { title, description, text, tagList },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  const token = useSelector((state) => state.user.token)

  // const addTag = (e) => {
  //   e.preventDefault()
  //   setTagsInput((prevstate) => {
  //     console.log(prevstate)
  //     return [...prevstate, '']
  //   })
  // }
  const create = async (formatData) => {
    console.log(token)
    console.log(
      formatData.title
      // formatData.description,
      // formatData.text,
      // formatData.tagList
    )
    const articleData = await axios({
      method: 'post',
      url: 'https://api.realworld.io/api/articles',
      headers: {
        'Authorization':
          'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdlbm5hZGlqLm1pbmFrb2ZmZkB5YW5kZXgucnUiLCJ1c2VybmFtZSI6ImZlZG9yYV90dXRjaGV2YV8xMDMiLCJpYXQiOjE2NTExNDUyNzEsImV4cCI6MTY1NjMyOTI3MX0.IkH6ITnaXmNMHDYX-SyGDdO_x0mOy2FBspJ_ukuKDqg',
      },
      data: {
        article: {
          'title': formatData.title,
          'description': formatData.description,
          'body': formatData.text,
          'tagList': formatData.tagList,
        },
      },
    })
    // await api.post('api/articles', {
    //   params: {
    //     'article': { ...formatData },
    //   },
    //   headers: {
    //     'Authorization':
    //       'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdlbm5hZGlqLm1pbmFrb2ZmZkB5YW5kZXgucnUiLCJ1c2VybmFtZSI6ImZlZG9yYV90dXRjaGV2YV8xMDMiLCJpYXQiOjE2NTExNDUyNzEsImV4cCI6MTY1NjMyOTI3MX0.IkH6ITnaXmNMHDYX-SyGDdO_x0mOy2FBspJ_ukuKDqg',
    //   },
    // })
    console.log(articleData)
  }
  const editArticle = (data) => {
    const tags = []
    // console.log(data)
    data.tagList.forEach((el) => {
      if (el) {
        console.log(el)
        tags.push(el.tag)
      }
    })
    const article = { ...data, tagList: tags }
    console.log(article)
    create(article)

    // reset()
  }
  // const deleteTag = (id) => {
  //   console.log(id)
  //   setTagsInput((prev) => {
  //     console.log([...prev.slice(0, id), ...prev.slice(id + 1)])
  //     return [...prev.slice(0, id), ...prev.slice(id + 1)]
  //   })
  // }
  return (
    <div className="edit-article-container">
      <h1 className="edit-article-title">
        {slug ? 'Edit article' : 'CreateArticle'}
      </h1>

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
          className="edit-article-form-content form-area"
          {...register('text')}
        />
        <section className="edit-article-tags-container">
          <label className="edit-article-form-label" htmlFor="tag">
            Tags
          </label>
          <ul>
            {fields.map((item, index) => {
              return (
                <li key={item.id}>
                  <input
                    placeholder="Tag"
                    {...register(`tagList.${index}.tag`)}
                    className="edit-article-form-content edit-article-form-tag"
                  />

                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="edit-article-tags-delete"
                  >
                    Delete
                  </button>
                </li>
              )
            })}
          </ul>
          <button
            type="button"
            className="edit-article-tags-add"
            onClick={() => {
              append({ tag: '' })
            }}
          >
            Add Tag
          </button>
        </section>
        <input type="submit" className="edit-article-form-send" value="Send" />
      </form>
    </div>
  )
}
export default EditArticle
