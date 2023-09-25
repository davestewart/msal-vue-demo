<template>
  <h1>Home</h1>
  <p v-if="auth.account">Welcome!</p>
  <p v-else>Click to <router-link to="/login">login</router-link>.</p>
</template>

<script>
  import { auth } from '../stores/auth'
  export default {
  setup() {
      // You can use 'auth' directly in the setup function
      return {
        auth
      }
    },
  }
</script>