<template>
	
	<van-swipe 
	 class="my-swipe" 
	 indicator-color="#F6BAC3"
	 autoplay="3000"
	 duration="300"
	 :height="banner1Height"
	 :style="{marginTop : props.marginTop + 'px'}"
	 >
		<van-swipe-item 
		 @click="$router.push({name : 'product', query : {goodsId : item.goods_id}})" 
		 class="jh-swipe-item"
		 :style="{padding :`0px ${padding}px`}"
		 v-for="item in props.banner1List" 
		 :key="item.goods_id"
		 >
			<van-image :radius="imgRadius" :src="item.goods_thumb || item"></van-image>
		</van-swipe-item>
	</van-swipe>
	
</template>

<script setup>
	import { computed } from 'vue'
	
	let props = defineProps({
		banner1List : Array,
		imgWidth : Number,
		imgHeight : Number,
		padding : {
			type : Number,
			default : 0
		},
		imgRadius : Number,
		marginTop : Number
	});
	 	
	
	
	// 轮播图高度
	let banner1Height = computed(() => {
		// 获取当前窗口宽度
		let w = document.body.clientWidth || document.documentElement.clientHeight;
		// console.log(w);
		return props.imgHeight/props.imgWidth * (w - props.padding*2);
	});
	
</script>

<style scoped lang="less">

.my-swipe{
	.jh-swipe-item{
		box-sizing: border-box;
	}
}
	
</style>