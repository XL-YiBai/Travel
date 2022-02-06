<template>
  <ul class="list">
    <!-- elem指的是这个li标签，elems是setup中定义的，就是循环每一个li标签都存入elems数组中 -->
    <li
      class="item"
      v-for="item of letters"
      :key="item"
      :ref="elem => elems[item] = elem"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @click="handleLetterClick"
    >
      {{item}}
    </li>
  </ul>
</template>

<script>
import { computed, onUpdated, ref } from 'vue'
export default {
  name: 'CityAlphabet',
  props: {
    cities: Object
  },
  setup(props, context) {
    let touchStatus = false
    let startY = 0
    let timer = null
    const elems = ref([])

    const letters = computed(() => {  // 将所有首字母存储到letters数组中 ['A', 'B', ... 'Z']
      const letters = []
      for (let i in props.cities) {
        letters.push(i)
      }
      return letters
    })

    onUpdated(() => {
      // offsetTop它返回当前元素相对于其offsetParent元素的顶部内边距的距离，此时为字母A顶部到顶部蓝色下沿的距离
      startY = elems.value['A'].offsetTop
    })

    function handleLetterClick(e) {
      context.emit('change', e.target.innerText)
    }

    function handleTouchStart () {
      touchStatus = true
    }

    function handleTouchEnd () {
      touchStatus = false
    }

    function handleTouchMove (e) {
      if (touchStatus) {
        // 通过节流优化代码，减少连续滑动时的计算频率，提高性能
        if (!timer) {
          timer = setTimeout(() => {
            timer = null
            // e.touches[0].clientY手指当前移动的位置距离整个屏幕顶部的距离，只要减去顶部蓝色高度就得到到蓝色下沿距离
            const touchY = (e.touches[0].clientY) - 79
            // 求出滑动过程中，当前字母的下标，每个字母的高度为20px
            const index = Math.floor((touchY - startY) / 20)
            // 滑动过程中坐标为0到25时，跳转到对应字母的城市区域
            if (index >= 0 && index < letters.value.length) {
              context.emit('change', letters.value[index])
            }
          }, 16)
        }
      }
    }
    
    return {
      elems, letters, handleLetterClick, handleTouchStart,
      handleTouchEnd, handleTouchMove
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
