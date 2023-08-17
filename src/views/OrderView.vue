<template>
	<div class="order-view">
		<jh-navbar title="确认订单" ></jh-navbar>
		<van-cell-group @click="chooseAddredss=true" :class="'address'">
			<van-cell value is-link center />
			<div class="defaultAddress">
				<p>
					<span>{{ userStore.defaultAddress.name}}</span>
					<span>{{ userStore.defaultAddress.tel }}</span>
				</p>
				<van-text-ellipsis :content="userStore.defaultAddress.address" />
			</div>
		</van-cell-group>

		<van-collapse v-model="activeNames" >
			<van-collapse-item title="订单详情" name="订单详情">
				<van-card
					class="goods-card"
					:num="$route.query.goodsNumber || item.goods_number"
					:desc="item.goods_desc || item.brand_name"
					:title="item.goods_name"
					:origin-price="item.price * 1.05"
					v-for="item in willBuyGoods"
					>
					<template #thumb>
						<img style="width: 100%;" :src="item.goods_thumb ||item.banner[0]"/>
					</template>
					<template #num>
						<span>×{{ $route.query.goodsNumber || item.goods_number }}</span>
					</template>
					
					<template #price>¥{{item.price}}</template>
				</van-card>
			</van-collapse-item>
		</van-collapse>
		
		<!-- 优惠券单元格 -->
		<van-coupon-cell
			:coupons="coupons"
			:chosen-coupon="chosenCoupon"
			@click="showList = true"
		/>

		<van-field v-model="notes" label="备注：" placeholder="填写备注" size="large"/>
		<van-cell title="商品总金额" :value="`￥${allPrice}`" :border="false"/>
		<van-cell title="实付金额" :value="`￥${allPrice-couponsValue}`" size="large" value-class="price-all" />
		<van-index-bar>
			<van-index-anchor index="选择支付方式" />
			<van-radio-group v-model="payWay">
				<van-cell-group class="paygroup">
					<van-cell clickable @click="payWay = '1'">
						<template #title>
							<img src="https://imgs-qn.iliangcang.com/images/zfbicon.png">
							<span class="payway-title">  支付宝支付</span>
						</template>
						<template #right-icon>
							<van-radio name="1" />
						</template>
					</van-cell>
					<van-cell clickable @click="payWay = '2'" center>
						<template #title>
							<!-- <span class="payway-title">领券购买</span> -->
							<van-tag type="primary">免费</van-tag>
						</template>
						<template #right-icon>
							<van-radio name="2" />
						</template>
					</van-cell>
				</van-cell-group>
			</van-radio-group>
		</van-index-bar>

		<van-submit-bar :price="finalPay" button-text="确认支付" @submit="console.log('付款')" placeholder class="final-pay">
		</van-submit-bar>


		<van-popup
			v-model:show="chooseAddredss"
			closeable
			position="right"
			:style="{ width: '100%', height: '100%' }"
		>
			<van-address-list class="address-list"
				v-model="chosenAddressId"
				:list="userStore.addressList"
				:disabled-list="disabledList"
				disabled-text="以下地址超出配送范围"
				default-tag-text="默认"
				@add="onAdd"
				@edit="onEdit"
			/>
		</van-popup>
		<van-popup
			v-model:show="editAddredss"
			closeable
			position="right"
			:style="{ width: '100%', height: '100%' }"
		>
		<van-address-edit
			:address-info="AddressInfo"
			:area-list="areaList"
			show-delete
			:area-columns-placeholder="['请选择', '请选择', '请选择']"
			@save="onSave"
			@delete="onDelete"
		/>
		</van-popup>

		<van-popup
			v-model:show="showList"
			round
			position="bottom"
			style="height: 90%; padding-top: 4px;"
		>
			<van-coupon-list
				:coupons="coupons"
				:chosen-coupon="chosenCoupon"
				:disabled-coupons="disabledCoupons"
				@change="onChange"
				@exchange="onExchange"
			/>
		</van-popup>
		
	</div>
</template>

<script setup>
import { showFailToast, showLoadingToast, showSuccessToast, showToast } from 'vant';
import { useUserStore,useLcStore } from '../stores';
import { ref,computed } from 'vue';
import { watch } from 'vue';
import { areaList } from '@vant/area-data';
import { jhAPI } from '../api';
import { useRoute } from 'vue-router';
let userStore = useUserStore()
let lcStore = useLcStore()
userStore.getAddress()
let chooseAddredss = ref(false)
let editAddredss = ref(false)

const disabledList = [
	{
		id: '3',
		name: '王五',
		tel: '1320000000',
		address: '浙江省杭州市滨江区江南大道 15 号',
	},
];
watch(chooseAddredss,(newValue, oldValue) => {
	if(newValue){
		chosenAddressId.value = ''
	}
})
const chosenAddressId = ref('1');
watch(chosenAddressId, (newValue, oldValue) => {
	if(!newValue){return}
	userStore.Setdefault(userStore.addressList.find(item => {
		return item.id == newValue
	}).address_id)
	chooseAddredss.value=false
})


