<script setup lang="ts">
import { config } from '../settings/site-settings';
</script>

<template>
    <main class="main">
        <h1>お問い合わせ</h1>
        <iframe class="form"
            src="https://docs.google.com/forms/d/e/1FAIpQLScjF4vlIwCpi4XJ8TUu7egPo2S_tCWWKn-N66NMA4qHZfY78Q/viewform?embedded=true"
            frameborder="0" marginheight="0" marginwidth="0">読み込んでいます…</iframe>
    </main>
</template>

<style scoped>
.main {
    position: relative;
    width: 720px;
    margin: 0 auto;
    padding-top: 112px;
    padding-bottom: 50px;
    font-family: Arial, sans-serif;
    line-height: 1.5;
}

.form {
    width: 100%;
    height: 1000px;
}

h1 {
    font-size: 48px;
    color: #26272b;
    text-align: center;
    margin-bottom: 40px;
}

h2 {
    font-size: 36px;
    color: #26272b;
    margin-bottom: 10px;
}

p {
    font-size: 18px;
    color: #26272b;
}

@media (max-width: 1024px) {
    .main {
        max-width: 600px;
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
    }

    .form {
        width: 100%;
        height: 1000px;
    }

    h1 {
        font-size: 36px;
    }

    h2 {
        font-size: 28px;
    }

    p {
        font-size: 16px;
    }
}

.content-sec-line {
    height: 2px;
    background-color: #3E4250;
    margin-top: 0;
    margin-bottom: 20px;
    border: none;
}

hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 1em 0;
    padding: 0;
}
</style>