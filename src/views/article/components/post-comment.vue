<template>
  <div class="post_box">
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
      show-word-limit
    />
    <van-button class="send-btn" size="mini" :disabled='!message'  @click="onPost">发布</van-button>
  </div>
</template>

<script>
import { addComment } from "@/api/comment";

export default {
  name: "postComment",
  data() {
    return {
      message: "",
    };
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true,
    },
    art_id: {
      type: [Number, String, Object],
      default: null,
    },
  },
  methods: {
    async onPost() {
      this.$toast.loading({
        message: "发布中...",
        forbidClick: true,
      });

      const { data } = await addComment({
        target: this.target.toString(),
        content: this.message,
        art_id: this.art_id ? this.art_id.toString() : null,
      });

      this.$emit("postsuccess", data.data.new_obj);
      this.$toast.success("发布成功");

      this.message = ''
    },
  },
};
</script>

<style scoped lang='less'>
.post_box {
  display: flex;
  align-items: center;
  padding: 14px;

  /deep/ .van-button--mini {
    width: 45px;
    height: 35px;
  }
}
</style>