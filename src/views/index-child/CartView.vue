<template>
	<div class="cart-view">
		
		<!-- 调用二次封装导航栏 -->
		<!-- <jh-navbar
		 @clickleft="$router.go(-1)"
		 title="购物车"
		 >
		</jh-navbar> -->
		<jh-navbar title="购物车"></jh-navbar>

		<!-- 商品列表 -->
		<van-swipe-cell
		 v-for="item in userStore.cartList"
		 :key="item.goods_id"
		 >
			<div class="jh-van-swipe-cell">
				<!-- 单选 -->
				<van-checkbox class="cart-check" v-model="item.isChecked" @change="newcheckAll =  item.isChecked ? newcheckAll : false"></van-checkbox>
				<van-card
					class="goods-card"
					:num="item.goods_number"
					:desc="item.goods_desc"
					:title="item.goods_name"
					:origin-price="item.price * 1.05"
					@click-thumb="$router.push({name : 'product', query : {goodsId : item.goods_id}})"
      
				 >
				  <template #thumb>
						<img style="width: 100%;" :src="item.goods_thumb"/>
					</template>
					
					<template #num>
						<van-stepper
						 max="10" 
						 min="1" 
						 v-model="item.goods_number" 
						 theme="round" 
						 button-size="18" disable-input
						 :name="item.goods_id"
						 @change="changeNumber"
						/>
					</template>
					
					<template #price>¥{{item.price}}</template>
				 </van-card>
			</div>
		  <template #right>
		    <van-button color="#F6BAC3" square text="删除" type="danger" class="jh-delete-button" @click="del(item.goods_id)" />
		  </template>
		</van-swipe-cell>
		
		<van-submit-bar :price="userStore.priceAll*100" button-text="提交订单" @submit="$router.push({name:'order'})" >
		  <van-checkbox v-model="newcheckAll">全选</van-checkbox>
		  <template #tip>
		    你的收货地址不支持配送, <span @click="onClickLink">修改地址</span>
		  </template>
		</van-submit-bar>
		
	</div>
</template>

<script setup>
	import { ref, watch } from 'vue'
	import { useUserStore } from '../../stores'
  import { jhAPI } from '../../api';
	import { showFailToast, showSuccessToast } from 'vant';
	let userStore = useUserStore();
	let newcheckAll = ref(true)

  watch(newcheckAll, (newValue, oldValue) => {
    if(newValue == false && userStore.cartList.some(item => {return item.isChecked == false})){return}
    userStore.cartList.forEach(item => {
      item.isChecked = newValue;
    });
  })
	
	// 点击 数量
	let changeNumber = async (num, {name : goodsId}) => {
		let res = await jhAPI.postData('/api_cart', {
			userId : userStore.TOKEN,
			status : 'addcart',
			goodsId : goodsId,
			goodsNumber : num
		});
		if(res.code != 0){
			showFailToast('后台繁忙~~~');
			return false;
		};
		// 后台修改成功
	};

	let del = async (id) => {
		let index = userStore.cartList.findIndex(item => {
			return item.goods_id == id
		})

		let res = await jhAPI.postData('/api_cart',
			{ 
				userId:userStore.TOKEN,
				goodsId:id,
				status:'delcart',
			}
		);
		if(res.code != 0){
			console.log(res);
			showFailToast('后台繁忙~~~');
			return
		};

		userStore.cartList.splice(index, 1);
		showSuccessToast('删除成功')
	}
</script>

<style scoped lang="less">

	.cart-view{
		margin-bottom: 90px;
		.van-swipe-cell{
			margin: 10px 0px;
			
			.jh-van-swipe-cell{
				display: flex;
				justify-content: space-between;
				align-items: center;
				background: #F7F8FA;
				
				.cart-check{margin-left: 8px;}
				.goods-card{
					width: 90%;
					margin-top: 0px;
					padding-left: 0px;
				}
				
			}
			
			.jh-delete-button{
				height: 100%;
			}		


		}
		
		.van-submit-bar{
			margin-bottom: 50px;
			background: #f2f2f2;
		}
		
		
	}
	
	
</style>