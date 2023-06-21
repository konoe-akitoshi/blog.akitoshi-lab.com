<script setup lang="ts">
import { config } from '../settings/site-settings';
</script>

<template>
    <main class="main">
        <h1>プライバシーポリシー</h1>
        <div class="content">
            <h2 class="content-sec">
                個人情報の利用目的
            </h2>
            <hr class="content-sec-line" noshade="">
            <h3>
                当サイトでは，お問い合わせや記事へのコメントの際，名前やメールアドレス等の個人情報を入力して頂く場合がございます．取得した個人情報は，お問い合わせに対する回答や必要な情報を電子メールなどでご連絡する場合に利用させて頂くものであり，これらの目的以外では利用しません．
            </h3>
        </div>
        <div class="content">
            <h2 class="content-sec">
                アクセス解析ツールについて
            </h2>
            <hr class="content-sec-line" noshade="">
            <h3>
                当サイトでは Google によるアクセス解析ツールである ”Google アナリティクス” を利用しており，この Google アナリティクスはトラフィックデータの収集のためにクッキー (Cookie)
                を使用しております．トラフィックデータは匿名で収集されており，個人を特定するものではありません．
            </h3>
        </div>
        <div class="content">
            <h2 class="content-sec">
                広告について
            </h2>
            <hr class="content-sec-line" noshade="">
            <h3>
                当サイトでは第三者配信の広告サービス ”Google AdSense” を利用しており，ユーザーの興味に応じた商品やサービスの広告を表示するため，Cookie を使用しています．
            </h3>
            <h3>
                Cookie を使用することで当サイトはお客様のコンピュータを識別できるようになりますが，お客様個人を特定できるものではありません．
            </h3>
            <h3>
                これらの機能は Cookie を無効にすることで収集を拒否することが出来ますので，お使いのブラウザの設定をご確認ください．この規約に関しての詳細はGoogleアナリティクスサービス利用規約のページやGoogleポリシーと規約ページをご覧ください．
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