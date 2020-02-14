<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 谁使用这个组件，就传入数据lunbotuList -->
      <!-- 此时，lunbotuList应该是父组件向子组件传值 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.img">
        <img :src="item.img" alt :class="{'full':isfull}" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>>
  
<script>
export default {
  props: ["lunbotuList", "isfull"]
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    text-align: center;
    
    img {
      // width: 100%;
      height: 100%;
    }
  }
}

.full {
  width: 100%;
}
</style>