const AddressInfo = ref({})
const onAdd = () => {
	AddressInfo.value = {};
	editAddredss.value = true;
};
let isEdit = ref('');
const onEdit = (item, index) => {
	isEdit.value = item.address_id;
	AddressInfo.value = {
		name : item.name,
		tel: item.tel,
		province : item.province,
		city : item.city,
		county : item.district,
		addressDetail : item.streetname,
		areaCode	: ''
	};

	editAddredss.value = true
};

const onSave = (msg) => {
	if(!isEdit.value){
		userStore.addAddress(msg);
		isEdit.value = '';
		editAddredss.value = false
		return
	}

	new Promise((resolve, reject) => {
		resolve(jhAPI.postData('/api_address',{addressId:isEdit.value,userId:localStorage.token,status:'deleteAddress'}))
	}).then(res => {
		if(res.code != 0){
			console.log(res);
			showFailToast('后台繁忙~~~')
			isEdit.value = '';
			editAddredss.value = false;
			return
		}
		userStore.addAddress(msg);
		isEdit.value = '';
		editAddredss.value = false
		return
	})

};
const onDelete = async () => {
	if(!isEdit.value){
		editAddredss.value = false;
		return
	}
	let res = await jhAPI.postData('/api_address',{addressId:isEdit.value,userId:localStorage.token,status:'deleteAddress'})
	if(res.code != 0){
		console.log(res);
		showFailToast('后台繁忙~~~');
		isEdit.value = '';
		editAddredss.value = false;
		return
	}
	showSuccessToast('删除成功')
	userStore.getAddress();
	isEdit.value = '';
	editAddredss.value = false;
};




const willBuyGoods = computed(() => {
	if(!lcStore.nowGoodstId){
		return  userStore.selectedCart
	};
	if(Object.keys(lcStore.goodsOneList)[0]){
		return [lcStore.goodsOneList]
	};
	lcStore.getGoodsOneData()
	return [lcStore.goodsOneList]
})
// console.log(willBuyGoods.value)
const activeNames = ref(['订单详情']);
setTimeout(() => {
	activeNames.value=[]
}, 100);


console.log(willBuyGoods)
const coupon = {
	available: 1,
	condition: '无门槛\n最多优惠12元',
	reason: '',
	value: 150,
	name: '优惠券名称',
	startAt: 1489104000,
	endAt: 1514592000,
	valueDesc: '1.5',
	unitDesc: '元',
};

const coupons = ref([coupon]);
const showList = ref(false);
const chosenCoupon = ref(-1);
const couponsValue = ref(0);

const onChange = (index) => {
	// console.log(index)
	showList.value = false;
	chosenCoupon.value = index;
	couponsValue.value = coupons.value[index].value/100
};
const onExchange = (code) => {
	console.log(code)
	coupons.value.push(coupon);
};


let notes = ref('')
const allPrice = ref(0)
watch(willBuyGoods, (newValue, oldValue) => {
	console.log(newValue);
	if(!newValue[0]){
		return 
	}
	let all = 0;
	newValue.forEach(item => {
		all += item.price * (parseFloat(useRoute().query.goodsNumber) || parseFloat(item.goods_number))
	})
	allPrice.value = all

},
{
	immediate : true,
	// deep : true
})

let payWay = ref('1')

const finalPay = computed(() => {
	if(payWay.value ==2){return 0}
	return allPrice.value*100 - couponsValue.value*100
})

</script>

<style scoped>
#app>div{background-color: #F1F1F1;}

.van-cell-group.address{
	height: 80px;
	.van-cell{
		position: absolute;
		height: 100%;
		/* padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding); */
	}
	.defaultAddress{
		width: 90%;
		height: 100%;
		position: absolute;
		padding: 10px 20px;
		box-sizing: border-box;
		
		>p{
			font-size: 18px;
			display: flex;
			justify-content: space-between;
			margin-bottom: 10px;
		}
		>div{
			font-size: 14px;
		}
	}
}
.address-list{
	margin-top: 10px;
	/* overflow: hidden; */
	overflow-y: scroll;
}
::v-deep .van-address-list__bottom{
		background: none;
	}
.van-collapse{
	margin-top: 20px;
}
.van-cell.van-field{
	margin-top: 10px;
}
.van-index-bar{
	margin-top: 10px;
}
.van-index-anchor{
	font-weight: normal !important;
}
.paygroup{
	>div{
		height: 75px;
	}
	.payway-title{
		line-height: 55px;
	}

}

::v-deep .van-submit-bar__text{
	text-align: left;
}
</style>