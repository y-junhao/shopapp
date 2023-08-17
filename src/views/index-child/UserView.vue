<template>
  <div>
    <div class="user-title">个人中心</div>
    <van-cell-group>

      <van-cell title="我的订单" is-link center size="large">
        <template #icon>
          <van-icon :name="dingdan" size="30"/>
        </template>
      </van-cell>
      <van-cell title="地址管理" is-link center size="large">
        <template #icon>
          <van-icon :name="dizhi" size="30"/>
        </template>
      </van-cell>
      <van-cell title="心愿单" is-link center size="large">
        <template #icon>
          <van-icon :name="heart" size="30"/>
        </template>
      </van-cell>
      <van-cell title="我的红包" is-link center size="large">
        <template #icon>
          <van-icon :name="hongbao" size="30"/>
        </template>
      </van-cell>
      <van-cell title="联系客服" is-link center size="large">
        <template #icon>
          <van-icon :name="kefu" size="30"/>
        </template>
      </van-cell>
      <van-cell title="服务政策" is-link center size="large">
        <template #icon>
          <van-icon :name="zhengce" size="30"/>
        </template>
      </van-cell>
      <van-cell title="退出登录" is-link center size="large" @click="logOut">
        <template #icon>
          <van-icon :name="tuichu" size="30"/>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup>
import tuichu from '../../assets/img/tuichu.png';
import zhengce from '../../assets/img/zhengce.png';
import kefu from '../../assets/img/kefu.png';
import hongbao from '../../assets/img/hongbao.png';
import heart from '../../assets/img/heart.png';
import dizhi from '../../assets/img/dizhi.png';
import dingdan from '../../assets/img/dingdan.png';

import { useRouter } from 'vue-router';
let router = useRouter();
let logOut = () =>{
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('username');
  router.push('/')
}
</script>

<style lang="less" scoped>
#app > div{
  background-color: #F1F1F1;
}
.user-title{
  height:88px;
  color: #333333;
  text-align: center;
  line-height: 88px;
  font-size: 18px
}
.van-cell-group{
  margin-top: 50px;
}
</style>