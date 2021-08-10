<template>
  <div>
    <van-picker
      title="性别"
      show-toolbar
      :default-index="defaultIndex"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
    />
  </div>
</template>

<script>
import { editProfile } from "@/api/user";

export default {
  name: "update-gender",
  data() {
    return {
      columns: ["男", "女"],
      defaultIndex: this.value,
    };
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async onConfirm(value,index) {
      try {
        this.$toast.loading({
          message: "保存中...",
          forbidClick: true,
        });
        await editProfile({
          gender: index,
        });

      

        this.$emit("input",this.defaultIndex);

        this.$emit('close');

        this.$toast.success("保存成功");
      } catch (err) {}

      this.$toast(`${value}`);
    },
    onChange(value) {},
    onCancel() {
      this.$emit("close");
      this.$toast("取消");
    },
  },
};
</script>
    
<style>
</style>