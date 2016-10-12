//version:0.1
//description:
//图表类型(bar(柱形),line(折线),pie(饼图),scatter(散点图),map(地图),radar(雷达图),graph(关系图),funnel(漏斗图),gauge(仪表盘图),heatmap(热力图),candlestick(k线图));
//自定义的方法参数说明：
//var myChart = iVizCharts.line(container,option,theme);
//1.必须参数，container(element，图表的容器)，option(object，图表数据核心对象)
//2.可选参数   theme(string，图表主题，使用时必须先引入相应theme的js文件)
//option对象传入时，series中的type已经动态添加，可不必重复声明


//图表方法说明：
//1.方法中的所有参数都是可以改动的，但必须保证一些必须的默认参数
//2.想要更复杂的图表，只需要根据相应的格式设置option对象就可以。
//3.方法可以自行添加
(function() {
	//图表核心js(iVizCharts.js)，必须在这之前引入
	var iViz = iVizCharts;
	//一些图表对象的公共属性，可以自行配置
	var myTitle = {
			//标题的位置
			left: 'center',
			//主标题和副标题之间的距离，单位是px
			itemGap: 6
		}
		//工具栏
	var myToolBox = {
		show: true,
		orient: 'horizontal',
		left: 40,
		feature: {
			//自动转化类型，折线、柱形、折叠、平铺
			magicType: {
				type: ['line', 'bar', 'stack', 'tiled']
			},
			restore: {

			},
			dataView: {

			}
		}
	}
	var myxAxis = {};
	//解决x坐标轴名称过长的问题
	myxAxis.setxAxisNameGap = function(name) {
		if(name.length <= 4) {
			return 10;
		} else {
			return 30;
		}
	}
	myxAxis.setxAxisNameLocation = function(name) {
		if(name.length <= 4) {
			return 'end';
		} else {
			return 'middle';
		}
	}

	//bar(柱状图)
	iViz.bar = function(container, option, theme) {
		var defaultOption = {
				title: myTitle,
				//图例
				legend: {
					data: [],
					orient: 'horizontal',
					top: 38,
					right: '5%'
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				//x轴数据
				xAxis: {
					type: 'category',
					data: [],
					axisTick: {
						alignWithLabel: true
					}
				},
				//y轴数据
				yAxis: {
					data: []
				},
				//核心数据
				series: []
			}
			//如果没有图例，可根据series里面的name自动设置
		if(option && option.series) {
			if(!option.legend) {
				option.legend = {};
			}
			option.legend.data = [];
			var series = option.series;
			for(var prop in series) {
				if(!series[prop]['name']) {
					console.log("can not find option.series[" + prop + "].name");
				} else {
					option.legend.data.push(series[prop]["name"]);
				}
				if(!series[prop]['type']) {
					series[prop].type = 'bar'
				}
			}
		} else {
			console.log('can not find option.series')
		}
		var myTheme = theme || 'default';
		var myChart = iViz.init(container, myTheme);
		if(!option) {
			return myChart;
		} else {
			//初始化图表
			myChart.setOption(defaultOption);
			if(!option.xAxis.nameGap && option.xAxis.name) {
				option.xAxis.nameGap = myxAxis.setxAxisNameGap(option.xAxis.name);
			}
			if(!option.xAxis.nameLocation && option.xAxis.name) {
				option.xAxis.nameLocation = myxAxis.setxAxisNameLocation(option.xAxis.name);
			}
			//根据传入的数据刷新图表
			myChart.setOption(option);
		}
		//设置返回值为建立的图表
		return myChart;
	}

	//line(折线图)
	iViz.line = function(container, option, theme) {
		var myTheme = theme || 'default';
		var myChart = iViz.init(container, myTheme);
		if(!option) {
			return myChart;
		}
		var defaultOption = {
			title: myTitle,
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: [],
				left: 'right'
			},
			xAxis: {
				data: []
			},
			yAxis: {

			},
			series: []
		}
		if(option && option.series) {
			if(!option.legend) {
				option.legend = {};
				option.legend.data = [];
			}
			var series = option.series;
			for(var prop in series) {
				if(!series[prop]['name']) {
					console.log("can not find option.series[" + prop + "].name");
				} else {
					option.legend.data.push(series[prop]["name"]);
				}
				if(!series[prop]['type']) {
					series[prop].type = 'line'
				}
			}
		} else {
			console.log('can not find series')
		}
		if(!option) {
			return myChart;
		} else {
			myChart.setOption(defaultOption);
			if(!option.xAxis.nameGap && option.xAxis.name) {
				option.xAxis.nameGap = myxAxis.setxAxisNameGap(option.xAxis.name);
			}
			if(!option.xAxis.nameLocation && option.xAxis.name) {
				option.xAxis.nameLocation = myxAxis.setxAxisNameLocation(option.xAxis.name);
			}
			myChart.setOption(option);
		}
		return myChart;
	}

	//pie(饼状图)
	iViz.pie = function (container, option, theme) {
		var myTheme = theme || 'default';
		var myChart = iViz.init(container, myTheme);
		if(!option) {
			return myChart;
		}
		var defaultOption = {
			title: myTitle,
			tooltip: {
				trigger: 'item'
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
				left: 'right'
			},
			series: []
		}
		if(option && option.series) {
			var series = option.series;
			for(var prop in series) {
				if(!series[prop]['type']) {
					series[prop].type = 'pie'
				}
			}
		} else {
			console.log('series can not be find');
		}
		if(option) {
			myChart.setOption(defaultOption);
			myChart.setOption(option);
		} else {
			console.log('option can not be find');
		}
		return myChart;
	}

	//scatter(散点图)
	iViz.scatter = function(container, option, theme) {
		var myTheme = theme || 'default';
		var myChart = iViz.init(container, myTheme);
		if(!option) {
			return myChart;
		}
		var defaultOption = {
			title: myTitle,
			tooltip: {
				trigger: 'item',
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
			series: []
		}
		if(option && option.series) {
			var series = option.series;
			for(var prop in series) {
				if(!series[prop]['type']) {
					series[prop].type = 'scatter'
				}
			}
		} else {
			console.log('series can not be find');
		}
		if(!option) {
			console.log('option can not be find');
		} else {
			myChart.setOption(defaultOption);
			myChart.setOption(option);
		}
		return myChart;
	}

	//map（地图模式）
	//需要加载china.js
	iViz.map = function(container, option, theme) {
		var myTheme = theme || 'default';
		var myChart = iViz.init(container, myTheme);
		if(!option) {
			return myChart;
		}
		var defaultOption = {
			title: myTitle,
			tooltip: {
				trigger: 'item'
			},
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			},
			series: []
		}
		if(option && option.series) {
			var series = option.series;
			for(var prop in series) {
				//设置地图图表的类型
				series[prop].type = 'map';
				series[prop].map = 'china';
				//设置是否可以缩放
				series[prop].roam = true,
					//设置选择模式，可以是single、multiple
					series[prop].selectedMode = 'multiple';
				series[prop].scaleLimit = {
						min: 1
					},
					series[prop].label = {
						normal: {
							show: true
						},
						emphasis: {
							show: true
						}
					},
					series[prop].itemStyle = {
						emphasis: {
							borderColor: '#f00'
						}
					}
			}
		} else {
			console.log('series can not be find');
		}
		if(!option) {
			console.log('option can not be find');
		} else {
			myChart.setOption(defaultOption);
			myChart.setOption(option);
		}
		return myChart;
	}
		//effectScatter(气泡图);
	iViz.effectScatter = function(container, option, theme) {
		var myTheme = theme || 'default';
		var myChart = iViz.init(container, myTheme);
		if(!option) {
			return myChart;
		}
		var defaultOption = {
			title: myTitle,
			tooltip: {
				trigger: 'item'
			},
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			},
			xAxis: {},
			yAxis: {},
			tooltip: {
				trigger: 'item'
			},
			series: []
		}
		if(option && option.series) {
			var series = option.series;
			for(var prop in series) {
				//设置series里面第一组数据的类型为effecScatter（散点图）；
				series[prop].map = 'china';
				//设置是否可以缩放
				series[prop].roam = true,
					series[prop].scaleLimit = {
						min: 1
					}
				if(!series[prop]['type']) {
					series[prop].type = 'effectScatter'
				}
			}
		} else {
			console.log('series can not be find');
		}
		if(option) {
			myChart.setOption(defaultOption);
			myChart.setOption(option);
		} else {
			console.log('option can not be find');
		}
		return myChart;
	}

	//radar(雷达图)
	iViz.radar = function(container, option, theme) {
		var myTheme = theme || 'default';
		var myChart = iViz.init(container, myTheme);
		if(!option) {
			return myChart;
		}
		var defaultOption = {
			title: myTitle,
			tooltip: {
				trigger: 'item'
			},
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			},
			series: []
		}
		if(option && option.series) {
			var series = option.series;
			for(var prop in series) {
				if(!series[prop]['type']) {
					series[prop].type = 'radar'
				}
			}
		} else {
			console.log('series can not be find');
		}

		if(option) {
			myChart.setOption(defaultOption);
			myChart.setOption(option);
		} else {
			console.log('option can not be find');
		}
		return myChart;
	}

	//graph(关系图)
	iViz.graph = function(container, option, theme) {
		var myTheme = theme || 'default';
		var myChart = iViz.init(container, myTheme);
		if(!option) {
			return myChart;
		}
		var defaultOption = {
			series: []
		};
		if(option && option.series) {
			var series = option.series;
			for(var prop in series) {
				if(!series[prop]['type']) {
					series[prop].type = 'graph'
				}
			}
		} else {
			console.log('can not find options')
		}

		if(option) {
			myChart.setOption(defaultOption);
			myChart.setOption(option);
		} else {
			console.log('erro!can not find option');
		}
		return myChart;
	}

	//funnel(漏斗图)
	iViz.funnel = function(container, option, theme) {
		var myTheme = theme || 'default';
		var myChart = iViz.init(container, myTheme);
		if(!option) {
			return myChart;
		}
		var defaultOption = {
			title: myTitle,
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c}%"
			},
			series: []
		};
		if(option && option.series) {
			var series = option.series;
			for(var prop in series) {
				if(!series[prop]['type']) {
					series[prop].type = 'funnel'
				}
			}
		} else {
			console.log('can not find options')
		}

		if(option) {
			myChart.setOption(defaultOption);
			myChart.setOption(option);
		} else {
			console.log('error!can not find option');
		}
		return myChart;
	}

	//gauge(仪表盘图)；
	iViz.gauge = function(container, option, theme) {
			var myTheme = theme || 'default';
			var myChart = iViz.init(container, myTheme);
			if(!option) {
				return myChart;
			}
			var defaultOption = {
				tooltip: {
					trigger: 'item'
				},
				series: []
			};
			if(option && option.series) {
				var series = option.series;
				for(var prop in series) {
					if(!series[prop]['type']) {
						series[prop].type = 'gauge'
					}
				}
			} else {
				console.log('can not find option')
			}

			if(option) {
				myChart.setOption(defaultOption);
				myChart.setOption(option);
			} else {
				console.log('error!can not find option');
			}
			return myChart;
		}
		//heatmap(热力图);
	iViz.heatmap = function(container, option, theme) {
			var myTheme = theme || 'default';
			var myChart = iViz.init(container, myTheme);
			if(!option) {
				return myChart;
			}
			var defaultOption = {
				series: []
			};
			if(option && option.series) {
				var series = option.series;
				for(var prop in series) {
					if(!series[prop]['type']) {
						series[prop].type = 'heatmap'
					}
				}
			} else {
				console.log('warning!series did not exist.');
			}
			if(option) {
				myChart.setOption(defaultOption);
			}
			myChart.setOption(option);
			return myChart;
		}
		//candlestick(k线图);
	iViz.candlestick = function(container, option, theme) {
		var myTheme = theme || 'default';
		var myChart = iViz.init(container, myTheme);
		if(!option) {
			return myChart;
		}
		var defaultOption = {
			series: []
		};
		if(option && option.series) {
			var series = option.series;
			for(var prop in series) {
				if(!series[prop]['type']) {
					series[prop].type = 'candlestick'
				}
			}
		} else {
			console.log('warning!series did not exist.');
		}
		if(option) {
			myChart.setOption(defaultOption);
		}
		myChart.setOption(option);
		return myChart;
	}

	//treemap(树状图);
	iViz.treemap = function(container, option, theme) {
		var myTheme = theme || 'default';
		var myChart = iViz.init(container, myTheme);
		if(!option) {
			return myChart;
		}
		var defaultOption = {
			series: []
		};
		if(option && option.series) {
			var series = option.series;
			for(var prop in series) {
				if(!series[prop]['type']) {
					series[prop].type = 'treemap'
				}
			}
		} else {
			console.log('warning!series did not exist.');
		}
		if(option) {
			myChart.setOption(defaultOption);
			myChart.setOption(option);
		}
		return myChart;
	}
})()