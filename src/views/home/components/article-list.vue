<template>
  <div class="artilcec-list">
    <van-pull-refresh
      :success-text="refreshSuccessText"
      success-duration="1300"
      v-model="isPullDownLoading"
      @refresh="onRefreshLoading"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <articleitem
          v-for="(item, index) in articles"
          :key="index"
          :title="item.title"
          :article='item'
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import articleitem from '@/components/article-item';
export default {
  name: "articlelist",
  components: {
    articleitem,
  },
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null, //获取下一页数据的时间戳
      isPullDownLoading: false,
      refreshSuccessText: "",
    };
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      //请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, //频道id
        timestamp: this.timestamp || Date.now(), //时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1, //是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      });

      //push到list数组中
      this.articles.push(...data.data.results);

      //设置本次加载状态结束
      this.loading = false;

      //数据全部加载完成
      if (data.data.results.length) {
        //更新获取下一页的数据
        this.timestamp = data.data.pre_timestamp;
      } else {
        //没有数据了，设置加载结束
        this.finished = true;
      }

      //
    },
    async onRefreshLoading() {
      //下拉刷新 请求数据
      const { data } = await getArticles({
        channel_id: this.channel.id, //频道id
        timestamp: Date.now(),
        with_top: 1,
      });

      //push添加数据  //往数组前面加，才能显示在顶部
      this.articles.unshift(...data.data.results);

      //关闭加载状态
      this.isPullDownLoading = false;

      this.refreshSuccessText = `更新了${data.data.results.length}条数据`;
    },
  },
};
</script>

<style scoped lang='less'>
.artilcec-list {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
}
</style>