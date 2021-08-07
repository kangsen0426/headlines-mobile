<template>
  <div class="search-suggestion">
    <van-cell icon="search" v-for="(str, index) in suggestions" :key="index" @click="$emit('search',str)">
      <div slot="title" v-html="highlight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";

import { debounce } from "lodash";

export default {
  name: "searchSuggestion",
  data() {
    return {
      suggestions: [],
    };
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  created() {},
  watch: {
    searchText: {
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText);
        this.suggestions = data.data.options;
      }, 200),
      immediate: true,
    },
  },
  methods: {
    highlight(str) {
      //通过正则表达式替换高亮部分
      const reg = new RegExp(this.searchText, "gi");
      return str.replace(
        reg,
        `<span style="color: #3296fa">${this.searchText}</span>`
      );
    },
  },
};
</script>

<style scoped lang='less'>
</style>