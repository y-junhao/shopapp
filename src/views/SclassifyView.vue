<template>
	<div class="small-classify-view">
		<!-- 调用二次封装导航栏 -->
		<jh-navbar title="商品列表" ></jh-navbar>
		
		<!-- 标题 -->
		<div class="cat-title">{{route.query.catName.replace('分类', '')}}</div>
		
		<!-- 小分类列表 -->

      <van-tabs
      v-model:active="nowCatDetial" 
			@click="router.push({query:{...route.query,catDetial : nowCatDetial}})"
      >
        <van-tab v-for="item in lcStore.SClassifyViewClassifyList" :key="item.id" :name="item.product_content" :title="item.product_content"></van-tab>
      </van-tabs>
		
		<!-- 商品列表 -->
		<div v-if="lcStore.searchList.length != 0" class="goods-list">
			<jh-goods v-for="(item, index) in lcStore.searchList" :key="item.goods_id + index" :sub-goods="item"></jh-goods>
		</div>
		<!-- 空状态 -->
		<van-empty v-else description="当前分类暂无商品" />


</div>
</template>

<script setup>
	//路由
	import {useRoute,useRouter} from 'vue-router'
	let route = useRoute();
	let router = useRouter();
	import { ref,watch} from 'vue'
	import { useLcStore } from '../stores'
	let lcStore = useLcStore();
	if(!lcStore.classifyList.length){
		lcStore.getClassifyData();
	}


	let nowCatDetial = ref('');


	
	watch(() => route.query.catDetial, (newValue, oldValue) => {
			lcStore.getSearchData(route.query.catDetial);

			if(!nowCatDetial.value){
				nowCatDetial.value = route.query.catDetial;
			};

		},
		{immediate : true}
	)

	
</script>

<style scoped lang="less">
	
	.small-classify-view{
		overflow-x: scroll;
		box-sizing: border-box;
		.cat-title{
			text-align: center;
			line-height: 50px;
			height: 50px;
			color: #666;
		}
		
		// .sclassify-list{
		// 	width:100%;
		// 	overflow-x: scroll;
		// 	height: 30px;
		// 	white-space: nowrap;
		// 	border-bottom: 2px solid #BEBEBE;
			
		// 	&::-webkit-scrollbar{height: 0px;}
			
		// 	li{
		// 		display: inline-block;
		// 		margin: 0px 14px;
		// 		height: 28px;
		// 		border-bottom: 2px solid #000;
		// 		color: #666;
		// 	}
		// }
		
		.goods-list{
			padding: 10px;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
		}
	}
	
	
</style>