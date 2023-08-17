import { ref, computed,watch,reactive } from 'vue'
import { defineStore } from 'pinia'
import {jhAPI} from '../api'
import { useRoute } from 'vue-router'
import { showFailToast, showSuccessToast } from 'vant'
export const useLcStore = defineStore('lc', () => {
  const route = reactive(useRoute())
  const nowCatId = ref(route.query.catId)
  const nowGoodstId = ref(route.query.goodsId)
  watch(route, (newValue, oldValue) => {
    nowCatId.value = newValue.query.catId || '';
    nowGoodstId.value = newValue.query.goodsId || ''
  })
  const banner1List = ref([])
  const getBanner1Data = async () => {
    let res = await jhAPI.getData('/api_banner', {bannerId : 1})
    banner1List.value = res
  }

  const catList = ref([])
  const getCatData = async () => {
    let res = await jhAPI.getData('/api_cat')
    catList.value = res
  }
  const HomeViewCatList = computed(() => {
    // return [{cat_name : '首页'}, ...catList.value]
    return [{cat_id : '0000', cat_name : '首页'}, ...catList.value]
  })

  // 首页homeIndex重组数据
  const recombineHomeIndexList = ref([])
  const getRecombineHomeIndexData = () => {
    // 先获取获取原始大分类  再遍历并发这个大分类请求数据, 组装
    // 遍历数组

    if(recombineHomeIndexList.value[0]){return}
    catList.value.forEach(async (item) => {
      let goods = await jhAPI.getData('/api_goods', { catId :item.cat_id, pagesize : 2, page : parseInt(Math.random() * 20 + 3)});
      // console.log('goods', goods);
      recombineHomeIndexList.value.push({
        cat_name : item.cat_name,
        cat_id : item.cat_id,
        data : goods
      })
    });
  }
 
  const classifyList = ref([])
  const getClassifyData = async () => {
    if(classifyList.value[0]){return}
    let res = await jhAPI.getData('/api_classify');		
    classifyList.value = res;
    
  }


  // 首页otherIndex重组数据
  const recombineOtherIndexList = ref([])
  const classifyOne = computed(() => {
    return classifyList.value.find(item => {
      return item.cat_id == nowCatId.value;
    })
  })
  const getRecombineOtherIndexData = async () => {
    if(!nowCatId.value || nowCatId.value == '0000'){return}
    let catData = await jhAPI.getData('/api_goods', {catId : nowCatId.value, pagesize : 88});
    // console.log(catData,classifyOne.value)
    recombineOtherIndexList.value = [];
    classifyOne.value.data.forEach((item) => {
      recombineOtherIndexList.value.push({
        cat_name : classifyOne.value.title,
        cat_detial : item.product_content,
        data : catData.splice(0, 2),
        cat_id : classifyOne.value.cat_id
      });
    });	
  }

  
  const getRecombineClassifyView = computed(() => {
    let result = classifyList.value.filter(item => {
      return item.cat_id == nowCatId.value;
    });
    // console.log(result)
    return result[0] || {};
  })  
  const SClassifyViewClassifyList = computed(() => {
    let result = classifyList.value.find(item => {
      // console.log(item)
      return item.cat_id == nowCatId.value
    });
    return result.data
  })
  const searchList = ref([]);

  const getSearchData = async (keywords) =>{
    console.log(route.query.catDetial)
    let res = await jhAPI.getData('/api_search', {keywords});
    searchList.value = res;
  }

  const goodsOneList = ref([]);
  const getGoodsOneData = async () => {
    // if(!nowGoodstId.value){
    //   showFailToast('商品已下架')
    //   console.log('goodsId为空');
    //   return
    // };
    let res = await jhAPI.getData('/api_goods', {goodsId : route.query.goodsId});
    console.log(res)
    res[0].banner.forEach((item, index, arr) => {
      // console.log(item.replace("url('", '').replace("')", ''))
      arr[index] = item.replace("url('", '').replace("')", '');
    });
    goodsOneList.value = res[0]
    // console.log(this.goodsOneList);
  }


  return { nowCatId,nowGoodstId,banner1List,getBanner1Data,catList,getCatData,HomeViewCatList,recombineHomeIndexList,getRecombineHomeIndexData,classifyList,getClassifyData,recombineOtherIndexList,getRecombineOtherIndexData,getRecombineClassifyView,SClassifyViewClassifyList,searchList,getSearchData,goodsOneList,getGoodsOneData}
})

export const useUserStore = defineStore('user', () => {
  let storage = reactive(window.localStorage)
	let TOKEN = ref();
	let USERNAME = ref();

  let cartNumber = ref('');
  let cartList = ref([]);
  let isLogin = ref(false);
  let getCartNumberData = async () => {
    let res = await jhAPI.postData('/api_cart', {
      status : 'viewcart',
      userId : TOKEN.value
    });
    // 验证
    if(res.code != 0){
      console.log(res);
      cartNumber.value = ''
      return;
    };
    // console.log(res)
    
    cartList.value = res.data;
    cartList.value.forEach(item => {
      item.isChecked = true;
    });
    cartNumber.value = res.data.length;
  }

  watch(TOKEN,() => {
    if(!TOKEN.value){
      isLogin.value = false;
      cartNumber.value = '';
      cartList.value = [];
      return
    }
    isLogin.value = true;
    getCartNumberData()

  })

  const priceAll = computed(() => {
    let all = 0;
    cartList.value.forEach(item => {
      if(item.isChecked){
        all += item.goods_number * item.price;
      };
    });
    return all;
  })

  const selectedCart = computed(() => {
    return cartList.value.filter(item => {
      return item.isChecked
    })
  })

  const addressList = ref([]);
  const defaultAddress = ref({});
  const getAddress = async () => {
    let res = await jhAPI.postData('/api_address',{userId:localStorage.token,status:'getAddress'});
    if(res.code !=0 ){
      console.log(res);
      showFailToast('收货地址信息获取失败')
      return
    };
    if(res.data.length != 0 && !res.data.some(item => item.isDefault)){
      Setdefault(res.data[0].address_id);
      return
    }
    addressList.value = res.data;
    addressList.value.forEach((item,index) => {
        item.id = index +1;
        item.name = item.takename;
        item.address = `${item.province}  ${item.city}  ${item.district}  ${item.streetname}`
    });

    defaultAddress.value = addressList.value.find(item => {
      return item.isDefault
    })
  };
  const Setdefault = async (addressId) => {
    let res = await jhAPI.postData('/api_address',{addressId,userId:localStorage.token,status:'defaultAddress'})
    if(res.code != 0){
      console.log(res);
      showFailToast('后台繁忙~~~')
      return
    }
    getAddress()
  }
  const addAddress = async (msg) =>{
    let res = await jhAPI.postData('/api_address',{
      'status':'addAddress',
      'userId':localStorage.token,
      province:msg.province,
      city:msg.city,
      district:msg.county,
      takename:msg.name,
      streetname:msg.addressDetail,
      tel:msg.tel,
      isDefault : msg.isDefault
    });
    if(res.code !=0 ){
      console.log(res);
      showFailToast('后台繁忙~~~')
      return
    };
    getAddress()
      
  }

  const fromRoute = ref()
  return { addAddress,defaultAddress,Setdefault,getAddress,addressList,storage,TOKEN,USERNAME,isLogin,cartNumber,cartList,priceAll,selectedCart,getCartNumberData,fromRoute}
})
