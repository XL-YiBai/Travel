<template>
  <ul class="list">
    <li class="item"
      v-for="item of letters"
      :key="item"
      :ref="item"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchMove"
      @click="handleLetterClick"
    >
      {{item}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CityAlphabet',
  props: {
    cities: Object
  },
  computed: {
    letters () { // 将所有首字母存储到letters数组中 ['A', 'B', ... 'Z']
      const letters = []
      for (let i in this.cities) {
        letters.push(i)
      }
      return letters
    }
  },
  data () {
    return {
      touchStatus: false,
      startY: 0,
      timer: null
    }
  },
  // 因为mounted挂载时，还没有获取到ajax传回的字母数组，所以一开始为空，获取到之后当前组件重新渲染，所以把这个逻辑写在updated钩子里
  updated () {
    // offsetTop它返回当前元素相对于其offsetParent元素的顶部内边距的距离，此时为字母A顶部到顶部蓝色下沿的距离
    this.startY = this.$refs['A'][0].offsetTop
  },
  methods: {
    handleLetterClick (e) {
      this.$emit('change', e.target.innerText)
    },
    handleTouchStart () {
      this.touchStatus = true
    },
    handleTouchMove (e) {
      if (this.touchStatus) {
        // 通过节流优化代码，减少连续滑动时的计算频率，提高性能
        if (!this.timer) {
          this.timer = setTimeout(() => {
            this.timer = null
            // e.touches[0].clientY手指当前移动的位置距离整个屏幕顶部的距离，只要减去顶部蓝色高度就得到到蓝色下沿距离
            const touchY = (e.touches[0].clientY) - 79
            // 求出滑动过程中，当前字母的下标，每个字母的高度为20px
            const index = Math.floor((touchY - this.startY) / 20)
            // 滑动过程中坐标为0到25时，跳转到对应字母的城市区域
            if (index >= 0 && index < this.letters.length) {
              this.$emit('change', this.letters[index])
            }
          }, 16)
        }
      }
    },
    handleTouchEnd () {
      this.touchStatus = false
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.list
  display: flex
  flex-direction: column
  justify-content: center
  position: absolute
  top: 1.58rem
  right: 0
  bottom: 0
  width: .4rem
  .item
    line-height: .4rem
    text-align: center
    color: $bgColor
</style>
