import axios from 'axios'

const api = axios.create({
  baseURL: 'https://kata.academy:8021/api/',
  // 'https://api.realworld.io/api/'
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
    if (err.message === 'Network Error') {
      return {
        message: 'Check your Network Connection',
      }
    }
    return err.response.data.errors
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
    if (err.message === 'Network Error') {
      return {
        message: 'Check your Network Connection',
      }
    }
    return err.response.data.errors
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
    if (err.message === 'Network Error') {
      return {
        message: 'Check your Network Connection',
      }
    }
    return err.response.data.errors
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
    if (err.message === 'Network Error') {
      return {
        message: 'Check your Network Connection',
      }
    }
    console.log(err.message)
    return err.response.data.errors
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
    if (err.message === 'Network Error') {
      return {
        message: 'Check your Network Connection',
      }
    }
    return err.response.data.errors
  }
}

const editProfileData = async (newData, token) => {
  try {
    console.log(newData)
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
    console.log(updateData)
    return updateData
  } catch (err) {
    if (err.message === 'Network Error') {
      return {
        message: 'Check your Network Connection',
      }
    }
    return err.response.data.errors
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
    if (err.message === 'Network Error') {
      return {
        message: 'Check your Network Connection',
      }
    }
    return err.response.data.errors
  }
}

const registerNewUser = async (data) => {
  console.log(data)
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
    if (err.message === 'Network Error') {
      return {
        message: 'Check your Network Connection',
      }
    }
    return err.response.data.errors
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
    if (err.message === 'Network Error') {
      return {
        message: 'Check your Network Connection',
      }
    }
    return err.response.data.errors
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
    if (err.message === 'Network Error') {
      return {
        message: 'Check your Network Connection',
      }
    }
    return err.response.data.errors
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
    if (err.message === 'Network Error') {
      return {
        message: 'Check your Network Connection',
      }
    }
    return err.response.data.errors
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
// http://kata.academy:8022/
// https://conduit.productionready.io/api/
