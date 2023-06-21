<!-- src/components.Home.vue -->
<script setup lang="ts">
import { MicroCMSQueries } from "microcms-js-sdk";
import { BLOG_PER_PAGE } from "../settings/site-settings";

type Props = {
  page: number;
  // オプショナルで追加
  tagId?: string;
};

const { page, tagId } = defineProps<Props>();

const limit = BLOG_PER_PAGE;
const queries: MicroCMSQueries = {
  limit: limit,
  offset: (page - 1) * limit,
};

//tagIdを渡されているときはqueriesに加える
if (tagId) {
  queries.filters = `tag[contains]${tagId}`;
}

const { data: posts } = await useFetch("/api/post-list", { params: queries });

// タグ一覧の取得
const { data: tags } = await useFetch("/api/tag-list");

const numPages = Math.ceil(posts.value.totalCount / limit);

useIndexHead();
</script>

<template>
  <div>
    <Html lang="ja">
      <section class="container">
        <div class="divider">
          <div class="main-content">
            <!-- 記事一覧 -->
            <PostList :posts="posts.contents" />
            <Pagination :numPages="numPages" :current="page" />
          </div>
          <aside class="aside">
            <!-- キーワード検索、タグ一覧 -->
            <SearchForm />
            <Tags :tags="tags.contents" :selectedTagId="tagId" />
          </aside>
        </div>
      </section>
    </Html>
  </div>
</template>

<style scoped>
.container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 40px 20px;
}

.divider {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.main-content {
  flex: 1;
  min-width: 70%;
  margin-right: 20px;
}

.aside {
  flex: 1;
  max-width: 300px;
}

@media (max-width: 1160px) {
  .container {
    max-width: 740px;
    padding: 20px;
  }

  .divider {
    flex-direction: column;
    margin-right: 0;
  }

  .main-content {
    margin-right: 0;
    margin-bottom: 40px;
  }

  .aside {
    width: 100%;
  }
}

@media (max-width: 820px) {
  .main-content,
  .aside {
    min-width: 100%;
    max-width: 100%;
  }
}
</style>