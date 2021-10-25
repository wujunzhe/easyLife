<template>
	<view class="list-grid">
		<van-grid column-num="2" :border="false">
		  <van-grid-item custom-class="list-grid-item"  v-for="item in gridList" :key="item.id" use-slot @click="goInfo(item)">
			      <image
			        style="width: 100%; height: 90px;"
			        :src="item.pic"
			      />
				  <span class="name">
					  {{item.name}}
				  </span>
		  </van-grid-item>
		</van-grid>
	</view>
</template>

<script>
	export default {
		name: "listGrid",
		props:['listData'],
		data() {
			return {
				gridList:[]
			};
		},

		created() {
			this.init()
		},
		methods: {
			init() {
				this.gridList = this.listData.list
			},
			goInfo(foodsInfo) {
				const info = JSON.stringify(foodsInfo)
				const url = `/packageFoodMenu/pages/foodsInfo/foodsInfo?info=${info}`
				uni.navigateTo({
					url,
					fail: (err) => {
						console.error(err);
					}
				})
			}
		},
	}
</script>

<style lang="less" scoped>
.list-grid {
	margin-top: 25px;
	.list-grid-item {
		.name {
			width: 100%;
			margin-top: 5px;
			font-size: 14px;
			font-weight: 500;
			color:#666;
			text-align: left;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
	}
}
</style>
