<template>
	<view class="card-list" v-if="!isLoading">
		<van-card :title="item.name" :thumb="item.pic" v-for="item in list" :key="item.id" custom-class="item" @click.native="goInfo(item)">
			<view slot="desc" class="desc-item" v-html="item.content">
			</view>
		</van-card>
	</view>
</template>

<script>
	import {
		getFoodsByClass,
	} from '../../config/url.js'
	export default {
		props: ['listData','classid','isBottom'],
		data() {
			return {
				list: [],
				start:0,
				isLoading:true
			}
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				if(this.listData.list) {
					this.list = this.listData.list
					this.isLoading = false
				}else if(this.classid !== '') {
					this.getList()
				}
			},
			async getList() {
				const {
					data: res
				} = await this.$http(
					getFoodsByClass,
					'GET', {
						key: this.$apiKey.proginApiKey,
						classid: this.classid,
						start: this.start,
						num: 20
					});
				if (res.status === 0) {
					this.list =this.list.concat(res.result.list);
					if(this.start > res.total) {
						this.isBottom = 0;
					}
					this.isLoading = false
				}else if(res.status === "205") {
					this.$emit('noDataInfo',res.status)
				}
			},
			goInfo(info) {
				info = JSON.stringify(info)
				const url = `/packageFoodMenu/pages/foodsInfo/foodsInfo?info=${info}`
				uni.navigateTo({
					url,
					fail: (err) => {
						console.error(err);
					}
				})
			}
		},
		watch:{
			isBottom(newVal,oldVal) {
					if(newVal > 0) {
						this.start += 20;
						this.getList()
					}
				}
		}
	}
</script>

<style lang="less" scoped>
	.card-list {
		width: 100vw;

		/deep/ .item {
			margin: 10px;
			background-color: #fafafa;

			.desc-item {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				margin-top: 10px;
				color: #999999;
			}
		}
	}
</style>
