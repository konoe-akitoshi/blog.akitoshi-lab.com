<template>
  <footer class="footer">
    <ul class="footer_link">
      <li class="link">
        <nuxt-link :to="`/copyright`">掲載情報について</nuxt-link>
      </li>
      <li class="link">
        <nuxt-link :to="`/disclaimer`">免責事項</nuxt-link>
      </li>
      <li class="link">
        <nuxt-link :to="`/privacy`">プライバシーポリシー</nuxt-link>
      </li>
      <li class="link">
        <nuxt-link :to="`/inquiry`">お問い合わせ</nuxt-link>
      </li>
    </ul>
    <div class="wrapper">
      <p class="text"><small>© 2023 Akitoshi Saeki</small></p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #101010;
  text-align: center;
  padding: 1rem;
}

.wrapper {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 4%;
}

.text {
  color: #fff;
  font-size: 1.5rem;
}

.footer_link {
  text-align: center !important;
  margin-bottom: 1rem;
}

.link {
  display: inline-block;
}

.link a {
  font-size: .9rem;
  color: #dbdbdb;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
}

.link::after {
  content: "|";
  color: #b5b5b5;
}
</style>
