<template>
	
	<!-- 搜索框 -->
	<van-search 
	 :placeholder="props.placeholder"
	 shape="round"
	 :disabled="props.disabled"
	 input-align="center"
	 v-model="childKeywords"
	 :show-action="jhShowAction"
	 
	 @click.stop="clickInputHandler"
	 @update:model-value="oninput"
	 >
	  <!-- 左侧按钮 -->
	  <template v-slot:left>
			<span v-if="showLeft" @click="clickLeftBtn" class="back">
				<van-icon name="arrow-left" />
			</span>
	  </template>
		
		<!-- 右侧按钮 -->
		<template v-slot:action>
			<span @click="clickRBtn">
				{{jhActionText}}
			</span>
		</template>
	 </van-search>
	
</template>

<script setup>
	import { ref } from 'vue';
	
	// props 参数 父向子传递过来的
	let props = defineProps({
		// 禁用功能
		disabled : {
			type : Boolean,
			default : false
		},
		// 双向绑定
		modelValue : {
			type : String,
			default : ''
		},
		// 提示文本
		placeholder : String,
		showLeft : {
			type : Boolean,
			default : false
		},
		// 右边搜索按钮
		jhShowAction : {
			type : Boolean,
			default : false
		},
		//右边搜索文本
		jhActionText : String
	});
	
	// 关键字
	let childKeywords = props.modelValue;
	
	// 自定义事件 
	let emit = defineEmits(['click', 'searchbtn', 'update:modelValue', 'leftbtn']);
	
	// 点击事个输入框
	let clickInputHandler = () => {
		emit('click');
	};
	
	// 点击右边搜索按按钮
	let clickRBtn = () => {
		emit('searchbtn');
	};
	
	// 点击左边返回按钮
	let clickLeftBtn = () => {
		emit('leftbtn');
	};
	
	let oninput = (val) => {
		emit('update:modelValue', val);
	};
	
	
</script>

<style scoped lang="less">
.back{
	padding-right: 10px;
	i{
		font-size: 20px;
		font-weight: bold;
	}
}
</style>