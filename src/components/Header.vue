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
                    <nuxt-link :to='`/`'>
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
    <div class="empty"></div>
</template>

<style scoped>
.header {
    padding: 15px 10% 15px;
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #101010;
    align-items: center;
    z-index: 10;
}

.container {
    align-items: center;
    right: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    max-width: 100%;
    vertical-align: baseline;
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
}

.nav-item {
    margin-right: 1.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    letter-spacing: 1px;
}

a {
    color: #fff;

    &:hover {
        opacity: 0.6;
    }
}

.empty {
    height: 40px;
    margin-bottom: 40px;
}
</style>
