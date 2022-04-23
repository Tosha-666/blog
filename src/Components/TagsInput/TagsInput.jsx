import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

const TagsInput = ({ tagInner, addTag, id, control }) => {
  // const {
  //   field: { onChange, ref },
  // } = useController({
  //   control,
  // })

  const [tag, setTag] = useForm({1})
  // useEffect(() => {
  //   setTag(tagInner)
  // }, [])
  // const onAdded = (e) => {
  //   e.preventDefault()
  //   addTag(tag)
  // }
  return (
    <React.Fragment>
      <Controller
      // defaultValue={}
        control={control}
        name={`tag${id}`}
        render={({ field: { onChange, value } }) => (
          <input
            type="text"
            id="tag"
            className="edit-article-form-content edit-article-form-tag"
            value={tag}
            onChange={setTag}
            // (event) => setTag(event.target.value)}
          />
        )}
      />

      <button
        className="edit-article-tags-delete"
        //   onClick={DeleteTag}
      >
        Delete
      </button>
      {/* <button className="edit-article-tags-add" onClick={onAdded}>
        Add Tag
      </button> */}
    </React.Fragment>
  )
}
export default TagsInput
