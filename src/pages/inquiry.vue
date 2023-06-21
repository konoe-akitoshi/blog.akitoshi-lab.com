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
    margin: 0 auto 0;
    padding-top: 112px;
    padding-bottom: 50px;
}

.form{
    width: 100%;
    height: 1000px;
}

@media (max-width: 1024px) {
    .main {
        max-width: 600px;
        position: relative;
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
    }
    .form{
    width: 100%;
    height: 1000px;
}
}

img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
    text-align: center;
}

.content {}


.content-sec {
    font-size: 36px;
    color: #26272b;
    margin-bottom: 10px;
}

.content-sec-line {
    color: #26272b;
    margin-top: 0px;
    margin-bottom: 20px;
}

hr {
    display: block;
    height: 2px;
    padding: 0;
    margin: 30px 0;
    line-height: 0;
    border: 0;
    background-color: #3E4250;
}
</style>