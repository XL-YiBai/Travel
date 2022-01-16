<template>
<div>
  <div class="search">
    <input v-model="keyword" class="search-input" type="text" placeholder="输入城市名或拼音" />
  </div>
  <!-- v-show，当搜索框输入了关键字，再显示搜索内容框，否则会覆盖原本的城市列表内容 -->
  <div
    class="search-content"
    ref="search"
    v-show="keyword"
  >
    <ul>
      <li
        class="search-item border-bottom"
        v-for="item of list"
        :key="item.id"
      >
        {{item.name}}
      </li>
      <li class="search-item border-bottom" v-show="hasNoData">
        没有找到匹配数据
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
  name: 'CitySearch',
  props: {
    cities: Object
  },
  data () {
    return {
      keyword: '',
      list: [],
      timer: null
    }
  },
  computed: {
    hasNoData () {
      return !this.list.length
    }
  },
  watch: {
    // 输入框关键字变化时，匹配cities数据中城市的拼写和中文名
    keyword () {
      // 通过防抖优化代码
      if (this.timer) {
        clearTimeout(this.timer)
      }
      // 如果输入框清空，则把匹配数组list置为空
      if (!this.keyword) {
        this.list = []
        return
      }
      this.timer = setTimeout(() => {
        const result = []
        for (let i in this.cities) {
          this.cities[i].forEach((value) => {
            if (value.spell.indexOf(this.keyword) > -1 ||
            value.name.indexOf(this.keyword) > -1) {
              result.push(value)
            }
          })
        }
        this.list = result
      }, 100)
    }
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.search)
  },
  updated () {
    this.scroll.refresh()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
  .search
    height: .72rem
    padding: 0 .1rem
    background: $bgColor
    .search-input
      box-sizing: border-box
      width: 100%
      height: .62rem
      padding: 0 .1rem
      line-height: .62rem
      text-align: center
      border-radius: .06rem
      color: #666
  .search-content
    z-index: 1
    overflow: hidden
    position: absolute
    top: 1.58rem
    left: 0
    right: 0
    bottom: 0
    background: #eee
    .search-item
      line-height: .62rem
      padding-left .2rem
      background: #fff
      color: #666
</style>
