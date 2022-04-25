import React from 'react'
import { Controller } from 'react-hook-form'

const TagsInput = ({ tagInner, deleteTag, id, control }) => {
  // const [tag, setTag] = useForm({ defaultValues: { tagInner } })
  // useEffect(() => {
  //   setTag(tagInner)
  // }, [])

  return (
    <React.Fragment>
      <Controller
        control={control}
        name={`tag${id}`}
        defaultValue={tagInner}
        shouldUnregister={true}
        render={({ field: { onChange, value } }) => (
          <input
            type="text"
            id="tag"
            className="edit-article-form-content edit-article-form-tag"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <button
        className="edit-article-tags-delete"
        onClick={() => deleteTag(id)}
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
