const setData = (key,data) => {
	try{
		uni.setStorageSync(key,data)
	}catch(e){
		//TODO handle the exception
		console.log(e);
	}

}

const getData = (key) => {
	try{
	return uni.getStorageSync(key)
	}catch(e){
		//TODO handle the exception
	}
}

const storage = {
	setData,
	getData
}
export default storage ;