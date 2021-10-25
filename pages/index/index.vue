<template>
	<view class="content">
		<view class="main">
			<view class="header" v-if="loading">
				<view class="left-location">
					<i class="icon-locaiton">
						<van-icon name="location-o" />
					</i>
					<span class="content">
						{{locationData.ad_info.district}}
					</span>
				</view>
				<view class="center-clock">
					<Clock></Clock>
				</view>
				<view class="right-name">
				你好呀,{{userInfo.nickName}}
				</view>
			</view>
			<view class="weather">
				<weather-card :locationData="locationData" v-if="Object.keys(locationData).length > 0"></weather-card>
			</view>
			<view class="box">
				<grid-box></grid-box>
			</view>
		</view>
		<van-toast id="van-toast" />
		<van-notify id="van-notify" />
	</view>
</template>

<script>
	import clock from '@/components/clock.vue'
	import weatherCard from '@/components/weatherCard.vue'
	import gridBox from '@/components/gridBox.vue'
	import {getLocation} from '../../config/url.js'
	export default {
		data() {
			return {
				title: 'Hello',
				loading:false,
				locationData:{},
				userInfo:{}
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			 async init() {
				 const that = this
				 await uni.getSetting({
				 	success: (res) => {
				 		that.getLocation()
						that.getUserInfo()
						
				 	}
				 })
			},
			 getLocation() {
				const that = this;
				uni.getLocation({
					type:'wgs84',
					success: async (res)=> {
						const {latitude,longitude} = res;
						const {data:subRes} = await that.$http(getLocation,'GET',{location:`${latitude},${longitude}`,key:that.$apiKey.txMapApiKey});
						that.locationData = subRes.result;
						const city = subRes.result.ad_info.city
						that.city = city
						await that.$storage.setData('city',city);
					}
				})
			},
			 getUserInfo() {
				 const that = this;
				uni.getUserInfo({
					provider: uni.getProvider({service:'oauth'}),
					success: res => {
						const {userInfo} = res;
						that.userInfo = userInfo;
						that.loading = true
					}
				})
			}
		},
		components:{
			clock,
			weatherCard,
			gridBox,
		}
	}
</script>

<style lang="less" scoped>
	.content {
		.main {
			.header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 50px;
				padding:10px;
				box-sizing: border-box;
				font-size: 12px;
				color:#4F4F2F;
				background-color: rgba(82,139,139,.5);
				.left-location {
					display: flex;
					align-items: center;
					
				}
				
			}
			.box {
				margin-top: 40px;
			}
		}
	}
</style>
