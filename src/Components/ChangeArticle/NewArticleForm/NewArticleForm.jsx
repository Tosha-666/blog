import React, { useEffect, useMemo } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import './NewArticleForm.scss'

const NewArticleForm = ({
  title = '',
  description = '',
  content = '',
  tagList = [''],
  sendChanges,
  slug,
}) => {
  // const [arrOfTags,setArrOfTags]=([])
  const arrOfTags = []

  useEffect(() => {
    reset({ title, description, body: content, tags: arrOfTags })
  }, [title, description, content])

  tagList && tagList.map((tagItem) => arrOfTags.push({ tag: tagItem }))
  console.log(tagList)
  console.log(arrOfTags)
  const schema = yup.object({
    title: yup.string().required('This field is required'),
    description: yup.string().required('This field is required'),
    body: yup.string().required('This field is required'),
    tags: yup.string().required('This field is required'),
  })
  const { register, handleSubmit, reset, control } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      return {
        tags: arrOfTags,
        title: title,
        description: description,
        body: content,
      }
    }),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  const token = useSelector((state) => state.user.token)

  const navigate = useNavigate()

  const editArticle = async (data) => {
    const tags = []
    console.log(data)
    data.tags.forEach((el) => {
      if (el) {
        console.log(el)
        tags.push(el.tag)
      }
    })
    const article = { ...data, tagList: tags }
    console.log(article)
    await sendChanges(article, token, slug)
    navigate('/')
    reset()
  }
  return (
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
        {...register('body')}
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
                  {...register(`tags.${index}.tag`)}
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
  )
}

export default NewArticleForm
