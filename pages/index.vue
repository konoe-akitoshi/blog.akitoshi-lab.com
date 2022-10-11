
<template>
  <div class="wrapper">
    // Header
    <div class="divider">
      <div class="container">
        <Breadcrumb :category="selectedCategory" :tag="selectedTag" />
        <div v-show="contents.length === 0" class="loader">
          記事がありません
        </div>
        <ul>
          <li v-for="content in contents" :key="content.id" class="list">
            <nuxt-link :to="`/${content.id}/`" class="link">
              <picture v-if="content.thumbnail">
                <img
                  :src="content.thumbnail.url"
                  :width="content.thumbnail.width"
                  :height="content.thumbnail.height"
                  class="ogimage lazyload"
                  alt
                />
              </picture>
              <dl class="content-back">
                <dl class="content">
                  <dt class="title">{{ content.title }}</dt>
                  <dd>
                    <Meta :created-at="content.date" :tags="content.tag" />
                  </dd>
                </dl>
              </dl>
            </nuxt-link>
          </li>
        </ul>
        <Pagination
          v-if="contents.length > 0"
          :pager="pager"
          :current="Number(page)"
          :category="selectedCategory"
          :tag="selectedTag"
        />
      </div>
      <aside class="aside"></aside>
    </div>
    // Footer
  </div>
</template>


<script>
/*
import { client } from "../libs/client";

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });

  return {
    props: {
      blog: data.contents,
    },
  };
};
*/

import axios from "axios";
export default {
  async asyncData() {
    const { data } = await axios.get(
      // your-service-id部分は自分のサービスidに置き換えてください
      "https://akitoshi-lab.microcms.io/api/v1/blog",
      {
        // your-api-key部分は自分のapi-keyに置き換えてください
        headers: {
          "X-MICROCMS-API-KEY": "2e58c920057b4ccdb387c5bb4eb04ba5201c",
        },
      }
    );
    return data;
  },
};

</script>

<style lang="scss" scoped>
/*全体に対する設定*/
ul {
  list-style: none;
}
img {
  vertical-align: top;
}
a {
  color: #2b2c30;
  text-decoration: none;
}
/*パソコン画面に対する設定*/
@media (min-width: 1160px) {
  .loader {
    color: #ccc;
    font-size: 20px;
    text-align: center;
    padding: 150px;
  }
  .pager {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 40px 0 0;
  }
  .page {
    width: 40px;
    height: 40px;
    background-color: #e5eff9;
    border-radius: 5px;
    margin: 10px;
    &.active {
      background-color: #3067af;
      a {
        color: #fff;
      }
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #3067af;
    }
  }
  .divider {
    display: flex;
    justify-content: space-between;
    width: 1160px;
    margin: 20px auto 0;
  }
  .container {
    width: 820px;
  }
  .aside {
    width: 300px;
  }
  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 300px;
    height: 250px;
    background-color: #2b2c30;
    color: #fff;
    border-radius: 5px;
    img {
      width: 160px;
      margin-top: 10px;
    }
    p {
      margin-top: 30px;
      color: #999;
      padding-top: 10px;
      font-size: 14px;
      width: 260px;
      text-align: center;
      border-top: 1px solid #666;
    }
    span {
      display: block;
      border: 1px solid #fff;
      width: 120px;
      margin: 0 auto;
      text-align: center;
      margin-top: 10px;
      padding: 4px 0;
      font-size: 14px;
    }
  }
  .pageTitle {
    font-size: 24px;
    font-weight: bold;
  }
  .list {
    padding: 20px 0;
  }
  .link {
    display: flex;
    justify-content: space-between;
    box-shadow: 0 2px 8px 0 rgb(0 0 0 / 25%);
    border-radius: 5px;
  }
  .ogimage {
    width: 335px;
    height: auto;
    border-radius: 5px 0 0 5px;
  }
  .content-back {
    flex: 1;
    margin: 0;
    background-color: #ccc;
    border-radius: 0 5px 5px 0;
  }
  .content {
    margin: 20px 10px 0 40px;
  }
  .title {
    font-size: 20px;
    font-weight: bold;
  }
}
@media (min-width: 820px) and (max-width: 1160px) {
  .loader {
    color: #ccc;
    font-size: 16px;
    padding-top: 20px;
  }
  .pager {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 40px 0 0;
  }
  .page {
    width: 40px;
    height: 40px;
    background-color: #e5eff9;
    border-radius: 5px;
    margin: 10px;
    &.active {
      background-color: #3067af;
      a {
        color: #fff;
      }
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #3067af;
    }
  }
  .divider {
    margin: 20px auto 0;
    width: 740px;
  }
  .article {
    width: 740px;
  }
  .aside {
    margin-top: 60px;
  }
  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 300px;
    height: 250px;
    background-color: #2b2c30;
    color: #fff;
    border-radius: 5px;
    img {
      width: 160px;
      margin-top: 10px;
    }
    p {
      margin-top: 30px;
      color: #999;
      padding-top: 10px;
      font-size: 14px;
      width: 260px;
      text-align: center;
      border-top: 1px solid #666;
    }
    span {
      display: block;
      border: 1px solid #fff;
      width: 120px;
      margin: 0 auto;
      text-align: center;
      margin-top: 10px;
      padding: 4px 0;
      font-size: 14px;
    }
  }
  .pageTitle {
    font-size: 24px;
    font-weight: bold;
  }
  .list {
    padding: 20px 0;
  }
  .link {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 2px 10px;
    box-shadow: 0 9px 18px 0 rgb(0 0 0 / 25%);
    border-radius: 5px;
    background-color: #ccc;
  }
  .ogimage {
    width: 335px;
    height: auto;
    border-radius: 5px;
  }
  .content {
    flex: 1;
    margin-left: 40px;
  }
  .title {
    font-size: 20px;
    font-weight: bold;
  }
}
@media (max-width: 820px) {
  .loader {
    color: #ccc;
    font-size: 16px;
    padding-top: 20px;
  }
  .pager {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 40px 0 0;
  }
  .page {
    width: 32px;
    height: 32px;
    background-color: #e5eff9;
    border-radius: 5px;
    margin: 6px;
    &.active {
      background-color: #3067af;
      a {
        color: #fff;
      }
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #3067af;
    }
  }
  .divider {
    margin: 20px 0 0;
    padding: 0 20px;
  }
  .article {
    width: 100%;
  }
  .aside {
    margin-top: 60px;
    width: 100%;
  }
  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 250px;
    background-color: #2b2c30;
    color: #fff;
    border-radius: 5px;
    img {
      width: 160px;
      margin-top: 10px;
    }
    p {
      margin-top: 30px;
      color: #999;
      padding-top: 10px;
      font-size: 14px;
      width: 260px;
      text-align: center;
      border-top: 1px solid #666;
    }
    span {
      display: block;
      border: 1px solid #fff;
      width: 120px;
      margin: 0 auto;
      text-align: center;
      margin-top: 10px;
      padding: 4px 0;
      font-size: 14px;
    }
  }
  .pageTitle {
    font-size: 24px;
    font-weight: bold;
  }
  .list {
    padding: 32px 0 0;
    border-bottom: 1px solid #eee;
    &:first-child {
      padding-top: 16px;
    }
  }
  .ogimage {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
  .title {
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
  }
}
</style>