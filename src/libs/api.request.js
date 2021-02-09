import HttpRequest from '@/libs/api.axios'

const baseURL = process.env.NODE_ENV === 'development' ? '/api' : '/api'
console.log(baseURL)
const axios = new HttpRequest(baseURL)
export default axios
