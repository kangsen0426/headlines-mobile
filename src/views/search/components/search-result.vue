<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <articleitem
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
        :article="item"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from "@/api/search";
import articleitem from "@/components/article-item";

export default {
  name: "SearchResult",
  components: {
    articleitem,
  },

  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      //请求数据
      const { data } = await getSearch({
        page: this.page, //页码
        per_page: this.perPage, //每页大小
        q: this.searchText, //搜索的字符
      });
      //存储数据
      this.list.push(...data.data.results)
      //关闭本次loading
      this.loading = false;
      //检查是否还有数据
      if (data.data.results.length) {
        this.page++;
      } else {
        //无数据结束加载
        this.finished = true;
      }
    },
  },
};
</script>

<style scoped lang="less">
.search-result {
  position: fixed;
  top: 54px;
  bottom: 40px;
  left: 0;
  right: 0;
  overflow-y: auto;
}
</style>