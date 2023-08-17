<template>
	<div class="jh-goods" @click="$router.push({name : 'product', query : {goodsId : props.subGoods.goods_id}})">
		<img :src="props.subGoods.goods_thumb" >
		<p class="goods-name van-multi-ellipsis--l2">{{props.subGoods.goods_name}}</p>
		<p class="goods-desc van-multi-ellipsis--l2">{{props.subGoods.goods_desc}}</p>
		<p class="goods-price">￥{{props.subGoods.price}}</p>
	</div>
</template>

<script setup>
	
	let props = defineProps(['subGoods']);
	
	
</script>

<style scoped lang="less">
	.jh-goods{
		height: 320px;
		width: 49%;
		background-color: white;
		margin-bottom: 16px;
		img{width: 100%; margin-bottom: 10px;}
		p{padding: 0px 6px; line-height: 18px; margin: 5px 0px;}
		.goods-name{
			color: #333;
			font-size: 13px;
		}
		.goods-desc{
			color: #999;
			font-size: 12px;
			// white-space: nowrap;
			// overflow: hidden;
			// text-overflow: ellipsis;
		}
		.goods-price{
			font-size: 16px;
			color: #F6BAC3;
			font-weight: bold;
		}
	}
</style>