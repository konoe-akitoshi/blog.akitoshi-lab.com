<script setup lang="ts">
// Import site settings
import { config } from '../settings/site-settings';
</script>

<template>
    <!-- Main content -->
    <main class="main">
        <h1>プライバシーポリシー</h1>

        <!-- Section: Personal Information Usage -->
        <div class="content">
            <h2 class="content-sec">個人情報の利用目的</h2>
            <hr class="content-sec-line">
            <p>
                当サイトでは，お問い合わせや記事へのコメントの際，名前やメールアドレス等の個人情報を入力して頂く場合がございます．取得した個人情報は，お問い合わせに対する回答や必要な情報を電子メールなどでご連絡する場合に利用させて頂くものであり，これらの目的以外では利用しません．
            </p>
        </div>

        <!-- Section: Access Analysis Tool -->
        <div class="content">
            <h2 class="content-sec">アクセス解析ツールについて</h2>
            <hr class="content-sec-line">
            <p>
                当サイトでは Google によるアクセス解析ツールである ”Google アナリティクス” を利用しており，この Google アナリティクスはトラフィックデータの収集のためにクッキー
                (Cookie)を使用しております．トラフィックデータは匿名で収集されており，個人を特定するものではありません．
            </p>
        </div>

        <!-- Section: Advertising -->
        <div class="content">
            <h2 class="content-sec">広告について</h2>
            <hr class="content-sec-line">
            <p>
                当サイトでは第三者配信の広告サービス ”Google AdSense” を利用しており，ユーザーの興味に応じた商品やサービスの広告を表示するため，Cookie を使用しています．Cookie
                を使用することで当サイトはお客様のコンピュータを識別できるようになりますが，お客様個人を特定できるものではありません．これらの機能は Cookie
                を無効にすることで収集を拒否することが出来ますので，お使いのブラウザの設定をご確認ください．この規約に関しての詳細はGoogleアナリティクスサービス利用規約のページやGoogleポリシーと規約ページをご覧ください．
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
}</style>