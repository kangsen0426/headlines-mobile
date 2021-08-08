<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="文章详情"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载完成-文章详情 -->
      <div class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ getRealyTime(article.pubdate) }}
          </div>
          <van-button
            class="follow-btn"
            :type="article.is_followed ? 'default' : 'info'"
            round
            size="small"
            icon="plus"
            @click="onFollow"
            :loading="isFollowLoading"
            >{{ article.is_followed ? "已关注" : "关注" }}</van-button
          >
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="rticle-content"
        ></div>

        <van-divider>正文结束</van-divider>

        <!-- 文章评论 -->
        <article-comment
          :list="commentList"
          :source="articleId"
          @update-total-count="totalCommentCount = $event"
          @reply-click="replyClick"
        ></article-comment>
      </div>
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        @click="isPostShow = true"
        class="comment-btn"
        type="default"
        round
        size="small"
        >写评论</van-button
      >
      <van-icon name="comment-o" :info="totalCommentCount" color="#777" />
      <van-icon
        :color="article.is_collected ? 'orange' : '#777'"
        @click="isFollowed"
        :name="article.is_collected ? 'star' : 'star-o'"
      />
      <van-icon
        @click="onLike"
        :color="article.attitude === 1 ? 'red' : '#777'"
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论弹出层 -->
    <van-popup v-model="isPostShow" position="bottom">
      <post-comment
        :target="articleId"
        @postsuccess="onPostSuccess"
      ></post-comment>
    </van-popup>

    <!-- 评论回复弹出层 -->
    <van-popup
      v-model="isReplyShow"
      position="bottom"
      closeable
      :style="{ height: '60%' }"
    >
      <comment-reply :comment='replyComment'></comment-reply>
    </van-popup>
  </div>
</template>

<script>
import "./github-markdown.css";
import { getArticleById } from "@/api/article";
import { getTimeGone } from "@/utils/dayjs";
import { ImagePreview } from "vant";
import { addFollow, deleteFollow } from "@/api/user";
import { addCollect, deleteCollect, addLike, deleteLike } from "@/api/article";
import ArticleComment from "./components/comment-list";
import postComment from "./components/post-comment.vue";
import commentReply from "./components/comment-reply.vue";
export default {
  name: "ArticleIndex",
  components: {
    ArticleComment,
    postComment,
    commentReply,
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      article: {}, //文章列表
      isFollowLoading: false, //关注时等待网络
      isPostShow: false,
      commentList: [], //文章评论数据
      totalCommentCount: 0, //评论总数量
      isReplyShow: false, //回复弹出层
      replyComment:{} //当前点击的回复对象
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticle();
  },
  mounted() {},
  methods: {
    async loadArticle() {
      const { data } = await getArticleById(this.articleId);
      this.article = data.data;

      //获取文章内容DOM容器
      this.$nextTick(() => {
        //得到所有 img 标签
        //循环 img 列表，给 img 注册点击事件
        //在事件处理函数中调用图片预览方法
        this.handelPerviewImage();
      });
    },
    getRealyTime(value) {
      return getTimeGone(value);
    },
    handelPerviewImage() {
      const articleContent = this.$refs["rticle-content"];
      const imgs = articleContent.querySelectorAll("img");
      const imgSrc = [];
      imgs.forEach((img, index) => {
        imgSrc.push(img.src);
        img.onclick = function () {
          ImagePreview({
            images: imgSrc,
            startPosition: index,
          });
        };
      });
    },
    async onFollow() {
      this.isFollowLoading = true;
      //已关注就取消关注
      if (this.article.is_followed) {
        await deleteFollow(this.article.aut_id);
      } else {
        //未关注就关注
        await addFollow(this.article.aut_id);
      }
      //更新视图
      this.article.is_followed = !this.article.is_followed;
      this.isFollowLoading = false;
    },
    async isFollowed() {
      this.$toast.loading({
        message: "操作中...",
        forbidClick: true,
      });

      if (this.article.is_collected) {
        await deleteCollect(this.articleId);
      } else {
        await addCollect(this.articleId);
      }
      //更新视图
      this.article.is_collected = !this.article.is_collected;
      this.$toast.success(`${this.article.is_collected ? "" : "取消"}收藏成功`);
    },
    async onLike() {
      this.$toast.loading({
        message: "操作中...",
        forbidClick: true,
      });

      if (this.article.attitude === 1) {
        await deleteLike(this.articleId);
        this.article.attitude = -1;
      } else {
        await addLike(this.articleId);
        this.article.attitude = 1;
      }
      //更新视图
      this.$toast.success(
        `${this.article.attitude === 1 ? "" : "取消"}点赞成功`
      );
    },
    onPostSuccess(data) {
      //更新最新的评论列表
      this.commentList.unshift(data);

      this.totalCommentCount++;

      this.isPostShow = false;
    },
    replyClick(item) {

         console.log(item);
      this.replyComment = item
      //显示回复弹出层
      this.isReplyShow = true;

     
    },
  },
};
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: scroll;
    background-color: #fff;
  }
/deep/ .van-nav-bar .van-icon {
    color: #fff;
  }
  /deep/ .van-nav-bar__content {
    background-color: #1989fa;
  }
  /deep/ .van-nav-bar__title {
    color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 20px;
      padding: 14px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 8px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 12px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 11px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 75px;
        height: 30px;
      }
    }

    .article-content {
      padding: 14px;
      background-color: #fff;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 141px;
      height: 23px;
      border: 1px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 11px;
        background-color: #e22829;
      }
    }

  }
}
</style>