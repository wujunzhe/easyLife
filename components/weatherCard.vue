<template>
	<view class="weather-card">
		<view class="base-info">
			<view class="date-info" v-if="Object.keys(dateInfo).length > 0">
				<view class="date">15</view>
				<view class="month-week">
					<span class="month">{{dateInfo.month}}</span>
					<span class="week">{{dateInfo.day}}</span>
				</view>
			</view>
			<view class="weather-info">
				<view class="info-item">
					<view class="title">
						今日天气
					</view>
					<view class="weather-content">
						<view class="weather-content-top">
							{{`${weatherF1.day_air_temperature} &#8451 / ${weatherF1.night_air_temperature}  &#8451`}}
						</view>
						<view class="weather-content-bottom">
							<span class="img">
								<img :src="weatherNow.weather_pic" alt="">
							</span>
							<span class="weather">
								{{weatherNow.weather}}
							</span>
						</view>
					</view>
				</view>
				<view class="info-item">
					<view class="title">
						明日天气
					</view>
					<view class="weather-content">
						<view class="weather-content-top">
							{{`${weatherF2.day_air_temperature} &#8451 / ${weatherF2.night_air_temperature}  &#8451`}}
						</view>
						<view class="weather-content-bottom">
							<span class="img">
								<img :src="weatherF2.day_weather_pic" alt="">
							</span>
							<span class="weather">
								{{weatherF2.day_weather}}
							</span>
						</view>
					</view>
				</view>
			</view>

		</view>
		<view class="other-info">
			<view class="zwx">
				紫外线:{{weatherF1.ziwaixian}}
			</view>
			<view class="rainProbability">
				降雨率:{{weatherF1.jiangshui}}
			</view>
			<view class="wind">
				{{weatherNow.wind_direction}}{{weatherNow.wind_power}}
			</view>
		</view>
		<view class="weather-swiper">
			<swiper class="swiper" autoplay circular>
				<swiper-item v-for="(item,index) in weatherF1.index" :key="index" class="swiper-item">
					<span class="desc">
						{{item.desc}}
					</span>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
		getWeather,
		getWeatherV2
	} from '../config/url.js'
	import {
		getDateInfo
	} from '../utils/toolFunc.js'
	export default {
		name: "weatherCard",
		props: ['locationData'],
		data() {
			return {
				weatherNow: {},
				weatherF1: {},
				weatherF2: {},
				dateInfo: {}
			};
		},
		created() {
			// this.init()
		},
		methods: {
			// async init() {
			// 	this.dateInfo = getDateInfo();
			// 	const {
			// 		ad_info: addInfo
			// 	} = this.locationData;
			// 	const {
			// 		location
			// 	} = addInfo
			// 	const {
			// 		data: res
			// 	} = await this.$http(
			// 		getWeatherV2,
			// 		'GET', {
			// 			apiKey: this.$apiKey.apishopKey,
			// 			from: '1',
			// 			lat: location.lat,
			// 			lng: location.lng,
			// 			needAlarm: 1,
			// 			needIndex: 1
			// 		})
			// 	if (res.statusCode === "000000") {
			// 		this.weatherNow = res.result.now;
			// 		this.weatherF1 = res.result.f1;
			// 		this.weatherF2 = res.result.f2;
			// 	}
			// }
		}
	}
</script>

<style lang="less" scoped>
	.weather-card {
		width: 90vw;
		height: 305rpx;
		margin: 10px auto;
		border-radius: 20rpx;
		background-color: #C1CDC1;
		box-sizing: border-box;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

		/deep/.base-info {
			display: flex;
			width: 100%;
			height: 60%;

			.date-info {
				width: 30%;
				height: 100%;
				border-right: 1px solid #eee;
				text-align: center;

				.date {
					height: 60%;
					font-size: 40px;
					font-weight: 700;
					color: #363636;
				}

				.month-week {
					height: 40%;
					color: #2C405A;
					font-style: italic;

					.month {
						margin-right: 5px;
					}
				}

			}

			.weather-info {
				display: flex;
				justify-content: space-around;
				width: 70%;
				font-size: 12px;

				.info-item {
					.title {
						height: 20%;
						color: #f7f7f7;
						text-align: center;
					}

					.weather-content {
						height: 80%;
						display: flex;
						flex-direction: column;
						justify-content: space-evenly;

						.weather-content-top {
							font-size: 16px;
							color: #4A766E;
							font-weight: 700;

						}

						.weather-content-bottom {
							font-size: 20px;
							color: #7093DB;
							text-align: center;

							.img {
								width: 20px;
								height: 20px;

								img {
									width: 20px;
									height: 20px;
								}
							}
						}
					}
				}

			}
		}

		.other-info {
			width: 100%;
			height: 20%;
			background-color: #C1CDC1;
			color: #5959AB;
			display: flex;
			justify-content: space-around;
			align-items: center;
			padding: 0 5px;
			box-sizing: border-box;
			border-top: 1px solid #fff;

			.zwx,
			.rainProbability,
			.wind {
				font-size: 12px;
			}
		}

		.weather-swiper {
			width: 100%;
			height: 20%;
			background-color: rgba(0, 0, 0, .5);
			border-radius: 0 0 20rpx 20rpx;

			.swiper {
				width: 80%;
				height: 100%;
				line-height: calc(100% * 2);
				margin :0 auto;
				.swiper-item {
					font-size: 12px;
					color: #363636;
					
					.desc {
						overflow: hidden;
						white-space: nowrap;
						text-overflow:ellipsis;
						color:#f2f2f7;
					}

				}
			}

		}
	}
</style>
