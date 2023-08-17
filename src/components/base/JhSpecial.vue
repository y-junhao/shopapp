<template>
	<div class="special-content">
		<h1 class="special-title">专题</h1>
		<ul class="spcial-list">
			<li v-for="item in props.specialData" :key="item.goods_id"><img :src="item.goods_thumb"></li>
		</ul>
	</div>
</template>

<script setup>
	
	let props = defineProps({
		specialData : Array
	})
	
</script>

<style scoped lang="less">
.special-content{
	padding: 10px;
	h1{
		font-size: 20px;
		line-height: 40px;
	}
	
	.spcial-list{
		width: 100%;
		// 设置滚动条
		overflow-x: scroll;
		white-space: nowrap;
		
		li{
			// 子级转换为行内块
			display: inline-block;
			width: 40%;
			margin-right: 8px;
			img{
				width: 100%;
				border: 1px solid #eee;
				border-radius: 8px;
			}		
		}
	}
}
</style>