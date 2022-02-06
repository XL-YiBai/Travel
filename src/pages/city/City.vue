<template>
  <div>
    <city-header></city-header>
    <city-search :cities="data.cities"></city-search>
    <city-list
      :cities="data.cities"
      :hotCities="data.hotCities"
      :letter="letter"
    ></city-list>
    <city-alphabet
      :cities="data.cities"
      @change="handleLetterChange"
    ></city-alphabet>
  </div>
</template>

<script>
import axios from 'axios'
import CityHeader from './components/Header.vue'
import CitySearch from './components/Search.vue'
import CityList from './components/List.vue'
import CityAlphabet from './components/Alphabet.vue'
import { reactive, ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
export default {
  name: 'City',
  components: {CityHeader, CitySearch, CityList, CityAlphabet},
  setup() {
    const { letter, handleLetterChange } = useLetterLogic()
    const { data } = useCityLogic()
    return { data, letter, handleLetterChange }
  },
}

// 将不同的功能相关的数据和逻辑等抽离出来
function useCityLogic() {
  const data = reactive({
    cities: {},
    hotCities: [],
  })
  async function getCityInfo() {
    let res = await axios.get('/api/city.json')
    res = res.data
    if (res.ret && res.data) {
      const result = res.data
      data.cities = result.cities
      data.hotCities = result.hotCities
    }
  }
  onMounted(() => {
    getCityInfo()
  })
  return { data }
}

function useLetterLogic() {
  const letter = ref('')
  function handleLetterChange(selected) {
    letter.value = selected
  }
  return { letter, handleLetterChange }
}

</script>

<style lang="stylus" scoped>

</style>
