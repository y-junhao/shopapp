<template>
	<div class="home-index">
		<!-- 调用二次封装 swipe -->
		<jh-swipe
		 :banner1-list="lcStore.banner1List" 
		 :padding="10" 
		 :img-width="1000"
		 :img-height="475"
		 :margin-top="10"
		 :img-radius="10"
		 ></jh-swipe>
		
		<!-- 轮播图2 -->
		<jh-banner2></jh-banner2>
		<jh-banner2></jh-banner2>
		
		<!-- 分类数据 -->
		<jh-cat-goods 
		 v-for="item in lcStore.recombineHomeIndexList" 
		 :key="item.cat_id" 
		 :cat-list="item"
		 @click-more="$router.push({name : 'classify', query : {catId : item.cat_id}})"
		></jh-cat-goods>
		
	</div>
</template>

<script setup>
	// import JhSwipe from '../base/JhSwipe.vue'
	// import WjBanner2 from '../base/WjBanner2.vue'
	// import WjCatGoods from '../base/WjCatGoods.vue'
	
	import { useLcStore } from '../../stores'
	let lcStore = useLcStore();
	
	// import { useRouter } from 'vue-router'
	// let router = useRouter();
	
	// // 调用首页重构数据
	lcStore.getRecombineHomeIndexData();
	
	// // 点击more 跳转到详细分类去
	// let clickMoreH = val => {
	// 	console.log(val);
	// 	//catName catId catDetial
	// 	router.push({name : 'sclassify', query : {catName : val.cat_name, catId : val.cat_id, catDetial : val.cat_detial}});
	// }
	
</script>

<style scoped lang="less">
	
	
</style>