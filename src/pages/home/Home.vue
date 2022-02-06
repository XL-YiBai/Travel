<template>
  <div>
    <home-header></home-header>
    <home-swiper :list="swiperList"></home-swiper>
    <home-icons :list="iconList"></home-icons>
    <home-recommend :list="recommendList"></home-recommend>
    <home-weekend :list="weekendList"></home-weekend>
  </div>
</template>

<script>
// Composition API
import HomeHeader from './components/Header.vue'
import HomeSwiper from './components/Swiper.vue'
import HomeIcons from './components/icons.vue'
import HomeRecommend from './components/Recommend.vue'
import HomeWeekend from './components/Weekend.vue'
import axios from 'axios'
import { useStore } from 'vuex'
import {computed, onMounted, ref} from 'vue'
export default {
  name: 'Home',
  components: {HomeHeader, HomeSwiper, HomeIcons, HomeRecommend, HomeWeekend},
  setup() {
		const swiperList = ref([])
    const iconList = ref([])
    const recommendList = ref([])
    const weekendList = ref([])
		const store = useStore()
		const city = computed(() => {
			return store.state.city
		})
		function getHomeInfoSucc(res) {
			
		}
		async function getHomeInfo() {
      let res = await axios.get('/api/index.json?city=' + city)
      res = res.data
      if (res.ret && res.data) {
        const result = res.data
        swiperList.value = result.swiperList
        iconList.value = result.iconList
        recommendList.value = result.recommendList
        weekendList.value = result.weekendList
      }
    }
		onMounted(() => {
			getHomeInfo()
		})
		return {swiperList, iconList, recommendList, weekendList}
	}
}
</script>

<style>

</style>
