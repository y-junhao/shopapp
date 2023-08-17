<template>
	<van-nav-bar
	  left-text="返回"
	  right-text="按钮"
	  left-arrow
		:clickable="false"
		fixed
		placeholder
		safe-area-inset-top
		:title="props.title"
		@click-left="$router.go(-1)"
	>
		<template v-slot:right>
			<div v-if="$route.name !='login' && $route.name !='order' && $route.name !='register'">
				<!-- 根据登录状态：登录 | 购物车 个人中心 -->
				<span v-if="!userStore.isLogin" @click="$router.push({name:'login'})"  class="login-btn">登录</span>
				<span v-else>
					<van-icon @click="$router.push({name:'cart'})" :badge="userStore.cartNumber" class="jh-navbar-icon" name="shopping-cart-o" />
					<van-icon @click="$router.push({name:'user'})" class="jh-navbar-icon" name="contact" />
				</span>		
			</div>
				
		</template>
	</van-nav-bar>
</template>

<script setup>
	import { useUserStore } from '../../stores';
	let userStore = useUserStore()
	let props = defineProps({
		title : String,
	});
	
</script>

<style scoped lang="less">
	
	.login-btn{
		color: #fff;
		font-size: 15px;
	}
	
	.jh-navbar-icon{
		font-size: 20px;
		margin-left:14px;
	}
	
	
</style>