import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const newBlog = async content => {

  const request = await axios.post(
    baseUrl, 
    content, 
    {
      headers: 
      {Authorization: 'Bearer ' + JSON.parse(window.localStorage.getItem('loggedBlogsappUser')).token }
    }
  )
  return request.data
}

export default { getAll, newBlog }