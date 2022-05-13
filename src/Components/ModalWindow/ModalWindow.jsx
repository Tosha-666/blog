import React from 'react'
import './ModalWindow.scss'

const ModalWindow = () => {
  return (
    <div className="delete-modal">
      <span className="delete-modal-title">
        Are you sure to delete this article?
      </span>
      <button className="delete-modal-agreement-buttom-disagree">No</button>
      <button className="delete-modal-agreement-buttom-agree">Yes</button>
    </div>
  )
}
export default ModalWindow
