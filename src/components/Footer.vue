<template>
  <footer class="footer">
    <ul class="footer_links">
      <li class="link">
        <nuxt-link :to="`/copyright/`">掲載情報について</nuxt-link>
      </li>
      <li class="link">
        <nuxt-link :to="`/disclaimer/`">免責事項</nuxt-link>
      </li>
      <li class="link">
        <nuxt-link :to="`/privacy/`">プライバシーポリシー</nuxt-link>
      </li>
      <li class="link">
        <nuxt-link :to="`/inquiry/`">お問い合わせ</nuxt-link>
      </li>
    </ul>
    <div class="wrapper">
      <p class="copyright_text"><small>© 2023 Akitoshi Saeki</small></p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #101010;
  text-align: center;
  padding: 2rem 1rem;
  color: #dbdbdb;
  font-size: 1.1rem; /* 0.9remから1.1remに変更 */
}

.wrapper {
  max-width: 1100px;
  margin: 0 auto;
}

.copyright_text {
  margin-top: 1rem;
}

.footer_links {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.link {
  display: inline-block;
  margin: 0 0.5rem;
}

.link:not(:last-child)::after {
  content: "|";
  color: #b5b5b5;
  margin-left: 0.5rem;
}

.link a {
  color: #dbdbdb;
  transition: color 0.3s;
}

.link a:hover {
  color: #fff;
}
</style>