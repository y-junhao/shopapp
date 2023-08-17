<template>
	<div class="banner2">
		<div>
			<img src="/src/assets/img/banner2_1.png" alt="">
			<img src="/src/assets/img/banner2_3.png" alt="">
		</div>
		<div>
			<img src="/src/assets/img/banner2_2.png" alt="">
			<img src="/src/assets/img/banner2_4.png" alt="">
		</div>
	</div>
</template>

<script>
</script>

<style scoped lang="less">
	.banner2{
		padding: 10px 10px 0px;
		display: flex;
		justify-content: space-between;
		&>div{
			width: 49%;
			img{width: 100%; border-radius: 6px;}
			img:first-child{margin-bottom: 5px;}
		}
	}
</style>