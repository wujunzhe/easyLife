<template>
	<view class="type-list" v-if="!isLoading">
		<view class="type-item" v-for="item in typeList" :key="item.classid" @click="getInfo(item.classid)">{{item.name}}</view>
	</view>
</template>

<script>
	import {
		getFoodsByClass
	} from '../../../config/url.js'
	export default {
		data() {
			return {
				typeList: [],
				isLoading: true
			};
		},
		onLoad(option) {
			this.init(option);
		},
		methods: {
			init(option) {
				const list = JSON.parse(option.list);
				this.typeList = list;
				this.isLoading = false;
			},
			 getInfo(id) {
				 id = JSON.stringify(id)
				const url = `/packageFoodMenu/pages/foodsList/foodsList?classid=${id}`;
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

<style lang="less">
	.type-list {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 5px;
		grid-auto-flow: row dense;
		grid-auto-rows: 20px;
		padding:10px;
		box-sizing: border-box;

		.type-item {
			background-image: linear-gradient(120deg , rgba(11,165,207,.6) 0%, rgba(210,105,30,.5) 100%);
			width: 100%;
			color: #5959AB;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.type-item:nth-of-type(3n+1) {
			grid-row: auto /span 5;
		}

		.type-item:nth-of-type(3n+2) {
			grid-row: auto /span 6;
		}

		.type-item:nth-of-type(3n+3) {
			grid-row: auto /span 8;
		}
	}
</style>
