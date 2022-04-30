import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, Outlet } from 'react-router-dom'

import './Layout.scss'
import avatar from '../../images/user-avatar.svg'

const Layout = () => {
  const authorise = useSelector((state) => state.user.isAuthorized)
  return (
    <React.Fragment>
      <header className="header">
        <button className="title">
          <NavLink to="/">Realworld Blog</NavLink>
          {/* <h1>Realworld Blog</h1> */}
        </button>

        {authorise && (
          <div className="registered">
            <button className="create">
              <Link to="article/create">Create article</Link>
            </button>
            <div className="person-info">
              <span className="person-name">John Dow</span>
              <img src={avatar} alt="" className="person-avatar" />
            </div>
            <button className="log-out">Log out</button>
          </div>
        )}
        {!authorise && (
          <div className="sign">
            <button className="sign-in">
              <NavLink to="registration">Sign In</NavLink>
            </button>
            <button className="sign-up">
              <NavLink to="authentification">Sign Up</NavLink>
            </button>
          </div>
        )}
      </header>
      <section className="container">
        <Outlet />
      </section>
    </React.Fragment>
  )
}

export default Layout
