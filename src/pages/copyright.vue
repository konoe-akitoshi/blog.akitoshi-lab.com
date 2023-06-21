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
            <h3>
                当サイトで掲載している文章や画像等につきましては，無断転載することを禁止します．
            </h3>
            <h3>
                当サイトは著作権や肖像権の侵害を目的としたものではありません．著作権や肖像権に関して問題がございましたらご連絡ください．迅速に対応いたします．
            </h3>
        </div>
        <div class="content">
            <h2 class="content-sec">
                リンクについて
            </h2>
            <hr class="content-sec-line" noshade="">
            <h3>
                当サイトは基本的にリンクフリーです．リンクを行う場合の許可や連絡は不要です．
            </h3>
            <h3>
                ただし，インラインフレームの仕様や画像の直リンクはご遠慮ください．
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