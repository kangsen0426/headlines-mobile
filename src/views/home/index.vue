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

      <!-- 占位 -->
      <div slot="nav-right" class="lastRight"></div>

      <div
        slot="nav-right"
        class="nav-right-icon"
        @click="isChannelEditShow = true"
      >
        <van-icon name="wap-nav"></van-icon>
      </div>
    </van-tabs>

    <van-popup
      position="bottom"
      closeable
      get-container="body"
      :style="{ height: '100%' }"
      v-model="isChannelEditShow"
    >
      <channeledit
        :user-chennels="chennels"
        :isactive="active"
        @closed="isChannelEditShow = false"
        @updataActive="onUpdataActive"
      ></channeledit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import articlelist from "./components/article-list.vue";
import channeledit from "./components/channel-edit.vue";
import { getItem } from "@/utils/storage";
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    articlelist,
    channeledit,
  },
  data() {
    return {
      active: 0,
      chennels: [],
      isChannelEditShow: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.loadChannels();
  },
  methods: {
    async loadChannels() {
      try {
        let channels = [];
        if (this.user) {
          //以登入;
          //请求文章数据
          const { data } = await getUserChannels();
          channels = data.data.channels;
        } else {
          //未登入，检查本地是否有数据
          const localChannels = getItem("user-channels");
          if (localChannels) {
            channels = localChannels;
          } else {
            //既没有登入也没本地，获取默认接口数据
            const { data } = await getChannels();
            channels = data.data.channels;
          }
        }

        // 将数据更新到组件中
        this.chennels = channels;
      } catch (err) {
        console.log(err);
        this.$toast('数据获取失败')
      }
    },
    onUpdataActive(index) {
      this.active = index;
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

  .nav-right-icon {
    height: 44px;
    width: 33px;
    position: fixed;
    right: 0;
    line-height: 55px;
    background-color: #fff;
    opacity: 0.9;
    .van-icon {
      font-size: 24px;
    }
  }

  .lastRight {
    width: 33px;
    flex-shrink: 0;
  }
}
</style>