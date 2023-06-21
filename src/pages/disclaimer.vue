<script setup lang="ts">
import { config } from '../settings/site-settings';
</script>

<template>
    <main class="main">
        <h1>免責事項</h1>
        <div class="content">
            <p>
                当サイトからのリンクやバナーなどで移動したサイトで提供される情報，サービスについて一切の責任を負いかねます．
            </p>
            <p>
                また，当サイトに投稿しているコンテンツ・情報は個人の見解であり，所属する企業・組織の公式見解ではありません．できる限り正確な情報を提供するように努めておりますが，正確性や安全性を保証するものでもありません．
            </p>
            <p>
                当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください．
            </p>
        </div>
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