import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import './EditArticle.scss'

const EditArticle = () => {
  const { register, handleSubmit, reset } = useForm()

  //   const tagContainer = () => {
  //     return (
  //       <div>
  //         <input
  //           type="text"
  //           id="tag"
  //           className="edit-article-form-content edit-article-form-tag"
  //         />
  //         <button className="edit-article-tags-delete" onClick={DeleteTag}>
  //           Delete
  //         </button>
  //         <button className="edit-article-tags-add" onClick={DeleteTag}>
  //           Add Tag
  //         </button>
  //       </div>
  //     )
  //   }
  //   const [tag, setTag] = useState([tagContainer])
  return (
    <div className="edit-article-container">
      <h1 className="edit-article-title">Edit article</h1>
      <form className="edit-article-form">
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
        />

        <label className="edit-article-form-label" htmlFor="tag">
          Tags
        </label>
        {/* <div>{tag.map()}</div> */}
        <div>
          <input
            type="text"
            id="tag"
            className="edit-article-form-content edit-article-form-tag"
          />
          <button
            className="edit-article-tags-delete"
            //   onClick={DeleteTag}
          >
            Delete
          </button>
          <button
            className="edit-article-tags-add"
            //   onClick={DeleteTag}
          >
            Add Tag
          </button>
        </div>
        <input type="submit" className="edit-article-form-send" value="Send" />
      </form>
    </div>
  )
}
export default EditArticle
