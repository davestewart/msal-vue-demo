<template>
  <h1>Home</h1>
  <p v-if="auth.account">Welcome!</p>
  <p v-else>Click to <router-link to="/login">login</router-link>.</p>
</template>

<script lang="ts" setup>
import { auth } from '@/stores/auth'
</script>
