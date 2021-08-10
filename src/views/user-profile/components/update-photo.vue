<template>
  <div>
    <img class="image" :src="image" ref="image" />
    <van-nav-bar
      class="toolbar"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    ></van-nav-bar>
  </div>
</template>

<script>
import { editUserPhoto } from "@/api/user";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

export default {
  name: "update-photo",
  data() {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null,
    };
  },
  props: {
    file: {
      type: File,
      required: true,
    },
  },
  mounted() {
    const image = this.$refs.image;
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      //   autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
    });
  },
  methods: {
    getCroppedCanvas() {
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob);
        });
      });
    },
    async onConfirm() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
        duration:0
      });

      const file = await this.getCroppedCanvas();
      const fd = new FormData();
      fd.append("photo", file);

      await editUserPhoto(fd);

      this.$toast.success("保存成功");
      this.$emit("updata-pphoto",  window.URL.createObjectURL(file));
      this.$emit("close");
    },
  },
};
</script>

<style scopd >
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
.image {
  display: block;
  max-width: 100%;
}
</style>