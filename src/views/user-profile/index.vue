<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      right-text="保存"
    />
    <van-cell-group>
      <input
        type="file"
        hidden
        ref="file"
        accept="image/*"
        @change="onFileChange"
      />
      <van-cell title="头像" is-link @click="$refs.file.click()">
        <van-image round width="30" height="30" fit="cover" :src="user.photo" />
      </van-cell>
      <van-cell
        title="昵称"
        :value="user.name"
        is-link
        @click="EditNameShow = true"
      />
      <van-cell
        title="性别"
        @click="EditSexShow = true"
        :value="user.gender ? '女' : '男'"
        is-link
      />
      <van-cell
        title="生日"
        @click="EditBirthdayShow = true"
        :value="user.birthday"
        is-link
      />
    </van-cell-group>

    <!-- 修改昵称 -->

    <van-popup
      v-if="EditNameShow"
      v-model="EditNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        @close="EditNameShow = false"
        :name="user.name"
        @update-name="user.name = $event"
      ></update-name>
    </van-popup>

    <!-- 修改性别 -->
    <van-popup v-if="EditSexShow" v-model="EditSexShow" position="bottom">
      <update-gender
        @close="EditSexShow = false"
        v-model="user.gender"
      ></update-gender>
    </van-popup>

    <!-- 修改生日 -->
    <van-popup
      v-if="EditBirthdayShow"
      v-model="EditBirthdayShow"
      position="bottom"
    >
      <update-birthday
        v-model="user.birthday"
        @close="EditBirthdayShow = false"
      ></update-birthday>
    </van-popup>

    <!-- 修改头像 -->
    <van-popup
      :style="{ height: '100%' }"
      v-model="EditPhotoShow"
      position="bottom"
    >
      <update-photo
      v-if="EditPhotoShow"
        :file="photo"
        @updata-pphoto="user.photo = $event"
        @close="EditPhotoShow = false"
      ></update-photo>
    </van-popup>
  </div>
</template>

<script>
import { getProfile } from "@/api/user";
import updateName from "./components/update-name.vue";
import updateGender from "./components/update-gender.vue";
import updateBirthday from "./components/update-birthday.vue";
import updatePhoto from "./components/update-photo.vue";

export default {
  name: "userProfile",
  components: {
    updateName,
    updateGender,
    updateBirthday,
    updatePhoto,
  },
  data() {
    return {
      user: {},
      EditNameShow: false,
      EditSexShow: false,
      EditBirthdayShow: false,
      EditPhotoShow: false,
      photo: null, //上传预览图片
    };
  },

  created() {
    this.loadUserProfile();
  },

  methods: {
    async loadUserProfile() {
      const { data } = await getProfile();
      this.user = data.data;
    },

    onFileChange() {
      this.EditPhotoShow = true;

      this.photo = this.$refs.file.files[0];
      this.$refs.file.value = "";
    },
  },
};
</script>

<style scoped lang='less'>
.user-profile {
  .avatar-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }
    .avatar {
      width: 60px;
      height: 60px;
    }
  }
}
.van-popup {
  background-color: #f5f7f9;
}
</style>