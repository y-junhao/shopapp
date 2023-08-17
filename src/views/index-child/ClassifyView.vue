<template>
	<div class="classify-view">
		<div class="classify-left">
			<p 
			 :style="{background : lcStore.nowCatId == item.cat_id ? '#f7f7f7' : '#DADADA', color : lcStore.nowCatId == item.cat_id ? '#F6BAC3' : '#333'}" 
			 @click="router.push({query:{catId:item.cat_id}})" 
			 v-for="item in lcStore.catList" 
			 :key="item.cat_id"
			 >
			  {{item.cat_name}}
			 </p>
		</div>

    <div class="classify-right">
			<img :src="lcStore.getRecombineClassifyView.title_img" />
			<h2>• {{lcStore.getRecombineClassifyView.title}} •</h2>
			<ul class="classify-list">
				<li 
				 v-for="item in lcStore.getRecombineClassifyView.data" 
				 @click="router.push({name : 'sclassify', query : {catName : lcStore.getRecombineClassifyView.title, catId : lcStore.getRecombineClassifyView.cat_id, catDetial : item.product_content}})"
				 :key="item.id"
				 >
					<img :src="item.product_img" />
					<p>{{item.product_content}}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
	import { useRouter } from 'vue-router';
  import { useLcStore } from '../../stores'
	let lcStore = useLcStore();
  let router = useRouter()
  if(!router.currentRoute.value.query.catId){
    router.push({query:{catId:'0045'}})
  }

</script>

<style scoped lang="less">
	.classify-view{
		display: flex;
		
		.classify-left{
			width: 27%;
			background: #DADADA;
			overflow-y: scroll;
			overflow-x: hidden;
			
			p{
				font-size: 16px;
				height: 60px;
				line-height: 60px;
				text-align: center;
				color: #333;
			}
		}
		.classify-right{
			width: 73%;
			padding: 10px;
			box-sizing: border-box;
			background-color: #f7f7f7;
			overflow-y: scroll;
			overflow-x: hidden;
			
			&>img{width: 100%}
			h2{
				font-size: 16px;
				line-height: 40px;
				text-align: center;
				font-weight: normal;
				color: #666;
			}
			.classify-list{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				li{
					text-align: center;
					margin-bottom: 30px;
					color: #333;
					font-size: 12px;
					width: 30%;
					img{width: 100%;}
				}
			}
		}
	}
</style>