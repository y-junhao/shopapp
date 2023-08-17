<template>
	<div class="search-view">
		<!-- 调用二次封装的 vant 组件 -->
		<jh-search 
		 @searchbtn="searchBtnH"
		 @leftbtn="$router.go(-1);"
		 v-model="keywords"
		 :placeholder="'请输入搜索商品 品牌'"
		 show-left
		 jh-show-action
		 jh-action-text="搜索"
		/>
		
		<van-popup
			v-model:show="searchResult"
			closeable
			position="right"
			:style="{ width: '100%', height: '100%' }"
		>
		<div v-if="lcStore.searchList.length != 0" class="goods-list">
			<jh-goods v-for="(item, index) in lcStore.searchList" :key="item.goods_id + index" :sub-goods="item"></jh-goods>
		</div>
		<!-- 空状态 -->
		<van-empty v-else description="当前分类暂无商品" />

	</van-popup>
	</div>
</template>

<script setup>
	import { closeToast, showLoadingToast } from 'vant';
	import { ref } from 'vue'
	import { useLcStore } from '../stores';
	let lcStore = useLcStore()
	let keywords = ref('');
	let searchBtnH = async() => {
		lcStore.getSearchData(keywords.value);
		searchResult.value = true
		// console.log(keywords);
	};
	
	const searchResult = ref(false)

</script>

<style scoped lang="less">

.goods-list{
margin-top: 50px;
padding: 10px;
display: flex;
justify-content: space-between;
flex-wrap: wrap;
}


	
</style>