//version:0.1
//图表类型(bar(柱形),line(折线),pie(饼图),scatter(散点图),map(地图),radar(雷达图),graph(关系图),funnel(漏斗图),gauge(仪表盘图),heatmap(热力图),candlestick(k线图));
(function () {
	//图表核心js(iVizCharts.js)，必须在这之前引入
	var iViz = iVizCharts;
	//一些图表对象的公共属性，可以自行配置
	var myTitle = {
		//标题的位置
		left:'center',
		//主标题和副标题之间的距离，单位是px
		itemGap:6
	}
	var myToolBox = {
		show:true,
		orient:'horizontal',
		left:40,
		feature:{
			magicType:{
				type:['line','bar']
			}
		}
	}
	var myxAxis = {};
	//解决x坐标轴名称过长的问题
	myxAxis.setxAxisNameGap = function (name) {
		if(name.length<=4){
			return 10;
		}else {
			return 30;
		}
	}
	myxAxis.setxAxisNameLocation = function (name) {
		if(name.length<=4){
			return 'end';
		}else {
			return 'middle';
		}
	}
	//自定义的方法参数说明：
	//1.必须参数，container(element，图表的容器)，option(object，图表数据核心对象)
	//2.可选参数   theme(string，图表主题，使用时必须先引入相应theme的js文件)
	
	//图表方法说明：
	//1.方法中的所有参数都是可以改动的，但必须保证一些必须的默认参数
	//2.想要更复杂的图表，只需要根据相应的格式设置option对象就可以。
	//3.方法可以自行添加
	
	//bar(柱状图)
	iViz.bar = function (container,option,theme) {
		console.log(myToolBox);
		var defaultOption = {
			title:myTitle,
			toolbox:myToolBox,
			//图例
			legend:{
				data:[],
				orient:'horizontal',
				top:38,
			    right:'5%'
			},
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    //x轴数据
		    xAxis : {
			            type : 'category',
			            data:[],
			            axisTick: {
			                alignWithLabel: true
			            }
			       },
		    //y轴数据
		    yAxis : {
			            type : 'value',
			            data:[]
			        },
		    //核心数据
		    series : []
		}
		if(option.series){
			for(var prop in option.series){
				option.series[prop].type = 'bar'
			}
		}else{
			console.log('can not find series')
		}
		var myTheme = theme || 'default';
		var myChart = iViz.init(container,myTheme);
		if(option){
			//初始化图表
			myChart.setOption(defaultOption);
			if(option.xAxis.name){
				option.xAxis.nameGap = myxAxis.setxAxisNameGap(option.xAxis.name);
				option.xAxis.nameLocation = myxAxis.setxAxisNameLocation(option.xAxis.name);
			}
			//根据传入的数据刷新图表
			myChart.setOption(option);
		}else{
			console.log('can not find option');
		}
		//设置返回值为建立的图表
		return myChart;
	}


	//line(折线图)
	iViz.line = function (container,option,theme) {
			var defaultOption = {
			title:myTitle,
			toolbox:myToolBox,
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend:{
				data:[],
				left:'right',
				orient:'vertical'
			},
		    xAxis : [
		        {
		            type : 'category',
        			boundaryGap: false,
		            data : []
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : []
		}
		for(var prop in defaultOption){
			defaultOption.series[prop] = 'line'
		}
		if(option.series){
			for(var prop in option.series){
				option.series[prop].type = 'line'
			}
		}else {
			console.log('option.series can not find');
		}
		
		var myTheme = theme || 'default';
		var myChart = iViz.init(container,myTheme);
		if(option){
			myChart.setOption(defaultOption);
			if(option.xAxis.name){
				option.xAxis.nameGap = myxAxis.setxAxisNameGap(option.xAxis.name);
				option.xAxis.nameLocation = myxAxis.setxAxisNameLocation(option.xAxis.name);
			}
			myChart.setOption(option);
		}else{
			console.log('option can not be find')
		}
		return myChart;
	}
	
		//pie(饼状图)
	iViz.pie = function (container,option,theme) {
		var defaultOption = {
			title:myTitle,
		    tooltip : {
		    	trigger:'item',
		        formatter: "{b} : {c} ({d}%)"
		    },
		    itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
           },
           legend: {
		        orient: 'vertical',
		        left: 'left'
		    },
		    series : [
		        {
		            type:'pie',
		            data:[]
		        }
		    ]
		}
		if(option.series){
			for(var prop in option.series){
				option.series[prop].type = 'pie';
				option.series[prop].label = {
					normal:{
						show:true,
						formatter:'{b}  {d}%'
					}
				}
			}
		}else {
			console.log('series can not be find');
		}
		
		var myTheme = theme || 'default';
		var myChart = iViz.init(container,myTheme);
		if(option){
			myChart.setOption(defaultOption);
			myChart.setOption(option);
		}else{
			console.log('option can not be find');
		}
		return myChart;
	}
	
	//scatter(散点图)
	iViz.scatter = function (container,option,theme) {
		var defaultOption = {
			title:myTitle,
			grid: myGrid,
		    tooltip : {
		    	trigger:'item',
		        formatter: "{c}"
		    },
		    itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
           },
            xAxis: {
		        splitLine: {
		            lineStyle: {
		                type: 'dashed'
		            }
		        }
		    },
		    yAxis: {
		        splitLine: {
		            lineStyle: {
		                type: 'dashed'
		            }
		        },
		        scale: true
		    },
           legend: {
		        orient: 'vertical',
		        left: 'left'
		    },
		    series : []
		}
		if(option.series){
			for(var prop in option.series){
				option.series[prop].type = 'scatter';
			}
		}else {
			console.log('series can not be find');
		}
		
		var myTheme = theme || 'default';
		var myChart = iViz.init(container,myTheme);
		if(option){
			myChart.setOption(defaultOption);
			myChart.setOption(option);
		}else{
			console.log('option can not be find');
		}
		return myChart;
	}
	
	//map（地图模式）
	//需要加载china.js
	iViz.map = function (container,option,theme) {
		var defaultOption = {
			title:myTitle,
			grid: myGrid,
		    tooltip : {
		    	trigger:'item'
		    },
		    itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
       		},
		    series : []
		}
		if(option.series){
			for(var prop in option.series){
				//设置地图图表的类型
				option.series[prop].type = 'map';
				option.series[prop].map = 'china';
				//设置是否可以缩放
				option.series[prop].roam = true,
				//设置选择模式，可以是single、multiple
				option.series[prop].selectedMode = 'multiple';
				option.series[prop].scaleLimit = {
					min:1
				},
				option.series[prop].label = {
	                normal: {
	                    show: true
	                },
	                emphasis: {
	                    show: true
	                }
	           	},
	           	option.series[prop].itemStyle = {
	           		emphasis:{
	           			borderColor:'#f00'
	           		}
	           	}
			}
		}else {
			console.log('series can not be find');
		}
		
		var myTheme = theme || 'default';
		var myChart = iViz.init(container,myTheme);
		if(option){
			myChart.setOption(defaultOption);
			myChart.setOption(option);
		}else{
			console.log('option can not be find');
		}
		return myChart;
	}
	
	//radar(雷达图)
	iViz.radar = function (container,option,theme) {
		var defaultOption = {
			title:myTitle,
			grid: myGrid,
		    tooltip : {
		    	trigger:'item'
		    },
		    itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
       		},
		    series : []
		}
		if(option.series){
			for(var prop in option.series){
				option.series[prop].type = 'radar';
			}
		}else {
			console.log('series can not be find');
		}
		
		var myTheme = theme || 'default';
		var myChart = iViz.init(container,myTheme);
		if(option){
			myChart.setOption(defaultOption);
			myChart.setOption(option);
		}else{
			console.log('option can not be find');
		}
		return myChart;
	}
	
	//graph(关系图)
	iViz.graph = function (container,option,theme) {
		var defaultOption = {
			series:[]
		};
		if(option.series) {
			for(var prop in option.series){
				option.series[prop].type = 'graph';
			}
		}else{
			console.log('can not find options')
		}
		var myTheme = theme || 'default';
		var myChart = iViz.init(container,myTheme);
		if(option){
			myChart.setOption(defaultOption);
			myChart.setOption(option);
		}else {
			console.log('erro!can not find option');
		}
		return myChart;
	}
	
	//funnel(漏斗图)
	iViz.funnel = function (container,option,theme) {
		var defaultOption = {
			tooltip: {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c}%"
		    },
			series:[]
		};
		if(option.series) {
			for(var prop in option.series){
				option.series[prop].type = 'funnel';
			}
		}else{
			console.log('can not find options')
		}
		var myTheme = theme || 'default';
		var myChart = iViz.init(container,myTheme);
		if(option){
			myChart.setOption(defaultOption);
			myChart.setOption(option);
		}else {
			console.log('erro!can not find option');
		}
		return myChart;
	}
	
	//gauge(仪表盘图)；
	iViz.gauge = function (container,option,theme) {
		var defaultOption = {
			tooltip : {
		        trigger:'item'
		    },
			series:[]
		};
		if(option.series) {
			for(var prop in option.series){
				option.series[prop].type = 'gauge';
			}
		}else{
			console.log('can not find option')
		}
		var myTheme = theme || 'default';
		var myChart = iViz.init(container,myTheme);
		if(option){
			myChart.setOption(defaultOption);
			myChart.setOption(option);
		}else {
			console.log('erro!can not find option');
		}
		return myChart;
	}
	//heatmap(热力图);
	iViz.heatmap = function (container,option,theme) {
		var myTheme = theme || 'default';
		var myChart = iViz.init(container,myTheme);
		var defaultOption = {
			series:[]
		};
		if(option.series) {
			for(var seriesItem in option.series) {
				option.series[seriesItem].type = 'heatmap';
			}
		}else {
			console.log('warning!series did not exist.');
		}
		if(option) {
			myChart.setOption(defaultOption);
		}
		myChart.setOption(option);
		return myChart;
	}
	//candlestick(k线图);
	iViz.candlestick = function (container,option,theme) {
		var myTheme = theme || 'default';
		var myChart = iViz.init(container,myTheme);
		var defaultOption = {
			series:[]
		};
//		if(option.series) {
//			for(var seriesItem in option.series) {
//				option.series[seriesItem].type = 'candlestick';
//			}
//		}else {
//			console.log('warning!series did not exist.');
//		}
		if(option) {
			myChart.setOption(defaultOption);
		}
		myChart.setOption(option);
		return myChart;
	}
	
	//treemap(树状图);
	iViz.treemap = function (container,option,theme) {
		var myTheme = theme || 'default';
		var myChart = iViz.init(container,myTheme);
		var defaultOption = {
			series:[]
		};
		if(option.series) {
			for(var seriesItem in option.series) {
				option.series[seriesItem].type = 'treemap';
			}
		}else {
			console.log('warning!series did not exist.');
		}
		if(option) {
			myChart.setOption(defaultOption);
			myChart.setOption(option);
		}
		return myChart;
	}
})()
