import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.realworld.io/api/',
})
const create = async (data, token) => {
  const articleData = await axios({
    method: 'post',
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
    method: 'put',
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
    method: 'get',
    url: `https://api.realworld.io/api/articles/${slug}`,
    headers: {
      ...(token ? { 'Authorization': `Token ${token}` } : {}),
    },
  })
  return articleData.data.article
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

export { create, edit, getArticle, editProfileData, api, getUserData }
// https://api.realworld.io/
// http://kata.academy:8022/
// https://conduit.productionready.io/api/
