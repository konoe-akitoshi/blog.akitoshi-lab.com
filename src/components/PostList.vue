<!-- src/components/PostList.vue -->
<script setup lang="ts">
import { Post } from "../types/blog";

type Props = {
  posts: Post[];
};

const { posts } = defineProps<Props>();
</script>

<template>
  <div>
    <article class="article" v-for="post in posts" :key="post.id">
      <span class="published">{{ $formatDate(String(post.publishedAt)) }}</span>
      <span v-for="tag in post.tag" :key="tag.id" class="tag">{{
        tag.name
      }}</span>
      <nuxt-link class="link" :to="`/${post.id}`">
        <img class="thumbnail" v-if="post.thumbnail" src="${post.thumbnail.url}?w=450&h=230&fit=crop&fm=webp&lossless=true&auto=format" />
        <h1 class="title">
          {{ post.title }}
        </h1>
      </nuxt-link>
    </article>
  </div>
</template>

<style scoped>
.article {
  margin-top: 1rem;
  margin-bottom: 6rem;
  width: 100%;
  align-items: center;
}

.published {
  font-size: 1.4rem;
  color: #888;
  margin-right: 20px;
}

.link {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.thumbnail {
  width: 335px;
  height: 176px;
  object-fit: cover;
  border-radius: 5px;
}

.title {
  flex: 1;
  margin-top: 6px;
  margin-left: 40px;
  font-size: 2.8rem;
  color: #0d1a3c;
  line-height: 1.6;
  font-weight: bold;
}

.title:hover {
  opacity: 0.5;
}

.tag {
  font-size: 1.4rem;
  color: 888;
  opacity: 0.7;
  letter-spacing: 1px;
  margin-right: 1rem;
}
</style>

function defineProps<T>(): { posts: any; } {
  throw new Error("Function not implemented.");
}

function defineProps<T>(): { posts: any; } {
  throw new Error("Function not implemented.");
}

function defineProps<T>(): { posts: any; } {
  throw new Error("Function not implemented.");
}
