import axios from 'axios'

export default axios.create({
  baseURL: 'https://api.realworld.io/',
})
const create = async (data, token) => {
  const articleData = await axios({
    method: 'post',
    url: 'https://api.realworld.io/api/articles',
    headers: {
      'Authorization':
        'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdlbm5hZGlqLm1pbmFrb2ZmZkB5YW5kZXgucnUiLCJ1c2VybmFtZSI6ImZlZG9yYV90dXRjaGV2YV8xMDMiLCJpYXQiOjE2NTExNDUyNzEsImV4cCI6MTY1NjMyOTI3MX0.IkH6ITnaXmNMHDYX-SyGDdO_x0mOy2FBspJ_ukuKDqg',
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
      'Authorization':
        'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdlbm5hZGlqLm1pbmFrb2ZmZkB5YW5kZXgucnUiLCJ1c2VybmFtZSI6ImZlZG9yYV90dXRjaGV2YV8xMDMiLCJpYXQiOjE2NTExNDUyNzEsImV4cCI6MTY1NjMyOTI3MX0.IkH6ITnaXmNMHDYX-SyGDdO_x0mOy2FBspJ_ukuKDqg',
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
