<template>
	<div class="product-view">
		<!-- 调用二次封装导航栏 -->
		<jh-navbar title="商品详情" ></jh-navbar>

		<!-- 调用二次封装 swipe 轮播图-->
		<jh-swipe 
		 :banner1-list="lcStore.goodsOneList.banner"
		 :img-width="800"
		 :img-height="800"
		 ></jh-swipe>
		<p>{{lcStore.goodsOneList.goods_name}}</p>
		<p>{{lcStore.goodsOneList.star_number}}</p>
		<p>{{lcStore.goodsOneList.price}}</p>
		 
		<van-cell @click="isShowSheet = true" icon="sign" title="选择颜色，尺寸，数量" is-link />
		<van-cell icon="diamond-o" title="查看品牌全部商品" is-link />
		
		<van-action-sheet :close-on-click-overlay="false" v-model:show="isShowSheet" title="请选择商品信息">
			<!-- 颜色尺寸 -->
			<div class="jh-action-sheet">
				<ul class="select-size">
					<li class="van-hairline--surround" :key="item" v-for="item in getSelectSize">
						<img :src="item" />
					</li>
				</ul>
				<!-- 数量 -->
				<van-stepper v-model="nowGoodsNumber" :min="1" :max="10" />
				
				<van-button @click="clickSelectH" round color="#F6BAC3" block>确定</van-button>
			</div>
		  
		</van-action-sheet>
		
		
		<div class="goods-desc">
			<van-image :key="item" :src="item" v-for="item in lcStore.goodsOneList.product_banner"></van-image>
		</div>
		 
		<!-- 下面的加入购物车 -->
		<van-action-bar placeholder>
		  <van-action-bar-icon icon="chat-o" text="客服" />
		  <van-action-bar-icon icon="cart-o" text="购物车" :badge="userStore.cartNumber" @click="router.push({name:'cart'})"/>
		  <van-action-bar-icon icon="star-o" text="收藏" />
		  <van-action-bar-button @click="clickAddCartH" color="linear-gradient(to right, #F6BAC3, #DD9AA4)" type="warning" text="加入购物车" />
		  <van-action-bar-button @click="clickBuyH" color="linear-gradient(to right, #B9757F, #96505B)" type="danger" text="立即购买"  />
		</van-action-bar>
		
	</div>
</template>

<script setup>
	import { showLoadingToast, showFailToast, showSuccessToast } from 'vant';
	import {  jhAPI } from '../api/index.js'
	//路由
	import { ref, computed } from 'vue';
	import {useRoute, useRouter} from 'vue-router'
	let router = useRouter();
	let route = useRoute();
	// console.log(route.query.goodsId);
	
	// store
	import { useLcStore, useUserStore } from '../stores'
	let lcStore = useLcStore();
	let userStore = useUserStore();
	
	
	lcStore.getGoodsOneData()
	// 弹出框双向绑定
	let isShowSheet = ref(false);
	// 当前商品数量 
	let nowGoodsNumber = ref(1);
	// 当前用户操作功能
	let userStatus = ref('');
	
	// 弹出框的商品颜色 尺寸
	let getSelectSize = computed(() => {
		if(!lcStore.goodsOneList.banner){return}
		
		return lcStore.goodsOneList.banner.length > 4 ? lcStore.goodsOneList.banner.slice(0, 4) : lcStore.goodsOneList.banner;
		
	});
	
	// 点击加车
	let clickAddCartH = () => {
		// 弹出选择框
		isShowSheet.value = true;
		// 改变当前状态 加车 | 购买
		userStatus.value = 'add';	
	};
	
	// 点击立即购买
	let clickBuyH = () => {
		// 弹出选择框
		isShowSheet.value = true;
		// 改变当前状态 加车 | 购买
		userStatus.value = 'buy';
	};
	
	// 商品选确定执行函数
	let clickSelectH = async () => {
		// 验证权限
		if(!userStore.TOKEN || !userStore.USERNAME){
			showFailToast('请登录');
			return;
		};
		
		// 加车
		if(userStatus.value == 'add'){
			// 请求！原始的公共接口
			let res = await jhAPI.postData('/api_cart', {
				userId : userStore.TOKEN,
				status : 'addcart',
				goodsId : route.query.goodsId,
				goodsNumber : nowGoodsNumber.value
			});
			//验证
			if(res.code != 0){
				showFailToast('加入购物车失败');
				return;
			};
			// 关闭弹出框
			isShowSheet.value = false;
			// 调用当前用户的购物车数量方法
			userStore.getCartNumberData();
			showSuccessToast('加入购物车成功');
			return;
		};
		
		// 直接购买
		if(userStatus.value == 'buy'){
			// 跳转到 地址页面
			router.push({name : 'order', query : {goodsId : route.query.goodsId,goodsNumber : nowGoodsNumber.value}});
			return;
		};
	};
	

	
</script>

<style lang="less" scoped>
	.jh-action-sheet{
		padding: 10px;
		box-sizing: border-box;
		
		.select-size{
			padding: 30px 10px;
			display: flex;
			justify-content: space-between;
			li{
				width: 18%;
				padding: 2px;
				&:after{border-color: #999;}
				img{
					width: 100%;
					// border: 1px solid #999;
				}
			}
		}
		
	}
</style>