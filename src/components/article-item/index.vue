<template>
  <van-cell
    class="article-item"
    :to="{ name: 'article', params: { articleId: article.art_id } }"
  >
    <div slot="title" class="title van-multi-ellipsis--l3">
      {{ article.title }}
    </div>
    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div
          class="cover-wrap-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image width="116" height="73" fit="cover" :src="img" />
        </div>
      </div>
      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}</span>
        <span>{{ getRealyTime(article.pubdate) }}</span>
      </div>
    </div>

    <van-image
      v-if="article.cover.type === 1"
      width="116"
      height="73"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
import { getTimeGone } from "@/utils/dayjs";

export default {
  name: "articleitem",
  data() {
    return {};
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getRealyTime(value) {
      return getTimeGone(value);
    },
  },
};
</script>

<style scope lang='less'>
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/ .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }

  .cover-wrap {
    display: flex;
    padding: 15px 0;
    .cover-wrap-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item {
        width: 100%;
        height: 73px;
      }
    }
  }

  .label-wrap {
    position: absolute;
    font-size: 11px;
    color: #b4b4b4b4;
    bottom: 0;

    span {
      margin-right: 12px;
    }
  }
}
</style>