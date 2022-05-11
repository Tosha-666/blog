import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.realworld.io/api/',
})

const getArticles = async (token, offset, limit) => {
  const articles = await api.get('articles', {
    headers: {
      ...(token ? { 'Authorization': `Token ${token}` } : {}),
    },
    params: {
      limit: limit,
      offset: offset,
    },
  })
  if (articles.status === 200) {
    console.log(articles)
    return articles.data
  }
}

const create = async (data, token) => {
  const articleData = await axios({
    method: 'POST',
    url: 'https://api.realworld.io/api/articles',
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
}

const edit = async (data, token, slug) => {
  const articleData = await axios({
    method: 'PUT',
    url: `https://api.realworld.io/api/articles/${slug}`,
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
}

const getArticle = async (slug, token) => {
  const articleData = await axios({
    method: 'GET',
    url: `https://api.realworld.io/api/articles/${slug}`,
    headers: {
      ...(token ? { 'Authorization': `Token ${token}` } : {}),
    },
  })
  return articleData.data.article
}

const deleteArticle = async (slug, token) => {
  const delArticleData = await axios({
    method: 'DELETE',
    url: `https://api.realworld.io/api/articles/${slug}`,
    headers: {
      'Authorization': `Token ${token}`,
    },
  })
  return delArticleData
}
const editProfileData = async (newData, token) => {
  console.log(newData)
  const updateData = await axios({
    method: 'put',
    url: 'https://api.realworld.io/api/user',
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
}

const getUserData = async (token) => {
  const dataUser = await api.get('user', {
    headers: {
      'Authorization': `Token ${token}`,
    },
  })
  return dataUser.data.user
}

const registerNewUser = async (data) => {
  console.log(data)
  const regData = await api.post('users', {
    user: {
      username: data.userName,
      email: data.emailAddress,
      password: data.password,
    },
  })
  return regData
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
}
// https://api.realworld.io/
// http://kata.academy:8022/
// https://conduit.productionready.io/api/
