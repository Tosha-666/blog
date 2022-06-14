import axios from 'axios'

import errorHandler from './helpers/errorHandler'

const api = axios.create({
  baseURL: 'https://kata.academy:8021/api/',
})

const getArticles = async (token, offset, limit) => {
  try {
    const articles = await api.get('articles', {
      headers: {
        ...(token ? { 'Authorization': `Token ${token}` } : {}),
      },
      params: {
        limit: limit,
        offset: offset,
      },
    })
    return articles
  } catch (err) {
    return errorHandler(err)
  }
}

const create = async (data, token) => {
  try {
    const articleData = await axios({
      method: 'POST',
      url: 'https://kata.academy:8021/api/articles',
      headers: {
        'Authorization': `Token ${token}`,
      },
      data: {
        article: {
          ...data,
        },
      },
    })

    return articleData
  } catch (err) {
    return errorHandler(err)
  }
}

const edit = async (data, token, slug) => {
  try {
    const articleData = await axios({
      method: 'PUT',
      url: `https://kata.academy:8021/api/articles/${slug}`,
      headers: {
        'Authorization': `Token ${token}`,
      },
      data: {
        article: {
          ...data,
        },
      },
    })
    return articleData
  } catch (err) {
    return errorHandler(err)
  }
}

const getArticle = async (slug, token) => {
  try {
    const articleData = await axios({
      method: 'GET',
      url: `https://kata.academy:8021/api/articles/${slug}`,
      headers: {
        ...(token ? { 'Authorization': `Token ${token}` } : {}),
      },
    })
    return articleData
  } catch (err) {
    return errorHandler(err)
  }
}

const deleteArticle = async (slug, token) => {
  try {
    const delArticleData = await axios({
      method: 'DELETE',
      url: `https://kata.academy:8021/api/articles/${slug}`,
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
    return delArticleData
  } catch (err) {
    return errorHandler(err)
  }
}

const editProfileData = async (newData, token) => {
  try {
    const updateData = await axios({
      method: 'put',
      url: 'https://kata.academy:8021/api/user',
      headers: {
        'Authorization': `Token ${token}`,
      },
      data: {
        user: {
          username: newData.username,
          email: newData.email,
          password: newData.password,
          token: token,
          bio: '',
          image: newData.image,
        },
      },
    })
    return updateData
  } catch (err) {
    return errorHandler(err)
  }
}

const getUserData = async (token) => {
  try {
    const dataUser = await api.get('user', {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
    return dataUser
  } catch (err) {
    return errorHandler(err)
  }
}

const registerNewUser = async (data) => {
  try {
    const regData = await api.post('users', {
      user: {
        username: data.userName,
        email: data.emailAddress,
        password: data.password,
      },
    })
    return regData
  } catch (err) {
    return errorHandler(err)
  }
}

const loginUser = async (data) => {
  try {
    const regData = await api.post('users/login', {
      user: {
        email: data.emailAddress,
        password: data.password,
      },
    })
    return regData
  } catch (err) {
    return errorHandler(err)
  }
}

const favoriteArticle = async (slug, token) => {
  try {
    const favoriteData = await axios({
      method: 'POST',
      url: `https://kata.academy:8021/api/articles/${slug}/favorite`,
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
    return favoriteData.data.article
  } catch (err) {
    return errorHandler(err)
  }
}

const unFavoriteArticle = async (slug, token) => {
  try {
    const unfavoriteData = await axios({
      method: 'DELETE',
      url: `https://kata.academy:8021/api/articles/${slug}/favorite`,
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
    return unfavoriteData.data.article
  } catch (err) {
    return errorHandler(err)
  }
}

export {
  create,
  edit,
  getArticle,
  editProfileData,
  api,
  getUserData,
  getArticles,
  registerNewUser,
  deleteArticle,
  favoriteArticle,
  unFavoriteArticle,
  loginUser,
}
// https://api.realworld.io/
// https://kata.academy:8022/
// https://conduit.productionready.io/api/
// 'https://api.realworld.io/api/'
