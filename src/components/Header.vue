<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { config } from '../settings/site-settings'

let lastScrollPosition = 0;
const isHeaderVisible = ref(true);
let handleScroll;

onMounted(() => {
    handleScroll = () => {
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScrollPosition < lastScrollPosition) {
            isHeaderVisible.value = true;
        } else {
            isHeaderVisible.value = false;
        }
        lastScrollPosition = currentScrollPosition;
    };

    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <header class="header" :class="{ 'header-hidden': !isHeaderVisible }">
        <div class="container">
            <nuxt-link :to="`/`">
                <h1 class="site-title">
                    {{ config.siteName }}
                </h1>
            </nuxt-link>
            <nav class="main-nav">
                <ul class="nav-list">
                    <li class="nav-item">
                        <nuxt-link :to="`/`">HOME</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link :to="`/about`">ABOUT</nuxt-link>
                    </li>
                </ul>
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
    font-size: 2.2rem;  /* updated */
    color: #fff;
    margin: 0;
    padding: 0;
    padding-bottom: 3px;
    line-height: 1.4em;
    justify-content: center;
    letter-spacing: 1px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.main-nav {
    margin: 0;
}

.nav-list {
    list-style: none;
    margin: 0;
    display: flex;
    align-items: center;
    padding: 0;
}

.nav-item {
    margin-right: 1.5rem;
}

.nav-item a {
    font-size: 1.7rem;  /* updated */
    font-weight: bold;
    color: #fff;
    text-decoration: none;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.nav-item a:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.empty {
    height: 40px;
    margin-bottom: 40px;
}

.header-hidden {
    transform: translateY(-100%);
    transition: transform 0.3s ease-in-out;
}

@media screen and (max-width: 768px) {
    .header {
        padding: 10px 5% 10px;
        transition: transform 0.3s ease-in-out;
    }

    .container {
        flex-direction: column;
    }

    .site-title {
        font-size: 1.7rem;  /* updated */
        text-align: center;
    }

    .main-nav {
        margin-top: 10px;
    }

    .nav-list {
        justify-content: center;
    }

    .nav-item {
        margin-right: 0;
        margin-bottom: 1rem;
    }

    .nav-item a {
        font-size: 1.4rem;  /* updated */
    }

    .header-hidden {
        transform: translateY(-100%);
        transition: transform 0.5s ease-in-out;
    }
}
</style>
