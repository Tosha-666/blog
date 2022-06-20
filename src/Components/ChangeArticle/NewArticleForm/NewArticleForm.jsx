import React, { useEffect } from 'react'
import cookie from 'cookie_js'
import { useForm, useFieldArray } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { setLoading, setError } from '../../store/userSlice'

import './NewArticleForm.scss'

const NewArticleForm = ({
  title = '',
  description = '',
  content = '',
  tagList = [''],
  sendChanges,
  slug,
}) => {
  const token = cookie.get('tokBlog')
  const dispatch = useDispatch()

  useEffect(() => {
    setValue('title', title)
    setValue('description', description)
    setValue('body', content)
    replace(tagList)
  }, [title, description, content, tagList])

  const schema = yup.object({
    title: yup.string().required('This field is required'),
    description: yup.string().required('This field is required'),
    body: yup.string().required('This field is required'),
  })
  const { register, handleSubmit, reset, control, setValue, watch } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'tags',
  })

  const navigate = useNavigate()

  const editArticle = async (data) => {
    const tags = []

    data.tags.forEach((el) => {
      if (el) {
        if (el.tag !== '') {
          tags.push(el.tag)
        }
      }
      return
    })
    const article = { ...data, tagList: tags }
    dispatch(setLoading(true))
    dispatch(setError(null))
    const changes = await sendChanges(article, token, slug)

    if (changes.status === 200) {
      const createdSlug = changes.data.article.slug
      dispatch(setLoading(false))
      navigate(`/article/${createdSlug}`)
      reset()
    } else {
      dispatch(setLoading(false))
      dispatch(setError(changes))
    }
  }
  const inputTags = watch('tags')
  const correctRemove = (index) => {
    if (inputTags.length > 1) {
      remove(index)
    } else {
      replace([{ tag: '' }])
    }
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
                  onClick={() => correctRemove(index)}
                  className={
                    inputTags.length === 1 && inputTags[0].tag === ''
                      ? 'disabled edit-article-tags-delete'
                      : 'edit-article-tags-delete'
                  }
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
