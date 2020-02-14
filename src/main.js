// 入口文件
import Vue from 'vue'
// 导入路由的包
import VueRouter from 'vue-router'
// 安装路由模块
Vue.use(VueRouter)
// 注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中，把 购物车的数据读出来，放到 store 中
let car = JSON.parse(localStorage.getItem('car') || '[]')

let store = new Vuex.Store({
  state: { //this.$store.state.xxx
    car: car //将购物车中的商品数，用一个数组存储起来，在car数组中，存
    // 商品的对象，可以暂时将商品的对象设计成：
    //{ id:商品id ,count: 数量, price: 商品的单价，seletecd: false }
  },
  mutations: {//this.$store.commit('方法名称','参数')
    addToCar(state, goodsinfo) {
      // 点击加入购物车，把商品信息，保存到store中的car上
      // 分析：
      // 1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
      // 2. 如果没有，则直接把 商品数据，push 到 car 中即可

      // 假设在购物车中，没有找到对应的商品
      var flag = false
      state.car.some(item => {
        if (item.id === goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })

      // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
      if (!flag) {
        state.car.push(goodsinfo)
      }

      // 当更新car之后，把car数组，存储到本地的localstorage中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    // 修改购物车中商品的数量值
    updateGoodsInfo(state, goodsinfo) {
      state.car.some(item => {
        if (item.id === goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      // 当修改完商品的数量，把最新的购物车数据保存到本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    // 根据id，从store中的购物车删除对应的那条商品数据
    removeFromCar(state, id) {
      state.car.some((item, i) => {
        if (item.id === id) {
          state.car.splice(i, 1)
          return true
        }
      })
      // 将删除完毕后最新的购物车信息保存到本地存储中去
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if (item.id === info.id) {
          item.selected = info.selected
        }
      })
      // 把最细你的所有购物车商品的状态保存到store中去
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {//this.$store.getters.xxx
    getAllCount(state) {
      let c = 0;
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount(state) {
      let o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state) {
      let o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state) {
      let o = {
        count: 0, //勾选的数量
        amount: 0 //商品总价
      }
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }

  }
})

// 导入routerjs模块
import router from './router'
import app from './App.vue'


// 导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 设置默认的访问路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// 设置http的
Vue.http.options.emulateJSON = true;

// 安装图片预览插件
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)
// with parameters install
Vue.use(VuePreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: { top: 0, bottom: 0 },
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
})


// 导入格式化时间插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})


// 导入mui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './lib/mui/fonts/mui-icons-extra.ttf'


// 按需加载
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
Vue.use(MintUI)


var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router, //挂载路由对象到vm实例上
  store //挂载store
})