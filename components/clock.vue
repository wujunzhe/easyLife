<template>
	<view class="clock">
		<view>{{time}}</view>
	</view>
</template>

<script>
	export default {
		name:"clock",
		data() {
			return {
				time:'',
				timeInterval:null
			};
		},

		mounted() {
			const that = this;
				that.timeInterval = setInterval(()=>{
					that.init()
				},1000) 
			},
		methods:{
			init() {
				const time = new Date().toLocaleString('zh-ZH')
				this.time = time
			}
		},
		beforeDestroy() {
			clearInterval(this.timeInterval)
		}
	}
</script>

<style lang="less">

</style>
