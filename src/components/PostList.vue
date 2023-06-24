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
      <nuxt-link class="link" :to="`/${post.id}/`">
        <img class="thumbnail" alt="thumbnail" v-if="post.thumbnail"
          :src="post.thumbnail.url + '?w=450&h=230&fit=crop&fm=webp&lossless=true&auto=format'" />
        <div class="title-box">
          <h1 class="title">
            {{ post.title }}
          </h1>
          <div class="published">
            <font-awesome-icon :icon="['far', 'clock']" class="icon-clock" />
            <span class="published-info">{{ $formatDate(String(post.publishedAt)) }}</span>
          </div>
          <div class="tags">
            <font-awesome-icon :icon="['fas', 'tags']" class="icon-tags" />
            <div class="tags-info">
              <NuxtLink v-for="tag in post.tag" :to="`/tags/${tag.id}/page/1`" class="tag">{{ tag.name }}</NuxtLink>
            </div>
          </div>
        </div>
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
  margin-top: 10px;
}

.link {
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
}

.thumbnail {
  width: 335px;
  height: 176px;
  object-fit: cover;
  border-radius: 5px;
}

.title {
  flex: 1;
  font-size: 24px;
  color: #0d1a3c;
  line-height: 1.6;
  font-weight: bold;
}

.title:hover {
  opacity: 0.5;
}

.title-box {
  display: flex;
  margin-top: 6px;
  margin-left: 40px;
  flex-direction: column;
  justify-content: flex-start;
}

.published{
  display: flex;
  align-items: center;
  margin-bottom: 0.4rem;
}

.icon-clock {
  color: #0d1a3c;
  height: 2rem;
  width: 2rem;
  margin-right: 10px;
}

.published-info {
  font-size: 1.2rem;
  color: #000;
  margin-left: 1rem;
}

.tags {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.icon-tags {
  color: #0d1a3c;
  height: 2rem;
  width: 2rem;
  margin-right: 10px;
}

.tags-info {
  display: flex;
  align-items: center;
  margin-left: 1rem;
}

.tag {
  font-size: 1.2rem;
  color: #331cbf;
  opacity: 0.7;
  letter-spacing: 1px;
  margin-right: 10px;
  padding: 5px 8px;
  border: 2px solid #331cbf;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.tag:hover {
  background-color: #331cbf;
  color: #fff;
}

@media (max-width: 600px) {
  .link {
    flex-direction: column;
    align-items: flex-start;
  }

  .thumbnail {
    width: 100%;
    height: auto;
  }

  .title-box {
    margin-left: 0;
    margin-top: 20px;
  }

  .title {
    font-size: 20px;
    line-height: 1.4;
  }

  .published {
    font-size: 1.2rem;
    margin-top: 10px;
  }

  .tags {
    margin-top: 5px;
  }

  .tag {
    font-size: 1.2rem;
    padding: 3px 6px;
    border-radius: 4px;
    margin-right: 8px;
  }
}
</style>