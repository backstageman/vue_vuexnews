<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间:{{ photoinfo.add_time | dateFormat}}</span>
      <span>点击次数:{{ photoinfo.click }}次</span>
    </p>

    <hr />

    <!-- 缩略图 -->
    <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
// 1.导入评论子组件
import comment from "../subcomments/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, //从路由汇总获取到的图片id
      photoinfo: {}, //图片详情
      slide1: [] //缩略图的数组
    };
  },
  created() {
    this.getPhotoInfo(), this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      //获取图片的详情
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
          console.log(this.photoinfo);
        }
      });
    },
    getThumbs() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.msrc = item.src;
            item.w = 600;
            item.h = 400;
          });

          this.slide1 = result.body.message;
        }
      });
    },
    handleClose() {
      console.log("close event");
    }
  },
  components: {
    //注册评论子组件
    "cmt-box": comment
  }
};
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 13px;
  }
}
</style>