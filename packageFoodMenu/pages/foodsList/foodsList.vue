<template>
	<view class="foods-list">
		<view class="content">
			<card-list @noDataInfo="noData" :listData="menuListData.data" :classid="classid" :isBottom="isBottom" v-if="loading"></card-list>
			<view class="noData" v-if="showNoData">已经到底了...</view>
		</view>
	</view>
</template>

<script>
	import cardList from '../../components/cardList.vue'
	export default {
		data() {
			return {
				menuListData: {
					data: []
				},
				classid: '',
				loading: false,
				isReachBottom:false,
				isBottom:0,
				showNoData:false
			};
		},
		onLoad(option) {
			this.init(option)
		},
		onReachBottom(){
			if(options.classid) {
				this.isBottom++
			}
		},
		methods: {
			init(option) {
				try {
					this.menuListData.data = option.list ? JSON.parse(option.list) : [];
					this.classid = option.classid ? JSON.parse(option.classid): ''
					this.loading = true
				} catch (e) {
					//TODO handle the exception
					console.error(e)
				}
			},
			noData(status) {
				if(status==='205') {
					this.showNoData = true;
					this.isBottom = 0;
				}
			}
		},
		components: {
			cardList
		}
	}
</script>

<style lang="less">
	.foods-list {
		width: 100vw;
		height: 100vh;

		.content {
			width: 100%;
		}
		.noData {
			margin-top: 10px;
			text-align: center;
			color:#808080;
			font-style: italic;
		}
	}
</style>
