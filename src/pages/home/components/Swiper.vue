<template>
  <div class="wrapper">
    <!-- v-if当list是空数组时，不生成dom渲染，等数据传递过来再创建渲染,避免渲染两次导致轮播图显示在最后一张的情况 -->
    <swiper :options="swiperOption" v-if="showSwiper">
      <swiper-slide v-for="item of list" :key="item.id">
        <img class="swiper-img" :src="item.imgUrl">
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
export default {
  name: 'HomeSwiper',
  props: {
    list: Array
  },
  setup(props) {
    const swiperOption = {
      pagination: '.swiper-pagination',
      loop: true // 循环播放
    }
    const showSwiper = computed(() => props.list.length)
    return { swiperOption, showSwiper }
  },
}
</script>

<style lang="stylus" scoped>
  // 因为swiper组件的样式不受当前组件控制，我们使用>>>样式穿透，表示.wrapper下所有子组件出现.swiper-pagination-bullet-active都改成#fff
  .wrapper >>> .swiper-pagination-bullet-active
    background: #fff
  // 这个类的样式是为了解决图片没有加载出来时，页面图片后面内容上下抖动问题
  .wrapper
    overflow: hidden
    width: 100%
    height: 0
    // 设置宽度的31.25比例的padding撑开高度
    padding-bottom: 31.25%
    // background: #eee
    .swiper-img
      width: 100%
</style>
