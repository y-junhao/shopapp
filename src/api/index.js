// 专门用来数据请求, 只有这个里面才会用axios了
import axios from 'axios'
import Qs from 'qs'
// 设置默认基础路径
axios.defaults.baseURL = 'http://159.75.89.136:3000'

let jhAPI = {
	async getData(url, data = {},accurate='data.data'){ //函数参数的默认值
		//真正做事件,发起ajax请求
		let res = await axios.get(url, {params : data});
		// console.log(res);
		if(res.data.code != 0){
			console.log('get'+url+data+'Data请求错误');
			console.log(res);
			return;
		};
		if(!accurate){
			return res.data.data
		}
		// 把数据返回去 res.data.data; [{}, {}] 是一个promise
		let want = accurate.split('.');
		if(want.length==2){
			return res[want[0]][want[1]]
		}else if(want.length==1){
			return res[want[0]]
		}else if(want.length==3){
			return res[want[0]][want[1]][want[2]]
		}
		
	},

	
	// 登录
	async postData(url, data = {}){ //函数参数的默认值
		let res = await axios.post(url, Qs.stringify(data));
		return res.data;
	},
	

	
};


//选项式全局使用 在main.js中 import 并 use
// export default (app) => {
//   app.config.globalProperties.jhAPI = jhAPI
// };



// 组合式在单个<script setup>中引入使用 （选项式没this）
export {jhAPI}