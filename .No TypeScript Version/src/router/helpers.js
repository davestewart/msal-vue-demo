import { NavigationClient } from '@azure/msal-browser'

/**
 * Create component route
 */
export function route (path, view) {
  return {
    path,
    component: () => import(`../views/${view}View.vue`)
  }
}

/**
 * Create hook route
 */
export function hook (path, callback) {
  return {
    path,
    component: { render: () => null },
    beforeEnter: async (to, from, next) => {
      const result = await callback()
      result
        ? next()
        : next(false)
    }
  }
}

/**
 * Override MSAL route navigation
 */
export class VueNavigationClient extends NavigationClient {
  
  constructor (router) {
    super()
    this.router = router
  }

  /**
   * Only called during redirects
   */
  navigateExternal (url, options) {
    return super.navigateExternal(url, options)
  }

  /**
   * Only called during popup completion
   */
  async navigateInternal (url, options) {
    const path = url.replace(location.origin, '')
    options.noHistory
      ? await this.router.replace(path)
      : await this.router.push(path)
    return true
  }
}