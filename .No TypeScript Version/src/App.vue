<template>
  <div class="container">
    <!-- menu -->
    <nav>
      <template v-if="auth.account">
        <router-link to="/">Home</router-link>
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/logout">Logout</router-link>
      </template>
    </nav>
    <!-- view -->
    <main>
      <RouterView />
    </main>
    <!-- error -->
    <div id="error" v-if="auth.error">{{ auth.error }}</div>
    </div>
</template>
 
<script>
  import { RouterLink, RouterView } from 'vue-router'
  import { auth } from './stores/auth'
  import 'bootstrap/dist/css/bootstrap.min.css';

  export default {
    name: 'App',
    setup() {
      return {
        auth
      }
    },
  }
</script>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

html, body {
  line-height: 1.6;
  font-size: 15px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
  Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

main, nav {
  margin: 1rem;
}

nav {
 a {
    display: inline-block;
    border-left: 1px solid #CCC;
    padding: 0 .5rem;
    color: #BBB;
  }

  a:first-child {
    margin-left: -.5rem;
    border-left: none;
  }
}

a {
  text-decoration: none;
  color: dodgerblue;

  &:hover {
    text-decoration: underline;
  }

  &:hover {
    color: black;
  }

  &.router-link-active {
    color: dodgerblue;
    pointer-events: none;
  }

}

h1, h2, h3 {
  margin: .75em 0;
  line-height: 1;
}

pre {
  margin: 1rem;
  padding: .75rem 1rem;
  border-radius: .5rem;
  font-size: .8rem;
  background: #F2F2F2;
  overflow: auto;
}

#error {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem;
  border: 1px solid #EEE;
  box-shadow: 0 1rem 2rem #0003;
  text-align: right;
  color: red;
}

</style>