<template>
	<div class="login-view">
		<!-- 调用二次封装导航栏 -->
		<!-- <jh-navbar
		 @clickleft="router.go(-1)"
		 title="登录"
		 >
		</jh-navbar> -->
		<jh-navbar title="登录"></jh-navbar>
		
		<!-- 登录框 -->
		<!-- 表单 -->
		<van-form ref="loginForm">
		  <van-cell-group inset>
				
		    <van-field
		      v-model="username"
		      name="用户名"
		      label="用户名"
		      placeholder="请输入用户名"
		      :rules="rules.usernameRules"
		    />
				<van-field
		      v-model="password"
		      name="密码"
		      label="密码"
					type="password"
		      placeholder="请输入密码"
		      :rules="rules.passwordRules"
		    />
		  </van-cell-group>
			
		  <div style="margin: 16px;">
		    <van-button round block type="primary" @click="clickOnsubmit">
		      提交
		    </van-button>
		  </div>
			<van-cell value="没有账号，去注册" is-link @click="$router.push({name:'register'})"/>
		</van-form>

	</div>
</template>

<script setup>
	import { ref} from 'vue'
	
	//store
	import { useUserStore } from '../stores'
	let userStore = useUserStore();
	
	// 引入请求
	import { jhAPI } from '../api/index.js'
	// 要等挂载组件完成才能使用
	import { showLoadingToast, showSuccessToast, showFailToast, closeToast } from 'vant'
	//路由
	import { useRouter} from 'vue-router'
	let router = useRouter();
	
	
	// 当前组件双向绑定数据
	let username = ref('');
	let password = ref('');
	// 校验规则
	let rules = {
		usernameRules : [
			{required: true,  message: '用户名不能为空'},			
		],		
		passwordRules : [
			{required: true,  message: '用户名不能为空'},
		],	
	};
	
	// 获取模板引用组件实例方法 定义一个同名的ref名称
	let loginForm = ref(null);
	let clickOnsubmit = () => {
		loginForm.value.validate().then(async () => {
			showLoadingToast('登录中...');
			// 通过不为空的验证
			// 请求
			let res = await jhAPI.postData('/api_user', {username : username.value, password : password.value, status : 'login'});
			if(res.code == 1007 || res.code == 1008){
				closeToast();
				showFailToast('用户名或密码错误');
				return;
			};
			// 登录成功
			closeToast();
			showSuccessToast('登录成功！');
			// 用户持久化
			window.localStorage.setItem('token', res.user_id);
			window.localStorage.setItem('username', res.username);
			// 跳转
      if(Object.keys(userStore.fromRoute.query)[0]){
        router.go(-1)
      }else{
        router.push('/');
      }

    }).catch(err => {
			
		});
	}
	
	
</script>


<style>
</style>