<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="DeleteAll">全部删除</span>
        &nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="str"
      v-for="(str, index) in searchHistory"
      :key="index"
      @click="DeleteOne(str, index)"
    >
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
import { removeItem, setItem } from "@/utils/storage";

export default {
  name: "SearchHistory",
  components: {},
  props: {
    searchHistory: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDeleteShow: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    DeleteAll() {
      //删除所有记录
      this.searchHistory.splice(0, this.searchHistory.length);
      removeItem("search-history");
    },
    DeleteOne(str, index) {
      if (this.isDeleteShow) {
        this.searchHistory.splice(index, 1);
        setItem("search-history", this.searchHistory);
        return;
      }

      //非删除状态，就去搜索
      this.$emit("search", str);
    },
  },
};
</script>

<style scoped lang="less"></style>