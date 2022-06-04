import React from 'react'
import './ModalWindow.scss'

const ModalWindow = ({ delArticle, slug, token, closeDelModal }) => {
  return (
    <div className="delete-modal">
      <span className="delete-modal-title">
        Are you sure to delete this article?
      </span>
      <div className="delete-modal-button-block">
        {' '}
        <button
          onClick={() => closeDelModal(false)}
          className="delete-modal-agreement-buttom-disagree"
        >
          No
        </button>
        <button
          onClick={() => delArticle(slug, token)}
          className="delete-modal-agreement-buttom-agree"
        >
          Yes
        </button>
      </div>
    </div>
  )
}
export default ModalWindow
