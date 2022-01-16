<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="button-list">
          <div class="button-wrapper">
            <div class="button">北京</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list">
          <div class="button-wrapper"
            v-for="item of hotCities"
            :key="item.id"
          >
            <div class="button">{{item.name}}</div>
          </div>
        </div>
      </div>
      <!-- 遍历对象时，第二项为键名key，此时key为ABCDE..Z，给每个字母导航栏加ref标识 -->
      <div class="area"
        v-for="(item, key) of cities"
        :key="key"
        :ref="key"
      >
        <div class="title border-topbottom">{{key}}</div>
          <div class="item-list">
            <!-- 每个键名字母存储了以该字母开头的城市，再循环 -->
            <div class="item border-bottom"
              v-for="innerItem of item"
              :key="innerItem.id"
              >
              {{innerItem.name}}
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
  name: 'CityList',
  props: {
    hotCities: Array,
    cities: Object,
    letter: String
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.wrapper)
  },
  updated () {
    this.scroll.refresh()
  },
  // 使用监视属性watch监听字母letter的变化
  watch: {
    letter () {
      if (this.letter) {
        // 因为导航栏的ref标识是循环加上的，所以直接获取到的是一个数组，在后面再加一个[0]才取到dom元素
        const element = this.$refs[this.letter][0]
        // 使用better-scroll插件自带的接口scrollToElement，可以跳转到该element元素的位置，这样就实现点侧边栏切换城市展示的效果了
        this.scroll.scrollToElement(element)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
  .border-topbottom
    &:before
      border-color: #ccc
    &:after
      border-color: #ccc
  .list
    overflow: hidden
    position: absolute
    top: 1.58rem
    left: 0
    right: 0
    bottom: 0
    .border-bottom
      &:before
        border-color: #ccc
    .title
      line-height: .54rem
      background: #eee
      padding-left: .2rem
      color: #666
      font-size: .26rem
    .button-list
      overflow: hidden
      padding: .1rem .6rem .1rem .1rem
      .button-wrapper
        float: left
        width: 33.33%
        .button
          margin: .1rem
          padding: .1rem 0
          text-align: center
          border: .02rem solid #ccc
          border-radius: .06rem
    .item-list
      .item
        line-height: .76rem
        padding-left: .2rem
</style>
