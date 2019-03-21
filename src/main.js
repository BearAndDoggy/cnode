// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'

Vue.prototype.$axios = Axios
Vue.config.productionTip = false

/* eslint-disable no-new */


Vue.filter('showSort', (obj)=>{
  if (obj.good) {
    return '精华'
  } else if(obj.top) {
    return '置顶'
  } else if (obj.tab === 'share') {
     return '分享'
  } else if (obj.tab === 'ask') {
    return '问答'
  } else {
    return '招聘'
  }
})

Vue.filter('showFrom', (obj)=>{
  if (obj.tab === 'share') {
    return '分享'
  } else if (obj.tab === 'ask') {
    return '问答'
  } else {
    return '招聘'
  }
})

Vue.filter('showTime', (date)=>{
  let time = new Date().getTime() - new Date(date).getTime()
  if (time < 0) {
    return ''
  } else if (time / 1000 < 30) {
    return  "刚刚"
  }else if (time / 1000 < 60) {
    return  parseInt(time / 1000)  + "秒前"
  }else if (time / 60000 < 60) {
    return  parseInt(time / 60000) + "分钟前"
  }else if (time / 3600000 < 24) {
    return  parseInt(time / 3600000) + "小时前"
  }else if (time / 86400000 < 30) {
    return  parseInt(time / 86400000) + "天前"
  }else if (time / 2.592e9 < 12) {
    return  parseInt(time / 2.592e9) + "月前"
  }else if (time / 3.1104e10 < 60) {
    return parseInt(time / 3.1104e10) + "年前"
  }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})