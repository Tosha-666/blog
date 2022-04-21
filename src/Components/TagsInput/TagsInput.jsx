import React, { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

const TagsInput = ({ tagInner, addTag, id }) => {
  const { register } = useFormContext()
  const [tag, setTag] = useState('')
  //   useEffect(() => {
  //     setTag(tagInner)
  //   }, [])
  const onAdded = (e) => {
    e.preventDefault()
    addTag(tag)
  }
  return (
    <div>
      <input
        type="text"
        id="tag"
        className="edit-article-form-content edit-article-form-tag"
        value={tag}
        onChange={(event) => setTag(event.target.value)}
        // {...register('tags')}
      />
      <button
        className="edit-article-tags-delete"
        //   onClick={DeleteTag}
      >
        Delete
      </button>
      <button className="edit-article-tags-add" onClick={onAdded}>
        Add Tag
      </button>
    </div>
  )
}
export default TagsInput
