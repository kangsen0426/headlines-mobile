<template>
  <div>
      <van-nav-bar :title="comment.reply_count+' 条回复'"></van-nav-bar>
    <van-cell>
      <van-image
        slot="icon"
        round
        fit="cover"
        style="margin-right: 10px"
        :src="comment.aut_photo"
        class="avatar"
      />

      <div slot="title">
        <div class="title-wrap">
          <div class="name">{{ comment.aut_name }}</div>

          <div class="like-wrap">
              <van-icon
                class="like-icon"
                :color="comment.is_liking ? 'red' : '#777'"
                :name="comment.is_liking ? 'good-job' : 'good-job-o'"
              ></van-icon>
              <span class="like-text"> {{ comment.like_count }}</span>
            </div>
        </div>

        <div class="content">{{ comment.content }}</div>
        <div>
          <span class="pubdate">{{ comment.pubdate | datetime }}</span>
        </div>
      </div>
    </van-cell>

    <van-cell title="全部回复"></van-cell>
    <!-- 评论列表 -->
    <!-- <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="index">
        <van-image
          slot="icon"
          round
          fit="cover"
          style="margin-right: 10px"
          :src="item.aut_photo"
          class="avatar"
        />

        <div slot="title">
          <div class="title-wrap">
            <div class="name">{{ item.aut_name }}</div>

            <div class="like-wrap" @click="onLike(item)">
              <van-icon
                class="like-icon"
                :color="item.is_liking ? 'red' : '#777'"
                :name="item.is_liking ? 'good-job' : 'good-job-o'"
              ></van-icon>
              <span class="like-text"> {{ item.like_count }}</span>
            </div>
          </div>

          <div class="content">{{ item.content }}</div>
          <div>
            <span class="pubdate">{{ item.pubdate | datetime }}</span>
            <van-button
              class="reply-btn"
              size="mini"
              round
              @click="$emit('reply-click', item)"
              >{{ item.reply_count }} 回复</van-button
            >
          </div>
        </div>
      </van-cell>
    </van-list> -->
  <article-comment :source="comment.com_id" type="c"></article-comment>
  
  </div>
</template>

<script>
import ArticleComment from "./comment-list";



export default {
  name: "commentReply",
  data() {
    return {
     
    };
  },
  components:{
      ArticleComment
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  created() {
    
  },
  methods: {
  }
};
</script>

<style scoped lang='less'>
.title-wrap {
  display: flex;
  justify-content: space-between;
}

.avatar {
  width: 36px;
  height: 36px;
}
.name {
  font-size: 14px;
  color: #406599;
  margin-right: 13px;
}
.content {
  font-size: 16px;
  color: #222222;
}
.pubdate {
  font-size: 10px;
}
.reply-btn {
  padding: 6px;
  margin-left: 15px;
}

 /deep/ .van-nav-bar__content {
     background-color: #fff !important;
   
 }
  /deep/ .van-nav-bar__title{
         color: #222222 !important;
     }


</style>