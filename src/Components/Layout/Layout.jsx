import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import cookie from 'cookie_js'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'

import { ErrorIndicator } from '../ErrorIndicator'
import { removeUser } from '../store/userSlice'
import { isAuthorized, username, image, error } from '../store/selectors'

import './Layout.scss'

const Layout = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const err = useSelector((state) => error(state))
  const authorise = useSelector((state) => isAuthorized(state))
  const userName = useSelector((state) => username(state))
  const avatar = useSelector((state) => image(state))

  const logOut = () => {
    cookie.set('tokBlog', '')
    dispatch(removeUser())
    navigate('/')
  }

  return (
    <React.Fragment>
      <header className="header">
        <button className="title">
          <NavLink to="/">Realworld Blog</NavLink>
        </button>

        {authorise && (
          <div className="registered">
            <button className="create">
              <Link to="article/create">Create article</Link>
            </button>
            <div className="person-info">
              <span className="person-name">{userName}</span>
              <Link to="editProfile">
                <img
                  src={
                    avatar ||
                    'https://static.productionready.io/images/smiley-cyrus.jpg'
                  }
                  alt=""
                  className="person-avatar"
                />
              </Link>
            </div>
            <button className="log-out" onClick={() => logOut()}>
              Log out
            </button>
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
      {err && <ErrorIndicator err={err} />}
      <section className="container">
        <Outlet />
      </section>
    </React.Fragment>
  )
}

export default Layout
