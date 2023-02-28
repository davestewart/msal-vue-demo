import { ref, reactive } from 'vue'
import { Auth } from '@/services/auth'
import type { MaybeAccount } from '@/services/auth'
import type { NavigationClient } from '@azure/msal-browser'

export const initialized = ref(false)
export const account = ref<MaybeAccount>(null)
export const error = ref<string>()

async function initialize (client?: NavigationClient) {
  if (initialized.value === true) {
    return account.value
  }
  return Auth.initialize(client).then(data => {
    account.value = data
    return data
  })
}

async function login () {
  error.value = ''
  return Auth.login()
    .then(data => {
      account.value = data
      error.value = ''
    })
    .catch(err => {
      error.value = err.message
      throw(err)
    })
}

async function logout () {
  return Auth.logout().then(() => {
    account.value = null
  })
}

export const auth = reactive({
  error,
  account,
  initialized,
  initialize,
  login,
  logout,
})
