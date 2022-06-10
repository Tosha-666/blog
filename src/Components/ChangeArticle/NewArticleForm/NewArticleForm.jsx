import React, { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
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
    // tags: yup.string().required('This field is required'),
  })
  const { register, handleSubmit, reset, control, setValue } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    // defaultValues: useMemo(() => {
    //   return {
    //     tags: arrOfTags,
    //     title: title,
    //     description: description,
    //     body: content,
    //   }
    // }),
  })

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'tags',
  })

  const token = useSelector((state) => state.user.token)

  const navigate = useNavigate()

  const editArticle = async (data) => {
    const tags = []
    data.tags.forEach((el) => {
      if (el) {
        console.log(el)
        tags.push(el.tag)
      }
    })
    const article = { ...data, tagList: tags }
    dispatch(setLoading(true))
    dispatch(setError(null))
    const chages = await sendChanges(article, token, slug)
    if (chages.status === 200) {
      dispatch(setLoading(false))
      navigate('/')
      reset()
    } else {
      dispatch(setLoading(true))
      dispatch(setError(chages.message))
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
                  required
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
