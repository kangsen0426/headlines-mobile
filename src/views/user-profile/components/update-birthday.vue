<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { editProfile } from "@/api/user";

export default {
  name: "update-birthday",
  data() {
    return {
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onConfirm() {
      try {
        this.$toast.loading({
          message: "保存中...",
          forbidClick: true,
        });

        const date = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth()}-${this.currentDate.getDate()}`;

        await editProfile({
          birthday: date,
        });

        this.$emit("input",date);

        this.$emit("close");

        this.$toast.success("保存成功");
      } catch (err) {}
    },
  },
};
</script>

<style>
</style>