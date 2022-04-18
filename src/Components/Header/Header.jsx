import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import './Header.scss'
import avatar from '../../images/user-avatar.svg'

const Header = () => {
  const authorise = useSelector((state) => state.user.isAuthorized)
  return (
    <header className="header">
      <button className="title">
        <Link to="/">Realworld Blog</Link>
        {/* <h1>Realworld Blog</h1> */}
      </button>

      {authorise && (
        <div className="registered">
          <button className="create">Create article</button>
          <div className="person-info">
            <span className="person-name">John Dow</span>
            <img src={avatar} alt="" className="person-avatar" />
          </div>
        </div>
      )}
      {!authorise && (
        <div className="sign">
          <button className="sign-in">
            <Link to="/registration/">Sign In</Link>
          </button>
          <button className="sign-up">
            <Link to="/authentification/">Sign Up</Link>
          </button>
        </div>
      )}
    </header>
  )
}

export default Header
