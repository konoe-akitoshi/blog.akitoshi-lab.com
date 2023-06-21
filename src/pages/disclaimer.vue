<script setup lang="ts">
import { config } from '../settings/site-settings';
</script>

<template>
    <main class="main">
        <h1>免責事項</h1>
        <div class="content">
            <h3>
                当サイトからのリンクやバナーなどで移動したサイトで提供される情報，サービスについて一切の責任を負いかねます．
            </h3>
            <h3>
                また，当サイトに投稿しているコンテンツ・情報は個人の見解であり，所属する企業・組織の公式見解ではありません．できる限り正確な情報を提供するように努めておりますが，正確性や安全性を保証するものでもありません．
            </h3>
            <h3>
                当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください．
            </h3>
        </div>
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