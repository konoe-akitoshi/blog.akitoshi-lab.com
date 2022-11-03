<!-- client/pages/[slug]/index.vue -->
<script setup lang="ts">

const route = useRoute();
const slug: string | string[] = route.params.slug;

const { data: article } = await useFetch(`/api/post_detail`, {
  params: { slug: slug },
});

</script>

<template>
  <div class="main">
    <!--<span class="published">{{ $formatDate(article.publishedAt) }}</span>-->
    <span v-for="(tag, i) in article.tag" :key="tag.id" class="tag">{{ tag.name }}
      <span v-if="i !== article.tag.length - 1" style="margin:0 2px;">
        /
      </span>
    </span>
    <h1 class="title">{{ article.title }}</h1>
    <div class="markdown-body" v-html="article.text" />
  </div>
</template>

<style scoped>
.published {
  font-size: 1.4rem;
  color: #888;
  margin-right: 20px;
}

.title {
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 20px;
  color: #0d1a3c;
  line-height: 1.6;
}

.tag {
  font-size: 1.4rem;
  color: 888;
  opacity: 0.7;
  letter-spacing: 1px;
  margin-right: 1rem;
}
</style>
