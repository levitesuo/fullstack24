import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getBlog = (id) => {
  const request = axios.get(baseUrl+'/'+id)
  return request.then(response => response.data)
}

const newBlog = async content => {

  const request = await axios.post(
    baseUrl,
    content,
    {
      headers:
      { Authorization: 'Bearer ' + JSON.parse(window.localStorage.getItem('loggedBlogsappUser')).token }
    }
  )
  return request.data
}

const updateLikes = async (id, likes) => {
  const request = await axios.put(
    baseUrl+'/'+id,
    { likes }
  )
  console.log(request)
  return request.data
}

const deleteBlog = async (id) => {
  const request = await axios.delete(
    baseUrl+'/'+id
  )
  return request.data
}

export default { getAll, newBlog, updateLikes, deleteBlog, getBlog }