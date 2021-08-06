<template>
  <div>
    <van-nav-bar
      class="app-nav-bar"
      title="注册/登入"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 登入表单 -->
    <van-form
      @submit="onLogin"
      @failed="onFailed"
      :show-error="false"
      :show-error-message="false"
      :validate-first="true"
      ref="loginRef"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="iconfont icon"
        left-icon="shouji"
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="iconfont icon"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          ></van-count-down>
          <van-button
            class="send-btn"
            size="mini"
            round
            @click.prevent="onSendCode"
            :loading="isSendCodeLoading"
            v-else
            >发送验证码</van-button
          >
        </template>
      </van-field>

      <div class="login-btn-box">
        <van-button class="login-btn" type="info" block>登入</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, senCode } from "@/api/user";
import { Toast } from "vant";

export default {
  name: "login",
  data() {
    return {
      user: {
        mobile: "",
        code: "246810", //验证码
        //表单验证
      },
      formRules: {
        mobile: [
          { required: true, message: "请输入手机号" },
          {
            pattern:
              /^1(3\d|4[5-8]|5[0-35-9]|6[567]|7[01345-8]|8\d|9[025-9])\d{8}$/,
            message: "请输入正确的手机号",
          },
        ],
        code: [
          { required: true, message: "请输入验证码" },
          { pattern: /^\d{6}$/, message: "请输入正确的验证码" },
        ],
      },
      isCountDownShow: false,
      isSendCodeLoading: false,
    };
  },
  methods: {
    async onLogin() {
      Toast.loading({
        message: "登入中...",
        forbidClick: true,
        duration: 0,
      });

      //请求登入

      try {
        const res = await login(this.user);
        Toast.success("登入成功");
        //保存用户登入状态
        this.$store.commit('setUser',res.data.data)

        //登入成功，跳转回去
        this.$router.back()
      } catch (err) {
        Toast.fail("登入失败");
      }
    },
    onFailed(err) {
      if (err.errors[0]) {
        Toast({
          message: err.errors[0].message,
          position: "top",
        });
      }
    },
    async onSendCode() {
      //验证手机号码
      try {
        await this.$refs.loginRef.validate("mobile");
        //请求发送验证码   显示倒计时
        let res = await senCode(this.user.mobile);
        this.isSendCodeLoading = true;
        this.isCountDownShow = true;

        //倒计时结束隐藏时间显示发送按钮
      } catch (err) {
        let message = "";
        if (err && err.response && err.response.status == 429) {
          message = "发送太频繁,请稍后重试";
        } else if (err.name === "mobile") {
          //表单验证失败
          message = err.message;
        } else {
          message = "发送失败请稍后重试";
        }

        Toast({
          message,
          position: "top",
        });
      }

      this.isSendCodeLoading = false;
    },
  },
};
</script>

<style scoped lang='less'>
body {
  background-color: #f5f7f9;
}
.login-btn-box {
  padding: 16px 26px;
  .login-btn {
    background-color: #6db4fb !important;
    border: none;
  }
}
.send-btn {
  width: 76px;
  height: 23px;
  background-color: #ededed;
  .van-button__text {
    font-size: 11px;
    color: #666666;
  }
}
</style>