<template>
  <div class="chanel-box">
    <van-cell center :border="false">
      <div slot="title" class="chanel-title">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>

    <van-grid :gutter="10" class="secGrid">
      <van-grid-item
        :class="{ active: index === isactive }"
        v-for="(item, index) in userChennels"
        :key="index"
        :text="item.name"
        :icon="isEdit && index != 0 ? 'clear' : ''"
        @click="onUSerChannelClick(item, index)"
      />
    </van-grid>

    <van-cell center :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>

    <van-grid :gutter="10" class="secGrid">
      <van-grid-item
        v-for="(item, index) in recommendChannels"
        :key="index"
        :text="item.name"
        @click="onAdd(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from "@/api/channel";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";

export default {
  name: "channeledit",
  data() {
    return {
      allChannel: [],
      isEdit: false,
    };
  },
  props: {
    userChennels: {
      type: Array,
      required: true,
    },
    isactive: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState(["user"]),

    //过滤不用显示的推荐列表
    recommendChannels() {
      return this.allChannel.filter((channels) => {
        //判断是否属于用户频道
        return !this.userChennels.find((userChennels) => {
          //找到满足的条件
          return userChennels.id === channels.id;
        });
      });
    },
  },
  created() {
    this.loadAllChannels();
  },
  methods: {
    async loadAllChannels() {
      const { data } = await getAllChannels();
      this.allChannel = data.data.channels;
    },
    async onAdd(item) {
      this.userChennels.push(item);

      //数据持久化
      if (this.user) {
        //登入了，发送请求
        const res = await addUserChannel({
          channels: [{ id: item.id, seq: this.userChennels.length }],
        });

      
      } else {
        //未登入，数据储存到本地
        setItem("user-channels", this.userChennels);
      }
    },
    onUSerChannelClick(channel, index) {
      //编辑状态，删除频道
      if (this.isEdit && index != 0) {
        this.deleteChannel(channel, index);
      } else {
        //非编辑状态，切换频道
        this.switchChannel(index);
      }
    },
    async deleteChannel(channel, index) {
      //如果删除的是当前删除的频道
      if (index <= this.isactive) {
        //更新激活的索引
        this.$emit("updataActive", this.isactive - 1);
      }
      this.userChennels.splice(index, 1);

      //数据持久化
      if (this.user) {
        //发送请求
        await deleteUserChannel(channel.id);
      } else {
        setItem("user-channels", this.userChennels);
      }
    },
    switchChannel(index) {
      this.$emit("updataActive", index);
      this.$emit("closed");
    },
  },
};
</script>

<style scoped lang='less'>
.chanel-box {
  padding-top: 54px;

  .chanel-title {
    font-size: 16px;
    color: #333333;
  }

  .secGrid {
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
    }
    /deep/ .van-grid-item__icon {
      position: absolute;
      right: -8px;
      top: -5px;
      font-size: 16px;
      color: #ccc;
    }
    .active {
      /deep/ .van-grid-item__text {
        color: red;
      }
    }
  }
}
</style>