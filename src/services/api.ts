import { root } from '@/config/api'
import { Auth } from './auth'

/**
 * Api service
 */
export const Api = {
  get (path: string, data?: any) {
    return call('get', path, data)
  },

  post (path: string, data?: any) {
    return call('post', path, data)
  }
}

/**
 * Fetch wrapper
 */
async function call (method: 'get' | 'post', path: string, data?: any) {
  const token = await Auth.getToken()
  const options: RequestInit = {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }
  if (data) {
    method === 'get'
      ? path += `?${new URLSearchParams(data).toString()}`
      : options['body'] = JSON.stringify(data)
  }

  return fetch(`${root}${path}`, options)
    .then(response => response.json())
}
