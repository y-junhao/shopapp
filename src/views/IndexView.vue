<template>
  <div>
    <router-view></router-view>


    <van-tabbar
		 v-model="active"
		 active-color="#F6BAC3"
		 inactive-color="#666666"
		 safe-area-inset-bottom
		 route
		 placeholder
		 >
		 
			<!-- 遍历tab项 -->
		  <van-tabbar-item
			 v-for="item in tabbarData"
			 :key="item.name"
			 :name="item.name" 
			 :to="item.to"
			 :badge-props="item.badgeProps"
			 >
				<span>{{item.text}}</span>
				<template v-slot:icon="props">
					<img :src="props.active ? item.imgAc : item.img">
				</template>
			</van-tabbar-item>
			
		</van-tabbar>

  </div>
</template>

<script setup>
  import {useLcStore,useUserStore} from '../stores'
  import { computed } from 'vue';
  let lcStore = useLcStore();
  lcStore.getCatData()
  lcStore.getClassifyData()
  import h from '/src/assets/img/home.png'
  import hAc from '/src/assets/img/home_ac.png'

  import c from '/src/assets/img/classify.png'
  import cAc from '/src/assets/img/classify_ac.png'
    
  import u from '/src/assets/img/user.png'
  import uAc from '/src/assets/img/user_ac.png'
    
  import ca from '/src/assets/img/cart.png'
  import caAc from '/src/assets/img/cart_ac.png'

  let active = 'home';
  let userStore = useUserStore();
	// 定义底部 tabbar 的数据
	let tabbarData = computed(() => {
		return [
			{
				name : 'home', 
				text : '首页', 
				to : '/index/home', 
				img : h, 
				imgAc : hAc,
			},
			{
				name : 'classify', 
				text : '分类', 
				to : '/index/classify', 
				img : c,
				imgAc : cAc,
			},
			{
				name : 'cart', text : '购物车',
				to : '/index/cart', 
				img : ca, 
				imgAc :caAc, 
				// badgeProps : {color : '#F6BAC3', content : 123},
				badgeProps : {color : '#F6BAC3', content : userStore.cartNumber},
			},
			{
				name : 'user', 
				text : '我的', 
				to : '/index/user', 
				img : u, 
				imgAc : uAc,
			}
		];
	});
</script>

<style lang="less" scoped>

</style>