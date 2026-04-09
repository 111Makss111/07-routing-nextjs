import axios from 'axios'

const notehubApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
})

export function getAuthHeaders() {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN

  if (!token) {
    throw new Error('NEXT_PUBLIC_NOTEHUB_TOKEN is not defined')
  }

  return {
    Authorization: `Bearer ${token}`,
  }
}

export default notehubApi
