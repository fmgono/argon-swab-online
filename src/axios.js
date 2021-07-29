import axios from 'axios'

const instanceAxios = axios.create({
  baseURL: 'http://58.147.185.2:3000'
})

export default instanceAxios