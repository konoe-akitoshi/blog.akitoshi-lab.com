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
      <nuxt-link class="link" :to="`/${post.id}`">
        <img class="thumbnail" alt="thumbnail" v-if="post.thumbnail"
          :src="post.thumbnail.url + '?w=450&h=230&fit=crop&fm=webp&lossless=true&auto=format'" />
        <div class="title-box">
          <h1 class="title">
            {{ post.title }}
          </h1>
          <span class="published">{{ $formatDate(String(post.publishedAt)) }}</span>
          <div class="tags">
            <span v-for="tag in post.tag" :key="tag.id" class="tag">{{ tag.name }}</span>
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
  color: #616269;
  margin-right: 20px;
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

.published {
  font-size: 20px;
  color: #616269;
  margin-top: 10px;
  /* Adjust as needed */
}

.tags {
  display: flex;
  align-items: center;
  margin-top: 10px;
  /* Adjust as needed */
  margin-bottom: 20px;
}

.tag {
  font-size: 20px;
  color: #331cbf;
  opacity: 0.7;
  letter-spacing: 1px;
  margin-right: 10px;
  padding: 5px 8px;  /* added */
  border: 2px solid #331cbf;  /* added */
  border-radius: 4px;  /* added */
  transition: background-color 0.3s ease, color 0.3s ease;  /* added */
}

.tag:hover {
  background-color: #331cbf;  /* added */
  color: #fff;  /* added */
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
    font-size: 16px;
    margin-top: 10px;
  }

  .tags {
    margin-top: 5px;
  }

  .tag {
    font-size: 14px;
  }
}
</style>
