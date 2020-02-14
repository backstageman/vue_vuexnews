import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodList from './components/goods/GoodList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

// 3. 创建路由对象
var router = new VueRouter({
	routes: [
		{ path: '/', redirect: '/home' },
		{ path: '/home', component: HomeContainer },
		{ path: '/member', component: MemberContainer },
		{ path: '/shopcar', component: ShopcarContainer },
		{ path: '/search', component: SearchContainer },
		{ path: '/home/newslist', component: NewsList },
		{ path: '/home/newsinfo/:id', component: NewsInfo },
		{ path: '/home/photolist', component: PhotoList },
		{ path: '/home/photoinfo/:id', component: PhotoInfo },
		{ path: '/home/goodslist', component: GoodList },
		{ path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo' },
		{ path: '/home/goodsdesc/:id',component:GoodsDesc , name: 'goodsdesc' },
		{ path: '/home/goodscomment/:id',component:GoodsComment , name: 'goodscomment' }
	],
	linkActiveClass: 'mui-active'
})

// 把路由对象暴露出去
export default router