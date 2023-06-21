<!-- src/components/Tags.vue -->
<script setup lang="ts">
import { Tag } from "../types/blog";

type Props = {
  tags: Tag[];
  selectedTagId: string | undefined;
};

const { tags, selectedTagId } = defineProps<Props>();

function getClass(tagId: string) {
  if (tagId == selectedTagId) return "active";
  return "link";
}
</script>

<template>
  <div class="wrapper">
    <h1 class="pageTitle">タグ</h1>
    <ul>
      <li v-for="tag in tags" :key="tag.id" class="list">
        <NuxtLink :to="`/tags/${tag.id}/page/1`" :class="getClass(tag.id)">
          {{ tag.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 30px 0;  /* updated */
}

.pageTitle {
  font-size: 2.2rem;  /* updated */
  font-weight: bold;
  color: #5ba9f7;
  background-color: #c8e4ff;
  padding: 8px 12px;  /* updated */
  margin-bottom: 20px;  /* updated */
  border-radius: 8px;  /* updated */
}

.list {
  border-bottom: 2px solid #ddd;  /* updated */
  list-style-type: none;
  padding: 6px 0;  /* added */
}

.link,
.active {
  display: block;
  padding: 12px;  /* updated */
  color: #666;  /* updated */
  font-size: 1.8rem;  /* updated */
  text-decoration: none;  /* added */
}

.active {
  color: #5ba9f7;
  font-weight: bold;  /* added */
  background-color: #e0f0ff;  /* added */
  border-radius: 4px;  /* added */
}
</style>