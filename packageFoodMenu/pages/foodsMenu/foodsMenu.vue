<template>
	<view class="foodsMenu">
		<view class="search">
			<van-search
			  :value="searchVal "
			  shape="round"
			  background="#4fc08d"
			  placeholder="请输入搜索关键词"
			/>
		</view>
	</view>
</template>

<script>
	import {getFoodsMenuList} from '../../../config/url.js'
	export default {
		name:"foodsMenu",
		data() {
			return {
				searchVal:''
			};
		},
		created() {
			this.init()
		},
		methods:{
			async init() {
					const res = await this.$http(
					getFoodsMenuList,
					'GET',
					{key:this.$apiKey.proginApiKey});				
			}
		}
	}
</script>

<style>
</style>
