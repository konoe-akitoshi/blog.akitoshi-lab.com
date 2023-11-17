<script setup lang="ts">
import { config } from '../settings/site-settings';
</script>

<template>
    <main class="main">
        <h1>掲載情報について</h1>
        <div class="content">
            <h2 class="content-sec">
                著作権について
            </h2>
            <hr class="content-sec-line" noshade="">
            <p>
                当サイトで掲載している文章や画像等につきましては，無断転載することを禁止します．
            </p>
            <p>
                当サイトは著作権や肖像権の侵害を目的としたものではありません．著作権や肖像権に関して問題がございましたらご連絡ください．迅速に対応いたします．
            </p>
        </div>
        <div class="content">
            <h2 class="content-sec">
                リンクについて
            </h2>
            <hr class="content-sec-line" noshade="">
            <p>
                当サイトは基本的にリンクフリーです．リンクを行う場合の許可や連絡は不要です．
            </p>
            <p>
                ただし，インラインフレームの仕様や画像の直リンクはご遠慮ください．
            </p>
        </div>
    </main>
</template>
  
<style scoped>
.main {
    position: relative;
    width: 720px;
    margin: 0 auto;
    padding-top: 40px;
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