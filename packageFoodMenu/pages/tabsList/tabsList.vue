<template>
	<view class="tabs-list" v-if="!isLoading">
		<view class="tabs-item" v-for="item in tabsList" :key="item.classid" @click="goTypeList(item.list)">{{item.name}}</view>
	</view>
</template>

<script>
	import {
		getFoodsByClass
	} from '../../../config/url.js'
	export default {
		data() {
			return {
				tabsList: [],
				isLoading: true
			};
		},
		onLoad(option) {
			this.init(option);
		},
		methods: {
			init(option) {
				const list = JSON.parse(option.list);
				this.tabsList = list;
				this.isLoading = false;
			},
			 goTypeList(list) {
				 list = JSON.stringify(list)
				const url = `/packageFoodMenu/pages/typesList/typeList?list=${list}`;
				uni.navigateTo({
					url,
					fail: (err) => {
						console.error(err)
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.tabs-list {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 5px;
		grid-auto-flow: row dense;
		grid-auto-rows: 20px;
		padding:10px;
		box-sizing: border-box;

		.tabs-item {
			background-image: linear-gradient(120deg , rgba(11,165,207,.6) 0%, rgba(210,105,30,.5) 100%);
			width: 100%;
			color: #5959AB;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.tabs-item:nth-of-type(3n+1) {
			grid-row: auto /span 5;
		}

		.tabs-item:nth-of-type(3n+2) {
			grid-row: auto /span 6;
		}

		.tabs-item:nth-of-type(3n+3) {
			grid-row: auto /span 8;
		}
	}
</style>
