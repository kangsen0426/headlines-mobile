<template>
  <div class="home-container">
    <van-nav-bar class="app-nav-bar">
      <van-button slot="title" icon="search" type="info" class="search-btn"
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- 文章列表 -->
    <van-tabs v-model="active" class="channel-tabs">
      <van-tab :title="item.name" v-for="item in chennels" :key="item.id">
        <!-- 文章列表 -->
        <articlelist :channel="item"></articlelist>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import articlelist from "./components/article-list.vue";

export default {
  name: "home",
  components: {
    articlelist,
  },
  data() {
    return {
      active: 0,
      chennels: [],
    };
  },
  created() {
    this.loadChannels();
  },
  methods: {
    async loadChannels() {
      //请求文章数据
      const { data } = await getUserChannels();
      this.chennels = data.data.channels;
    },
  },
};
</script>

<style scoped lang='less'>
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: unset;

    .search-btn {
      width: 277px;
      height: 32px;
      border-radius: 20px;
      background-color: #5babfb;
    }
  }

  /deep/ .van-tab {
    border-bottom: 1px solid #edeff3;
  }
  /deep/ .van-tabs__line {
    width: 15px;
    height: 3px;
    background-color: #3296fa;
    bottom: 20px;
  }
}
</style>