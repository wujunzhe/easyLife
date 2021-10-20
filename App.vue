<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "/wxcomponents/vant/common/index.wxss"
	/deep/ .van-grid-item__content {
		background-color: rgba(123,117,83,.5);
	}
</style>
