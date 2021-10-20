const getDateInfo = function (month) {
	const d = new Date();
	const m = d.getMonth();
	const day = d.getDay()
	const baseMonthData = {
		0:'一月',
		1:'二月',
		2:'三月',
		3:'四月',
		4:'五月',
		5:'六月',
		6:'七月',
		7:'八月',
		8:'九月',
		9:'十月',
		10:'十一月',
		11:'十二月',
	}
	const baseDayData = {
		1:'周一',
		2:'周二',
		3:'周三',
		4:'周四',
		5:'周五',
		6:'周六',
		0:'周日',
	}
	return {
		month:baseMonthData[m],
		day:baseDayData[day]
	}
}

export {
	getDateInfo
}