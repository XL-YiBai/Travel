<template>
  <div class="wrapper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item of swiperList" :key="item.id">
        <img class="swiper-img" :src="item.imgUrl">
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  data () {
    return {
      // swiper轮播图配置项
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true
      },
      swiperList: [{
        id: '0001',
        imgUrl: 'http://img1.qunarzz.com/piao/fusion/1802/e3/62ce7362ca051d02.jpg_640x200_6db551b7.jpg'
      }, {
        id: '0002',
        imgUrl: 'http://img1.qunarzz.com/piao/funsion/1801/93/ce59d182aca07102.jpg_640x200_ba03d44c.jpg'
      }]
    }
  }
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
