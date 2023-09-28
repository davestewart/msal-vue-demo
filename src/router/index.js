import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../stores/auth'
import { hook, route, VueNavigationClient } from './helpers'

// ---------------------------------------------------------------------------------------------------------------------
// setup
// ---------------------------------------------------------------------------------------------------------------------

// special routes
const unmatched = '/:pathMatch(.*)*'
const unguarded = [
  '/',
  '/login',
  '/logout',
]

// create router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    route('/', 'Home'),
    route('/dashboard', 'Dashboard'),
    hook('/login', auth.login),
    hook('/logout', auth.logout),
    route(unmatched, '404'),
  ]
})

// ---------------------------------------------------------------------------------------------------------------------
// authentication
// ---------------------------------------------------------------------------------------------------------------------

// hook MSAL into router
const client = new VueNavigationClient(router)

// set up auth and guard routes
router.beforeEach(async (to, from, next) => {
  // 404
  if (to.matched[0]?.path === unmatched) {
    return next()
  }

  // guarded
  const guarded = unguarded.every(path => path !== to.path)
  if (guarded) {
    // initialized
    if (!auth.initialized) {
      await auth.initialize(client)
    }

    // authorised
    if (auth.account) {
      return next()
    }

    // unauthorised
    try {
      await auth.login()
      return next()
    }
    catch (err) {
      return next(false)
    }
  }

  // unguarded
  next()
})

// export
export default router