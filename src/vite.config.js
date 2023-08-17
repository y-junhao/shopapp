import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 引入vant 按需求引入样式的插件
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		vue(),
		// 调用 vant 按需求引入样式
		Components({
      resolvers: [VantResolver()],
    }),
	],
	
	// 设置服务
	server : {
		host : '127.0.0.1',
		port : 8888,
		open : true
	},
	
	// 配置打包路径
	base : './'
	
	
})
