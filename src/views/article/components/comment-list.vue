<template>
  <div class="article-comments">
    <van-cell title="全部评论"></van-cell>
    <!-- 评论列表 -->
    <van-list
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
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <!-- <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group> -->
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { getComments, addCommentLike, deleteCommentLike } from "@/api/comment";
import { getTimeGone } from "@/utils/dayjs";

export default {
  name: "ArticleComment",
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    type: {
      type: String,
      default: "a",
    },
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      //   list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null,
      limit: 10,
    };
  },
  created() {},
  methods: {
    async onLoad() {
      const { data } = await getComments({
        type: this.type,
        source: this.source.toString(),
        offset: this.offset,
        limit: this.limit,
      });

      this.$emit("update-total-count", data.data.total_count);

      const result = data.data.results;

        // console.log(result);


      this.list.push(...result);
      this.loading = false;

      if (data.data.length) {
        this.offset = data.data.last_id;
      } else {
        this.finished = true;
      }
    },
    getRealyTime(value) {
      return getTimeGone(value);
    },
    async onLike(item) {
      const commentId = item.com_id.toString();
      if (item.is_liking) {
        await deleteCommentLike(commentId);
        item.like_count--;
      } else {
        await addCommentLike(commentId);
        item.like_count++;
      }

      //更新视图
      item.is_liking = !item.is_liking;
    },
  },
};
</script>

<style scoped lang="less">
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
</style>