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
  margin: 20px auto;
  padding-top: 84px;
  display: flex;
  justify-content: center;
}

.divider {
  display: flex;
}

.main-content {
  flex: 1;
  margin-right: 40px;
}

.aside {
  width: 300px;
}

@media (max-width: 1160px) {
  .container {
    max-width: 740px;
    padding-top: 112px;
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
  .container {
    padding: 0 20px;
    padding-top: 112px;
  }
}
</style>
