<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
        placeholder="请输入搜索关键词"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result
      :search-text="searchText"
      v-if="isResultShow"
    ></search-result>

    <!-- 联想建议 -->
    <search-suggestion
      :search-text="searchText"
      v-else-if="searchText"
      @search="onSearch"
    ></search-suggestion>

    <!-- 历史记录 -->
    <search-history v-else :search-history="searchHistorys" @search='onSearch'></search-history>
  </div>
</template>

<script>
import searchSuggestion from "./components/search-suggestion.vue";
import SearchResult from "./components/search-result.vue";
import SearchHistory from "./components/search-history.vue";
import { setItem, getItem } from "@/utils/storage";
import { getSearchHistory } from "@/api/search";

export default {
  name: "search",
  data() {
    return {
      searchText: "",
      isResultShow: false,
      searchHistorys: getItem("search-history") || [], //搜索历史
    };
  },
  components: {
    searchSuggestion,
    SearchResult,
    SearchHistory,
  },
  async created() {
    const { data } = await getSearchHistory();
    console.log('网络上的历史记录(未处理):');
    console.log(...data.data.keywords);  //网络上的历史记录
  },
  methods: {
    onSearch(searchText) {
      this.searchText = searchText;
      const index = this.searchHistorys.indexOf(searchText);
      if (index != -1) {
        //如果有重复项，先把原来的重复项删除
        this.searchHistorys.splice(index, 1);
      }

      this.searchHistorys.unshift(searchText);

      //如果用户已经登入，把搜索记录存储到线上（后端自动存贮

      //如果没有登入，把搜索记录存储到本地
      setItem("search-history", this.searchHistorys);

      //展示搜索结果
      this.isResultShow = true;
    },
  },
};
</script>

<style scoped lang='less'>
</style>