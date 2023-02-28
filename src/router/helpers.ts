import { NavigationClient } from '@azure/msal-browser'
import type { RouteRecordRaw } from 'vue-router'
import type { NavigationOptions } from '@azure/msal-browser'
import type { Router } from 'vue-router'

/**
 * Create component route
 */
export function route (path: string, view: string): RouteRecordRaw {
  return {
    path,
    component: () => import(`../views/${view}View.vue`)
  }
}

/**
 * Create hook route
 */
export function hook (path: string, callback: Function): RouteRecordRaw {
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
  private router: Router

  constructor (router: Router) {
    super()
    this.router = router
  }

  /**
   * Only called during redirects
   */
  navigateExternal (url: string, options: NavigationOptions): Promise<boolean> {
    return super.navigateExternal(url, options)
  }

  /**
   * Only called during popup completion
   */
  async navigateInternal (url: string, options: NavigationOptions): Promise<boolean> {
    const path = url.replace(location.origin, '')
    options.noHistory
      ? await this.router.replace(path)
      : await this.router.push(path)
    return true
  }
}
