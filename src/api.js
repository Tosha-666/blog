import axios from 'axios'

export default axios.create({
  baseURL: 'https://api.realworld.io/',
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
export { create, edit }
// https://api.realworld.io/
// http://kata.academy:8022/
