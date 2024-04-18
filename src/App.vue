<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'

import { VMain, VLayout, VAppBar, VAppBarNavIcon, VAppBarTitle, VBtn } from 'vuetify/components'

const router = useRouter()

const handleHomeButtonClick = () => {
  router.push('/')
}
</script>

<template>
  <!-- <header> -->
  <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
  <!-- <div class="wrapper">
      <nav> -->
  <!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->
  <!-- </nav>
    </div>
  </header> -->
  <v-layout>
    <v-app-bar :elevation="1">
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-app-bar-title id="home-button" @click="handleHomeButtonClick"
          >Golf Stats</v-app-bar-title
        >
        <!-- <RouterLink to="/">Golf Stats </RouterLink> -->
      </template>
    </v-app-bar>

    <v-main id="main">
      <div id="container">
        <RouterView />
      </div>
    </v-main>
  </v-layout>
</template>

<style scoped>
#main {
  width: 100%;
  height: 100%;
}

#container {
  width: 75vw;
  height: 100vh;
  margin: 0 auto;
  padding: 16px;
}

#home-button:hover {
  cursor: pointer;
}
/* header {
  line-height: 1.5;
  max-height: 100vh;
  background-color: black;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
} */

/* nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    background-color: blue;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
