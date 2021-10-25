<template>
	<view class="foodsMenu">
		<view class="title">
			<span class="title-text-1">美</span>
			<span class="title-text-2">食</span>
			<span class="title-text-3">美</span>
			<span class="title-text-4">刻</span>
		</view>
		<view class="search">
			<van-search :value="searchVal " shape="round" placeholder="今天想吃点什么" placeholder-style="text-algin:center;"
				@search="foodsSearch" />
		</view>
		<view class="contents" v-if="!isLoading">
			<view class="tabs">
				<view class="tabs-item" v-for="(item,index) in foodsMenuTabList" :key="item.classid" @click="goTypeList(item.list)">
					<view :class="'icon-'+index">
						<i class="iconfont" :class="item.icon"></i>
					</view>
					<view class="content">
						{{item.name}}
					</view>
				</view>
				<view class="tabs-item" @click="goTabsList(tabsList)">
					<view class="icon more">
						<i class="iconfont">&#xe628;</i>
					</view>
					<view class="content">
						更多
					</view>
				</view>
			</view>
			<view class="list">
				<view class="title">
					今日推荐
				</view>
				<view class="content">
					<list-grid :listData="menuListData.data"></list-grid>
				</view>
			</view>
		</view>
		<van-loading type="spinner" color="#1989fa" v-if="isLoading">加载中，请稍后.....</van-loading>
	</view>
</template>

<script>
	import {
		getFoodsMenuList,
		getFoodsByClass,
		foodsSearch
	} from '../../../config/url.js'
	import {
		foodMenuTabsEnum
	} from '../../config/enum.js'
	import listGrid from '../../components/listGrid.vue'
	export default {
		name: "foodsMenu",
		data() {
			return {
				searchVal: '',
				tabsList:[],
				// tab按钮数据列表
				foodsMenuTabList: [],
				isLoading: true,
				// 首页推荐数据列表
				menuListData: {
					name: '',
					data: []
				}
			};
		},
		created() {
			this.init()
		},
		methods: {
			async init() {
				const {
					data: res
				} = await this.$http(
					getFoodsMenuList,
					'GET', {
						key: this.$apiKey.proginApiKey
					});
				if (res.status === 0) {
					this.tabsList = res.result
					await this.getRandomTabs(res.result)
					await this.getRandomFoodsList(res.result)
				}
			},
			// 随机获取一些分类
			getRandomTabs(list) {
				const menuTablist = [];
				const menuList = list.concat([])
				for (let i = 0; i < 4; i++) {
					const randomNum = Math.floor(Math.random() * menuList.length);
					menuTablist.push(menuList[randomNum])
					menuTablist[i].icon = foodMenuTabsEnum[i].icon
					menuList.splice(randomNum, 1)
				}
				this.foodsMenuTabList = menuTablist
			},
			/**
			desc:获取随机菜谱列表
			@params list:菜谱分类列表
			*/
			async getRandomFoodsList(list) {
				const randomNum = Math.floor(Math.random() * list.length);
				const {
					data: res
				} = await this.$http(
					getFoodsByClass,
					'GET', {
						key: this.$apiKey.proginApiKey,
						classid: list[randomNum].classid,
						start: 10,
						num: 30
					})
				if (res.status === 0) {
					this.menuListData.name = list[randomNum].name;
					this.menuListData.data = res.result;
					this.isLoading = false
				} else if (res.status === "205") {
					this.getRandomFoodsList(list)
				}
			},
			async foodsSearch(searchDetail) {
				const {
					detail: foodsName
				} = searchDetail;
				const {
					data: res
				} = await this.$http(
					foodsSearch,
					"GET", {
						key: this.$apiKey.proginApiKey,
						keyword: foodsName,
						start:0
					});
					if(res.status === 0) {
						const list = JSON.stringify(res.result)
						const url = `/packageFoodMenu/pages/foodsList/foodsList?list=${list}`
						uni.navigateTo({
							url,
							fail: (err) => {
								console.error(err)
							}
						})
					}
			},
			goTypeList(list) {
				list = JSON.stringify(list)
				const url = `/packageFoodMenu/pages/typesList/typeList?list=${list}`
				uni.navigateTo({
					url,
					fail: (err) => {
						console.error(err)
					}
				})
			},
			goTabsList(list) {
				list = JSON.stringify(list)
				const url = `/packageFoodMenu/pages/tabsList/tabsList?list=${list}`
				uni.navigateTo({
					url,
					fail: (err) => {
						console.error(err)
					}
				})
			}
		},
		components: {
			listGrid
		}
	}
</script>

<style lang="less" scoped>
	@titleColors: #7EB5A6, #C36839, #FDA65D, #E8D0B3;
	@iconColors: #EBA83A, #BB371A, #DE8971, #A7D0CD;
	@titleColorslen: length(@titleColors);
	@iconColorsLen: length(@iconColors);

	.textColor(@n, @i: 1) when (@i =< @n) {
		.title-text-@{i} {
			font-family: cursive;
			font-size: 36px;
			font-weight: 700;
			font-style: italic;
			margin: 0 10px;
			text-shadow: extract(@titleColors, @i) 1px 0 10px;
			color: extract(@titleColors, @i);
		}

		.textColor(@n, (@i + 1));
	}

	.iconColor(@n, @i: 0) when (@i < @n) {
		.icon-@{i} {
			i {
				color: extract(@iconColors, @i+1);
				font-size: 24px;
			}
		}

		.iconColor(@n, (@i + 1));
	}

	.foodsMenu {
		.title {
			height: 80px;
			display: flex;
			justify-content: center;
			align-items: center;
			.textColor(@titleColorslen)
		}

		.search {
			width: 85%;
			height: 60px;
			margin: 0 auto;

			/deep/.van-search__content {
				background-color: #fff;
				box-shadow: rgba(0, 0, 0, .5) 0px 0px 15px;
			}
		}

		.tabs {
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-around;
			margin: 20px auto;

			.tabs-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 80px;
				height: 80px;
				.iconColor(@iconColorsLen);

				.more {
					i {
						font-size: 24px;
						color: #3F536E;
					}
				}

				.content {
					font-size: 12px;
					color: #999;
					margin-top: 5px;
				}
			}
		}

		.list {
			width: 85%;
			margin: 5px auto;

			.title {
				width: 100%;
				height: 25px;
				line-height: 25px;
				background-color: #7EB5A6;
				border-radius: 20px;
				text-align: center;
				font-size: 20px;
				font-weight: 600;
				font-family: cursive;
				letter-spacing: 5px;
				color: #FAF3F3;
			}
		}
	}

	/deep/.van-loading {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
