<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="button-list">
          <div class="button-wrapper">
            <div class="button">{{currentCity}}</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list">
          <div class="button-wrapper"
            v-for="item of hotCities"
            :key="item.id"
            @click="handleCityClick(item.name)"
          >
            <div class="button">{{item.name}}</div>
          </div>
        </div>
      </div>
      <!-- 遍历对象时，第二项为键名key，此时key为ABCDE..Z，给每个字母导航栏加ref标识 -->
      <div class="area"
        v-for="(item, key) of cities"
        :key="key"
        :ref="elem => elems[key] = elem"
      >
        <div class="title border-topbottom">{{key}}</div>
          <div class="item-list">
            <!-- 每个键名字母存储了以该字母开头的城市，再循环 -->
            <div class="item border-bottom"
              v-for="innerItem of item"
              :key="innerItem.id"
              @click="handleCityClick(innerItem.name)"
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
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { watch, onMounted, ref, onUpdated } from 'vue'
export default {
  name: 'CityList',
  props: {
    hotCities: Array,
    cities: Object,
    letter: String
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const currentCity = store.state.city
    const elems = ref({})
    const wrapper = ref(null)
    let scroll = null

    function handleCityClick(city) {
      store.commit('changeCity', city)
      router.push('/')
    }

    watch(() => props.letter, (newLetter, prevLetter) => {
      if (newLetter && scroll) {
        // 因为导航栏的ref标识是循环加上的，所以直接获取到的是一个数组，在后面再加一个[0]才取到dom元素
        const element = elems.value[newLetter]
        // 使用better-scroll插件自带的接口scrollToElement，可以跳转到该element元素的位置，这样就实现点侧边栏切换城市展示的效果了
        scroll.scrollToElement(element)
      }
    })
    onMounted(() => {
      // {click: true}解决移动端点击事件无法触发的问题
      scroll = new Bscroll(wrapper.value, {click: true})
    })

    onUpdated(() => {
      scroll.refresh()
    })

    return { elems, wrapper, currentCity, handleCityClick }
  },
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
