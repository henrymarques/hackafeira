import axios from 'axios'

const api = axios.create({
  baseURL: 'http://172.30.0.64:8080'
})

export default api