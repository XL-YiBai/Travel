import  { createApp } from 'vue';
import App from './App'
import router from './router'
// 引入VueAwesomeSwiper轮播图插件库
import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from './store/index'
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/iconfont.css'
import 'swiper/dist/css/swiper.css'

// 本段代码做了变更
createApp(App).use(router).use(store).use(VueAwesomeSwiper).mount('#app')