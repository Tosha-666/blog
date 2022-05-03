import axios from 'axios'

export default axios.create({
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

const edit = async (data, token) => {
  const articleData = await axios({
    method: 'put',
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

export { create, edit, getArticle }
// https://api.realworld.io/
// http://kata.academy:8022/
// https://conduit.productionready.io/api/
