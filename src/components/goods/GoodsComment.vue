<template>
  <div>
    <cmtbot :id="$route.params.id"></cmtbot>
  </div>
</template>

<script>
import cmtbot from '../subcomments/comment.vue'

export default {
  components:{
    cmtbot
  }  
}
</script>

<style lang="scss" scoped>
  
</style>