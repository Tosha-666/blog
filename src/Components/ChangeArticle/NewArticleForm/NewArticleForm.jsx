import React, { useEffect, useMemo } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './NewArticleForm.scss'

const NewArticleForm = ({
  title = '',
  description = '',
  content = '',
  tagList = [''],
  sendChanges,
  slug,
}) => {
  const arrOfTags = []
  useEffect(() => {
    reset({ title, description, body: content, tags: arrOfTags })
  }, [title, description, content, tagList])
  tagList && tagList.map((tagItem) => arrOfTags.push({ tag: tagItem })),
    // tagList.map((tagItem) => arrOfTags.push({ tag: tagItem }))

    // for (let i = 0; i < tagList.length; i++) {
    //   let tagObject = {
    //     tag: tagList[i],
    //   }
    //   arrOfTags.push(tagObject)
    // }
    console.log(tagList)
  console.log(title, description, content, arrOfTags)
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: useMemo(
      () => {
        return {
          tags: arrOfTags,
          title: title,
          description: description,
          body: content,
        }
      },
      content,
      title,
      description,
      arrOfTags
    ),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  const token = useSelector((state) => state.user.token)

  const navigate = useNavigate()
  //   const create = async (formatData) => {
  //     const articleData = await axios({
  //       method: 'post',
  //       url: 'https://api.realworld.io/api/articles',
  //       headers: {
  //         'Authorization':
  //           'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdlbm5hZGlqLm1pbmFrb2ZmZkB5YW5kZXgucnUiLCJ1c2VybmFtZSI6ImZlZG9yYV90dXRjaGV2YV8xMDMiLCJpYXQiOjE2NTExNDUyNzEsImV4cCI6MTY1NjMyOTI3MX0.IkH6ITnaXmNMHDYX-SyGDdO_x0mOy2FBspJ_ukuKDqg',
  //       },
  //       data: {
  //         article: {
  //           ...formatData,
  //         },
  //       },
  //     })

  //     console.log(articleData)
  //   }
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
        // defaultValue={title}
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
        // defaultValue={description}
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
        // defaultValue={text}
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
