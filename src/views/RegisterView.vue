<template>
	<div class="register-view">
		<jh-navbar title="注册"></jh-navbar>
		
		<!-- 表单 -->
		<van-form ref="registerForm">
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
			<van-cell value="已有账号，去登录" is-link @click="$router.push({name:'login'})"/>
			
		</van-form>
		
	</div>
</template>


<script setup>
	import { ref} from 'vue'
	// 要等挂载组件完成才能使用
	import { showLoadingToast, showSuccessToast, showFailToast, closeToast } from 'vant'
	
	// 引入请求
	import { jhAPI } from '../api/index.js'
	
	import { useRouter } from 'vue-router'
	let router = useRouter();
	
	// 当前组件双向绑定数据
	let username = ref('');
	let password = ref('');
	
	// 用户名规则校验函数
	let validatorUser1 = (v, r) => {
		let reg = /^[0-9a-z_]{3,12}$/g;
		if(!reg.test(v)) return false;
		return true;
	};
	// 用户名后台请求
	let validatorUser2 = (v, r) => {
		return new Promise(async (resolve, reject) => {
			// 请求
			let res = await jhAPI.postData('/api_user', {username : v, status : 'check'});
				resolve(res.code == 0);
		});
	};
	
	let validatorPwd = (v, r) => {
		let reg = /^\d{6,12}$/g;
		if(!reg.test(v)) return false;
		return true;
	};
	
	// 校验规则
	let rules = {
		usernameRules : [
			{required: true,  message: '用户名不能为空'},
			{validator : validatorUser1, message: '用户名必须为3-12位数字字母下划线'},
			// 异步校验 用户名是否可用
			{validator : validatorUser2, message: '用户已存在'},
			
		],
		
		passwordRules : [
			{validator : validatorPwd, message: '密码必须为6-12位数字', trigger : 'onChange'}
		],
		
	};

	
	// 获取模板引用组件实例方法 定义一个同名的ref名称
	let registerForm = ref(null);
	
	// 注册按钮方法
	let clickOnsubmit = () => {
		// console.log(registerForm);
		//查看所有的项全部通过验证
		registerForm.value.validate().then(async () => {
			
			// 注册
			showLoadingToast('注册中...');
			// 请求
			let res = await jhAPI.postData('/api_user', {username : username.value, password : password.value, status : 'register'});
			console.log(res)
			
			if(res.code != 0){
				closeToast();
				showFailToast('注册失败，后台繁忙~~~');
				return;
			};
			// 注册
			closeToast();
			showSuccessToast('注册成功');
			
			// 跳转登录
			router.push('/login');
			
		}, err => {
			
			console.log(err);
		});
	};
	
	// 点击返回上一级路由

	
</script>

<style>
</style>