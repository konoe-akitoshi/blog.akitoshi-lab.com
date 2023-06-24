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
  padding: 30px 0;
}

.pageTitle {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
  font-weight: bold;
  color: #4481bd; /* Updated foreground color */
  background-color: #c8e4ff;
  padding: 12px 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pageTitle-text {
  padding-right: 8px;
  border-right: 2px solid #4481bd; /* Updated foreground color */
}

.list {
  border-bottom: 2px solid #ddd;
  list-style-type: none;
  padding: 6px 0;
}

.link,
.active {
  display: block;
  padding: 12px;
  color: #666;
  font-size: 1.8rem;
  text-decoration: none;
}

.active {
  color: #4481bd; /* Updated foreground color */
  font-weight: bold;
  background-color: #e0f0ff;
  border-radius: 4px;
}
</style>