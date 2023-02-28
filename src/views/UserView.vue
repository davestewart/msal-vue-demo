<template>
  <h1>User</h1>

  <!-- api data -->
  <h2>API data</h2>
  <pre>{{ user.data }}</pre>

  <!-- msal account data -->
  <h2>MSAL data</h2>
  <pre>{{ auth.account }}</pre>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { user } from '@/stores/user'
import { auth } from '@/stores/auth'

// using options api as setup script doesn't seem to support before route enter?
export default defineComponent({
  computed: {
    user: () => user,
    auth: () => auth,
  },

  beforeRouteEnter(to, from, next) {
    !user.data
      ? user.load().then(next)
      : next()
  }
})
</script>
