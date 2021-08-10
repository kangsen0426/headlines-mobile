<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    >
    </van-nav-bar>

    <!-- 输入框 -->
    <div class="name-box">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="8"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { editProfile } from "@/api/user";

export default {
  name: "updateName",
  data() {
    return {
      message: "",
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  created() {
    this.message = this.name;
  },
  methods: {
    async onConfirm() {
      try {
        this.$toast.loading({
          message: "保存中...",
          forbidClick: true,
        });
        let res = await editProfile({
          name: this.message,
        });
       
        this.$emit("close");

        this.$emit('update-name',this.message)

        this.$toast.success("保存成功");
      } catch (err) {
          
      }
    },
  },
};
</script>

<style scoped lang='less'>
.name-box {
  padding: 8px;
}
</style>