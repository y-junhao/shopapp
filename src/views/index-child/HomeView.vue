<template>
  <div class="home-view">
    <van-sticky>
      <jh-search disabled placeholder="搜索内容" @click="$router.push('/search')"></jh-search>
      <van-tabs
			 v-model:active="nowCat" 
       @change = "TabChange"
			 sticky 
			 offset-top="54"
			 >
				<van-tab v-for="item in lcStore.HomeViewCatList" :key="item.cat_id" :name="item.cat_id" :title="item.cat_name"></van-tab>
			</van-tabs>
    </van-sticky>    
    <transition
		 mode="out-in"
		 enter-active-class="animate__animated_index animate__slideInRight"
		 leave-active-class="animate__animated_index animate__slideOutLeft"
		 >
			<component :key="lcStore.nowCatId" :is="nowCat == '0000' ? HomeIndex : OtherIndex"></component>
		</transition>

  </div>
</template>

<script setup>
  import HomeIndex from '../../components/home-view-child/HomeIndex.vue'
  import OtherIndex from '../../components/home-view-child/OtherIndex.vue'
  import { ref } from 'vue';
  import {useLcStore} from '../../stores'
  import { useRouter } from 'vue-router';
  let lcStore = useLcStore()
  lcStore.getBanner1Data()
  let router = useRouter()
  let nowCat = ref('')
  let TabChange = () =>{
    if(nowCat.value == '0000' && lcStore.nowCatId && lcStore.nowCatId != '0000' && !lcStore.recombineOtherIndexList.length){
      nowCat.value = lcStore.nowCatId
    }
    router.push({query:{catId:nowCat.value}})
  }







</script>

<style lang="less" scoped>

</style>