const $http = function(url, method, data) {
	return new Promise((resolve,reject)=>{
		uni.request({
			url,
			method,
			data,
			success: (res) => resolve(res),
			fail: (failMsg) => {
				reject(failMsg)
			}
		})
	})

}
export default $http
