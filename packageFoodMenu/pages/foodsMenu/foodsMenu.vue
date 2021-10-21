<template>
	<view class="foodsMenu">
		<view class="title">
			<span class="title-text-1">美</span>
			<span class="title-text-2">食</span>
			<span class="title-text-3">美</span>
			<span class="title-text-4">刻</span>
		</view>
		<view class="search">
			<van-search :value="searchVal " shape="round" placeholder="今天想吃点什么" placeholder-style="text-algin:center;"/>
		</view>
		<view class="tabs" v-if="!loading">
			<van-grid>
			  <van-grid-item
			   icon-prefix="iconfont" 
			   icon="pinzhong"
			   :text="item.name" 
			   v-for="(item,index) in foodsMenuTabList"
			   :key="item.classId"/>
			</van-grid>
		</view>
	</view>
</template>

<script>
	import {
		getFoodsMenuList,
		getFoodsByClass
	} from '../../../config/url.js'
	export default {
		name: "foodsMenu",
		data() {
			return {
				searchVal: '',
				foodsMenuTabList: [],
				loading: true
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
					 
					this.getRandomTabs(res.result)
				}
			},
			// 随机获取一些分类
			getRandomTabs(list) {
				const menuTablist = [];
				const menuList = list.concat([])
				for (let i = 0; i<5; i++) {
					const randomNum = Math.floor(Math.random() * menuList.length);
					list.push(menuTablist[randomNum])
					menuList.splice(randomNum,1)
				}
				this.foodsMenuTabList=menuTablist
				this.loading=false
			}
		},

	}
</script>

<style lang="less" scoped>
	@titleColors: #7EB5A6, #C36839, #FDA65D, #E8D0B3;
	@len: length(@titleColors);

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

	.foodsMenu {
		.title {
			height: 80px;
			display: flex;
			justify-content: center;
			align-items: center;
			.textColor(@len)
		}
		.search {
			width:85%;
			height: 60px;
			margin: 0 auto;
			
			/deep/.van-search__content  {
				background-color: #fff;
				box-shadow: rgba(0,0,0,.5) 0px 0px 15px;
			}
		}
		.tabs {
			width: 855;
			height: 120px;
		}
	}
</style>
