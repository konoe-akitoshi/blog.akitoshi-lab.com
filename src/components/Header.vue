<script setup lang="ts">

import { config } from '../settings/site-settings'

</script>

<!--
<template>
  <header class="header wrapper">
    <nuxt-link :to="`/`">
      <h1 class="title">Akitoshi Lab.</h1>
    </nuxt-link>
  </header>
</template>
-->

<template>
  <header class="header">
      <div class="container">
          <nuxt-link :to='`/`'>
              <h1 class="site-title">
                  {{ config.siteName }}
              </h1>
          </nuxt-link>
          <nav class="main-nav">
              <!--
              <li class="nav-item">
                  <a :href="config.social.repos" target="_blank" rel="noopener noreferrer">
                      GitHub
                  </a>
              </li>
              -->
              <li class="nav-item">
                  <nuxt-link :to='`/index`'>
                      HOME
                  </nuxt-link>
              </li>
              <li class="nav-item">
                  <nuxt-link :to='`/about`'>
                      ABOUT
                  </nuxt-link>
              </li>
          </nav>
      </div>
  </header>
</template>

<style scoped>
.header {
  padding: 10px 5% 10px;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #101010;
  display: flex;
  align-items: center;
  z-index: 10;
}

.container {
  max-width: 100%;
  margin: 0 auto;
}

.site-title {
  font-size: 2rem;
  color: #fff;
  margin: 0;
  padding: 0;
  padding-bottom: 3px;
  line-height: 1.4em;
  justify-content: center;
  letter-spacing: 1px;
}

.main-nav {
    list-style: none;
    margin: 0;
    display: flex;
    align-items: center;

    .nav-item {
        margin-right: 1.5rem;
        font-size: var(--font-size-base);
        font-weight: bold;
        letter-spacing: 1px;
    }

    a {
        color: var(--qlitre-colors-black);

        &:hover {
            opacity: 0.6;
        }
    }
}
</style>
