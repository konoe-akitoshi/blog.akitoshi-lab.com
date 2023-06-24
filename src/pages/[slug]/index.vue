<!-- src/pages/[slug]/index.vue -->
<script setup lang="ts">
import * as cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";
import useMathJax from "~/plugins/mathjax";

const route = useRoute();
const slug = String(route.params.slug);

const { data: article } = await useFetch(`/api/post-detail`, { params: { slug: slug } });

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

// hljsクラスをつける
const $ = cheerio.load(article.value.content);
$("pre code").each((_, elm) => {
  const result = hljs.highlightAuto($(elm).text());
  $(elm).html(result.value);
  $(elm).addClass("hljs");
});

// MathJaxのコードを追加
$("p").each((_, elm) => {
  const text = $(elm).html();
  const newText = text.replace(/\$\$?(.*?)\$\$?/gs, (match, p1) => {
    if (match.startsWith("$$") && match.endsWith("$$")) {
      return `<div>\\[${p1}\\]</div>`;
    } else {
      return `<span>\\(${p1}\\)</span>`;
    }
  });
  $(elm).html(newText);
});

const body = $.html();

// MathJaxの読み込みをトリガーする
useMathJax();

useDetailHead(article.value);
</script>

<template>
  <div>
    <Html lang="ja">
    <div class="main">
      <h1 class="title">{{ article.title }}</h1>
      <img class="thumbnail" alt="thumbnail" v-if="article.thumbnail"
        :src="article.thumbnail.url + '?w=720&h=480&fit=crop&fm=webp&lossless=true&auto=format'" />
      <FontAwesomeIcon icon="fa-regular fa-clock" />
      <span class="published">{{ $formatDate(article.publishedAt) }}</span>
      <FontAwesomeIcon icon="fa-solid fa-tags" />
      <span v-for="(tag, i) in article.tag" :key="tag.id" class="tag">{{ tag.name }}</span>
      <div class="md" v-html="body" />
    </div>

    </Html>
  </div>
</template>

<style scoped>
.main {
  position: relative;
  width: 720px;
  margin: 0 auto 0;
  padding: 112px 0;
  color: #0d1a3c;
  line-height: 1.6;
}

.published {
  font-size: 1.4rem;
  color: #888;
  margin-right: 20px;
}

.title {
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 2.4rem;
  color: #0d1a3c;
  line-height: 1.6;
}

.tag {
  font-size: 1.4rem;
  color: 888;
  opacity: 0.7;
  letter-spacing: 1px;
  margin-right: 12em;
}

.thumbnail {
  width: 100%;
  height: 20vw;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
}

.md:deep(*) {
  font-size: 1.6rem;
  font-weight: 500;
}

.md:deep(strong) {
  background-color: yellow;
}

.md:deep(img) {
  display: block;
  max-width: 100%;
  margin-top: 20px;
  margin-bottom: 0px;
  height: auto;
  border: solid 1px #ccc;
}

@media (max-width: 1024px) {
  .md:deep(img) {
    max-width: 100%;
  }
}

.md:deep(p) code {
  background-color: #eee;
  color: #333;
  padding: 0.2em 0.6em;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.md:deep(pre) {
  line-height: 1.2;
  background-color: #1d1f21;
  padding: 2% 4%;
  overflow-x: scroll;
}

.md:deep(pre) * {
  margin-bottom: 0;
  line-height: 1.4;
  font-weight: lighter;
}

.md:deep(blockquote) {
  padding: 15px;
  border-left: 5px solid #ccc;
  border-radius: 2px;
}

.md:deep(h1) {
  font-size: 24px;
  border-bottom: 1px solid #ccc;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
}

.md:deep(h2),
.md:deep(h3) {
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 10px;
  font-weight: bold;
}

.md:deep(h2) {
  border-bottom: 1px solid #ccc;
}

.md:deep(p) {
  font-size: 1.6rem;
  font-weight: 500;
}

.md:deep(.cp_embed_wrapper) {
  margin-top: 20px;
  margin-bottom: 20px;
}

.md:deep(a) {
  color: #1266f1;
}

.md:deep(a:hover) {
  opacity: 0.5;
}

.md:deep(ul),
.md:deep(ol) {
  padding-left: 1.5em;
  margin: 1rem 0;
  line-height: 1.7;
}

.md:deep(ul) {
  list-style-type: disc;
}

.md:deep(ol) {
  list-style-type: decimal;
}

.md:deep(ul) li,
.md:deep(ol) li {
  margin-bottom: 1rem;
}

@media (max-width: 600px) {
  .main {
    width: 90%;
    padding: 40px 0;
  }

  .published {
    font-size: 1.2rem;
  }

  .title {
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 1.8rem;
  }

  .tag {
    font-size: 1.2rem;
  }

  .thumbnail {
    height: 40vw;
  }

  .md:deep(*) {
    font-size: 1.4rem;
  }

  .md:deep(h1) {
    font-size: 20px;
  }

  .md:deep(h2),
  .md:deep(h3) {
    font-size: 18px;
  }

  .md:deep(p) {
    font-size: 1.4rem;
  }

  .md:deep(ul),
  .md:deep(ol) {
    padding-left: 1em;
    margin: 0.5rem 0;
    line-height: 1.5;
  }

  .md:deep(ul) li,
  .md:deep(ol) li {
    margin-bottom: 0.5rem;
  }
}
</style>