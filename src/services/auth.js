import {
  BrowserAuthError,
  InteractionRequiredAuthError,
  NavigationClient,
  PublicClientApplication
} from '@azure/msal-browser'
import { config, scopes } from '../config/auth'

/**
 * MSAL instance
 */
export const msal = new PublicClientApplication(config)
await msal.initialize()

/**
 * Auth service
 */
export const Auth = {
  /**
   * Initialize and return active account
   */
  async initialize (client) {
    // start msal
    await msal.handleRedirectPromise()

    // hook into application router
    if (client) {
      msal.setNavigationClient(client)
    }

    // grab and set account if in session
    const accounts = msal.getAllAccounts()
    if (accounts?.length) {
      this.setAccount(accounts[0])
    }

    // return any active account
    return msal.getActiveAccount()
  },

  /**
   * Login
   */
  async login () {
    const request = {
      redirectUri: config.auth.redirectUri,
      scopes,
    }
    return msal
      .loginPopup(request)
      .then(result => {
        // could do something with the AuthResult here if you need to
        console.log('Logged in with', result)

        // set active account
        return this.setAccount(result.account)
      })
      .catch((error) => {
        // if we get stuck, clear session and attempt to log in again
        if (error.errorCode === 'interaction_in_progress') {
          this.reset()
          return this.login()
        }
        throw(new Error(error.errorMessage))
      })
  },

  /**
   * Logout
   */
  async logout () {
    return msal.logoutPopup({
      // required to make the application return to the home page
      mainWindowRedirectUri: '/'
    })
  },

  /**
   * Get token for api
   */
  async getToken () {
    const request = {
      scopes
    }
    return msal
      // try getting the token silently
      .acquireTokenSilent(request)

      // attempt login popup if this fails
      .catch(async (error) => {
        if (error instanceof InteractionRequiredAuthError) {
          return msal.acquireTokenPopup(request)
        }
        throw error
      })
      .then((result) => {
        return result.accessToken
      })
  },

  /**
   * Set active account
   * @private
   */
  setAccount (account) {
    msal.setActiveAccount(account)
    return account
  },

  /**
   * Escape hatch when msal gets stuck
   * @private
   */
  reset () {
    sessionStorage.clear()
  },
}