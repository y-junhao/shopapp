<template>
	<div class="other-index">
		<!-- 调用二次封装 swipe -->
		 <jh-swipe
		 :banner1-list="lcStore.banner1List" 
		 :padding="10" 
		 :img-width="1000"
		 :img-height="475"
		 :margin-top="10"
		 :img-radius="10"
		 ></jh-swipe>

		<!-- 专题 -->
		<jh-special :special-data="specialData"></jh-special>
		
		<!-- 调用组件 -->
		<!-- 分类数据 -->
		<jh-cat-goods 
		 v-for="item in lcStore.recombineOtherIndexList" 
		 :key="item.title" 
		 :cat-list="item"
		 @click-more="$router.push({name : 'sclassify', query : {catName : item.cat_name, catId : item.cat_id, catDetial : item.cat_detial}})"
		></jh-cat-goods>

	</div>
</template>

<script setup>
	import { reactive } from 'vue'
	import { useLcStore } from '../../stores/index.js'
	let lcStore = useLcStore();
	
	
	// // 专题的数据
	let specialData = reactive([
		{goods_id : 1, goods_thumb : 'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/31/31312.jpg'},
		{goods_id : 2, goods_thumb : 'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/31/31331.jpg'},
		{goods_id : 3, goods_thumb : 'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/31/31181.jpg'},
		{goods_id : 4, goods_thumb : 'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30765.jpg'},
		{goods_id : 5, goods_thumb : 'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30571.jpg'},
		{goods_id : 6, goods_thumb : 'https://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30470.jpg'}
		
	])
	
	lcStore.getRecombineOtherIndexData();
	
</script>

<style scoped lang="less">
	
</style>