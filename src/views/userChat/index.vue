<template>
  <div>
    <van-nav-bar
      class="app-nav-bar"
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 信息列表 -->
    <van-cell-group class="message-list">
      <van-cell title="单元格" />
    </van-cell-group>

    <!-- 发送消息 -->
    <van-cell-group class="sendmessage">
      <van-field v-model="message" placeholder="请输入消息" :border="false" />
      <van-button type="primary" size="small">发送</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "userChat",
  data() {
    return {
      message: "",
      socket: null,
      messages: [],
    };
  },
  created() {
    this.list = [];
    this.socket = io("http://ttapi.research.itcast.cn/");
    this.socket.on("connect", () => {
      // 建了链接后默认  小智给你打招呼
      console.log("fine");
    });
    this.socket.on("disconnect", () => {
      console.log("stope");
    });
    this.socket.on("message", (data) => {
      console.log(data);
    });
  },
  methods: {
    send() {
      const data = {
        msg: this.message,
        timestamp: Date.now(),
      };
      this.socket.emit("message", data);
      this.messages.push(data);
    },
  },
};
</script>

<style scoped lang='less'>
.message-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}
.sendmessage {
  display: flex;
  padding: 0 6px;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
.van-button--small {
  width: 50px;
}
</style>