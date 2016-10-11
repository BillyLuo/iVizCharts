iVizCharts
提供各种图表实例化的方法：
例子：
var lineCharts = iVizCharts.line(document.getElementById('test'),{
	title:{
		text:'this is a line Map',
		subtext:'subtext'
	},
	xAxis:{
		name:'x轴rere标题',
		data:['周一','周二','周三','周四','周五']
	},
	yAxis:{
		name:'这是y轴标题',
		//隐藏y坐标轴
//		axisLine:{
//			show:false
//		},
//		axisTick:{
//			show:false
//		},
//		axisLabel:{
//			show:false
//		}
	},
	series:[
		{
			name:'line1',
			data:[
				1,3,2,4,5
			],
			label:{
				normal:{
					show:true,
					position:'bottom'
				}
			},
//			symbol:'none',
			smooth:true,
			areaStyle:{normal:{}}
		},
		{
			name:'line2',
			data:[
				2,4,5,7,8
			],
//			symbol:'none',
			smooth:true,
			areaStyle:{normal:{}}
		}
	]
},'dark');