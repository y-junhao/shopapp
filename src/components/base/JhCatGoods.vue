<template>
	<div class="jh-cat-goods">
		
		<h1 class="jh-cat-goods-title">{{props.catList.cat_detial || props.catList.cat_name}}</h1>
		<!-- 商品容器 -->
		<div class="jh-cat-goods-content">
			<!-- 调用单独商品组件 -->
			<jh-goods v-for="subItem in props.catList.data" :key="subItem.goods_id" :sub-goods="subItem"></jh-goods>
		</div>
		
		<!-- 局部样式 -->
		<van-config-provider :theme-vars="moreMargin">
			<!-- 更多 -->
			<van-divider @click="clickMore" :style="{ color: '#F6BAC3', borderColor: '#ccc', padding: '0 10px' }">查看更多&gt;&gt;</van-divider>
		
		</van-config-provider>
		
	</div>
</template>

<script setup>
	
	import { reactive } from 'vue';
	// import JhGoods from './JhGoods.vue'
	// import { useRouter } from 'vue-router'
	// let router = useRouter();
	
	// 接收props
	let props = defineProps(['catList']);
	let emit = defineEmits(['click-more']);
	// console.log(props.catList)
	
	let clickMore = () => {
		emit('click-more');
	};
	
	// vant局部变量设置
	let moreMargin = reactive({
		dividerMargin : '0px 0px 10px'
	})
	
</script>

<style scoped lang="less">
	.jh-cat-goods{
		padding: 0px 10px;
		
		.jh-cat-goods-title{
			font-size: 20px;
			height: 60px;
			line-height: 50px;
		}
		
		.jh-cat-goods-content{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
		}
	}
</style>