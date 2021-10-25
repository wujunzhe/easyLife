<template>
	<view class="foods-info">
		<view class="foods-img">
			<image :src="foodsInfo.pic"></image>
		</view>
		<view class="main">
			<view class="foods-name">
				{{foodsInfo.name}}
			</view>
			<view class="foods-tags">
				<van-tag custom-class="tag" v-for="(item,index) in foodsInfo.tag" :key="index" round type="warning">
					{{item}}
				</van-tag>
			</view>
			<van-divider />
			<view class="foods-desc" v-html="foodsInfo.content">
			</view>
			<van-divider />
			<view class="foods-other-info">
				<view class="info">
					<view class="title">
						建议用餐人数:
					</view>
					<view class="content">
						{{foodsInfo.peoplenum}}
					</view>
				</view>
				<view class="info">
					<view class="title">
						备餐时间:
					</view>
					<view class="content">
						{{foodsInfo.preparetime}}
					</view>
				</view>
				<view class="info">
					<view class="title">
						烹饪时间:
					</view>
					<view class="content">
						{{foodsInfo.cookingtime}}
					</view>
				</view>
			</view>
			<van-divider />
			<view class="foods-use">
				<view class="title">
					主料
				</view>
				<view class="content">
					<van-cell-group>
						<van-cell :title="item.mname" :value="item.amount"
							v-for="(item,index) in foodsInfo.mainMaterial" :key="index" />
					</van-cell-group>
				</view>
				<view class="title">
					辅料
				</view>
				<view class="content">
					<van-cell-group>
						<van-cell :title="item.mname" :value="item.amount" v-for="(item,index) in foodsInfo.subMaterial"
							:key="index" />
					</van-cell-group>
				</view>
			</view>
			<van-divider />
			<view class="foods-process">
				<view class="title">
					具体步骤
				</view>
				<view class="process" v-for="(item,index) in foodsInfo.process" :key="index">
					<view class="text">
						{{item.pcontent}}
					</view>
					<view class="img">
						<image :src="item.pic"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				foodsInfo: {}
			}
		},
		onLoad(option) {
			this.init(option.info)
		},
		methods: {
			init(info) {
				const foodsInfo = JSON.parse(info);
				foodsInfo.tag = foodsInfo.tag.split(',');
				foodsInfo.mainMaterial = foodsInfo.material.filter(mat => mat.type === 1);
				foodsInfo.subMaterial = foodsInfo.material.filter(mat => mat.type === 0);
				this.foodsInfo = foodsInfo;
			}
		}
	}
</script>

<style lang="less" scoped>
	.foods-info {
		width: 100vw;

		.foods-img {
			width: 100%;
			height: 200px;

			image {
				width: 100%;
				height: 100%;
				image-rendering: -moz-crisp-edges;
				/* Firefox */
				image-rendering: -o-crisp-edges;
				/* Opera */
				image-rendering: -webkit-optimize-contrast;
				/*Webkit (non-standard naming) */
				image-rendering: crisp-edges;
				-ms-interpolation-mode: nearest-neighbor;
				/* IE (non-standard property) */
			}
		}

		.main {
			padding: 0 10px;

			.foods-name {
				width: 100%;
				height: 40px;
				line-height: 40px;
				text-align: center;
				font-size: 20px;
				color: #45526C;
			}

			.foods-tags {
				/deep/ .van-tag {
					margin: 0 1px;
				}
			}

			.foods-desc {
				font-size: 14px;
				color: #808080;
				letter-spacing: 1px;
			}

			.foods-other-info {
				width: 100%;
				margin-top: 30px;

				.info {
					display: flex;
					font-size: 14px;
					margin-bottom: 10px;

					.title {
						font-weight: 600;
						color: #555555;
					}

					.content {
						margin-left: 15px;
						color: #3F536E;
					}
				}
			}

			.foods-use {
				.title {
					width: 40px;
					height: 20px;
					line-height: 20px;
					text-align: left;
					font-weight: 600;
					color: #555555;
					margin-top: 20px;
				}

				.content {
					margin-top: 15px;
				}
			}

			.foods-process {
				margin-bottom: 80px;

				.title {
					width: 100px;
					height: 20px;
					line-height: 20px;
					text-align: left;
					font-weight: 600;
					color: #555555;
					margin-top: 20px;
				}

				.process {
					font-size: 14px;
					color: #3F536E;
					margin-top: 10px;

					.img {
						margin: 15px 0;
						width: 100%;
						height: 200px;

						image {
							width: 100%;
							height: 100%;
							image-rendering: -moz-crisp-edges;
							/* Firefox */
							image-rendering: -o-crisp-edges;
							/* Opera */
							image-rendering: -webkit-optimize-contrast;
							/*Webkit (non-standard naming) */
							image-rendering: crisp-edges;
							-ms-interpolation-mode: nearest-neighbor;
							/* IE (non-standard property) */
						}
					}
				}


			}
		}

	}
</style>
