<template>
	<view class="grid-box">
		<van-grid clickable column-num="2" custom-class="main">
		  <van-grid-item 
		  v-for="(item,index) in gridData" 
		  :key="index" 
		  :icon="item.icon" 
		  :text="item.text" 
		  content-class="item"
		  @click="gridClick(item)"
		  />
		</van-grid>
	</view>
	
</template>

<script>
	import Toast from '../wxcomponents/vant/toast/toast.js'
	export default {
		name:"gridBox",
		data() {
			return {
				gridData:[
					{
						icon:'fire',
						linkType:'navigateTo',
						url:'/packageFoodMenu/pages/foodsMenu/foodsMenu',
						text:'每日食谱',
						useAble:true
					},
					{
						icon:'replay',
						linkType:'navigateTo',
						url:'/pages/dashboard/index',
						text:'功能待开发',
						useAble:false
					},
					{
						icon:'replay',
						linkType:'navigateTo',
						url:'/pages/dashboard/index',
						text:'功能待开发',
						useAble:false
					},
					{
						icon:'replay',
						linkType:'navigateTo',
						url:'/pages/dashboard/index',
						text:'功能待开发',
						useAble:false
					}
				]
			};
		},
		methods:{
			gridClick(item) {
				if(!item.useAble) {
					Toast.fail('该功能未开通')
				}else {
					uni.navigateTo({
						url:item.url,
						fail:(msg)=>{
							Toast.fail(msg.errMsg)
						}
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.grid-box {
		width: 90vw;
		height: 370rpx;
		margin: 0 auto;
		
		.main {
			border:1px solid #C1CDC1;
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			border-radius: 10px;
			/deep/ .item{
				background-image: linear-gradient(120deg , rgba(11,165,207,.6) 0%, rgba(210,105,30,.5) 100%);
			}
		}
	}

</style>
