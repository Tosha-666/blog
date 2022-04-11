import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'
import avatar from '../../images/user-avatar.svg'

const Header = () => {
  return (
    <header className="header">
      <span className="title">Realworld Blog</span>
      <div className="registered">
        <button className="create">Create article</button>
        <div className="person-info">
          <span className="person-name">John Dow</span>
          <img src={avatar} alt="" className="person-avatar" />
        </div>
      </div>
      <div className="sign">
        <button className="sign-in">
          <Link to="/registration/">Sign In</Link>
        </button>
        <button className="sign-up">
          <Link to="/authentification/">Sign Up</Link>
        </button>
      </div>
    </header>
  )
}

export default Header
