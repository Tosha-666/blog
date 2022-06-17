import React from 'react'
import './NotFoundPage.scss'

const NotFoundPage = () => {
  return (
    <div className="not--found">
      <h1 className="not--found-title">404</h1>
      <p className="not--found-article">
        I&apos;m afraid you&apos;ve found a page that doesn&apos;t exist. That
        can happen when you follow a link to something that has since been
        deleted. Or the link was incorrect to begin with.
      </p>
    </div>
  )
}

export default NotFoundPage
