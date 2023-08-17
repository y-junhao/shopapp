import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'
import { useUserStore } from '../stores'
// let userStore = useUserStore()
// console.log('router',userStore)
// 一级路由
import IndexView from '../views/IndexView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProductView from '../views/ProductView.vue'
import SearchView from '../views/SearchView.vue'
import SclassifyView from '../views/SclassifyView.vue'

// index 子路由(二级路由)
import HomeView from '../views/index-child/HomeView.vue'
import ClassifyView from '../views/index-child/ClassifyView.vue'
// 懒加载
let CartView = () => import('../views/index-child/CartView.vue')
let UserView = () => import('../views/index-child/UserView.vue')
let OrderView = () => import('../views/OrderView.vue')

let routes = [
	// 一级路由
	{path : '/', redirect : '/index/home'},
	{
		path : '/index', 
		name : 'index', 
		component : IndexView,
		children : [
			{
				path : '/index/home', 
				name : 'home', 
				component : HomeView,
			},
			{path : '/index/classify', name : 'classify', component : ClassifyView},
			{path : '/index/cart', name : 'cart', component : CartView},
			{path : '/index/user', name : 'user', component : UserView},
		]
	},
	{path : '/login', name : 'login', component : LoginView},
	{path : '/register', name : 'register', component : RegisterView},
	{path : '/product', name : 'product', component : ProductView},
	{path : '/search', name : 'search', component : SearchView},
	{path : '/sclassify', name : 'sclassify', component : SclassifyView},
	{path : '/order', name : 'order', component : OrderView}
]

const router = createRouter({
	// history : createWebHashHistory(),
	history : createWebHistory(),
	
	routes,
})

// 路由拦截
router.beforeEach((to, from, next) => {
	let userStore = useUserStore()
	console.log(to.path, from.path)
	userStore.fromRoute = from
	// next();
	userStore.TOKEN = userStore.storage.getItem('token');
	userStore.USERNAME = userStore.storage.getItem('username');
	// 后面还页面，也需要拦截
	if(!(userStore.TOKEN && userStore.USERNAME) && (to.path == '/index/cart' ||  to.path == '/index/user' || to.path == '/order' || to.path == '/address')){
		// 跳转到登录
		next('/login');
		return;
	};
	
	next();
	
});

export default router;