<template>
	<div id="HomeTwo">
		<h3>{{ Title }}</h3>
		<div class="box">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="安置人数" name="first"></el-tab-pane>
				<el-tab-pane label="受灾总面积" name="second"></el-tab-pane>
				<el-tab-pane label="总人口数" name="third"></el-tab-pane>
			</el-tabs>
			<div ref="myChart2" id="myChart2"></div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			Title: '评估灾情信息',
			activeName: 'first',
			values: [
				[300, 450, 770, 1000, 1200],
				[100, 410, 270, 500, 1100],
				[300, 420, 700, 1200, 1000],
			]
		};
	},
	components: {},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event)
			let  arr=['(人数)人','(平方)米','(人数)人']
			this.oneEcharts(this.values[tab.index],arr[tab.index]);
		},
		// 柱状图
		oneEcharts(value,name) {
			// 基于准备好的dom，初始化echarts实例
			let myChart2 = this.$echarts.init(this.$refs.myChart2);
			// 绘制图表
			myChart2.setOption({
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				grid: {
					left: '18%',
					right: '18%',
					top:'20%',
				},
				xAxis: [
					{
						name: '(烈度)', // 给X轴加单位
						type: 'category',
						data: ['4', '5', '6', '7', '8'],
						axisLine: {
							lineStyle: {
								color: '#00c2f9',
							},
							show: false
						},
						axisTick: {
							//y轴刻度线
							show: false
						},
						axisLabel: {
							color: '#00c2f9',
							textStyle: {
								fontSize: '12'
							}
						}
					}
				],
				yAxis: [
					{
						name: name || '(人数)人', // 给Y轴加单位
						axisLabel: {
							formatter: '{value}',
							color: '#00c2f9'
						},
						axisLine: {
							lineStyle: {
								color: '#00c2f9'
							},
							show: false
						},
						splitLine: {
							show: false
						},
						axisTick: {
							//y轴刻度线
							show: false
						}
					}
				],
				series: [
					{
						type: 'bar',
						data: value,
						barWidth: '5px',
						itemStyle: {
							normal: {
								color: 'rgba(0,244,255,1)',
								barBorderRadius: [30, 30, 30, 30],
								shadowBlur: 4
							}
						}
					}
				]
			});
		}
	},
	mounted() {
		this.oneEcharts(this.values[0]);
	}
};
</script>

<style lang="scss" scoped="scoped">
#HomeTwo .box {
	width: 100%;
	height: 100%;
	margin-top: -15px;
	#myChart2 {
		width: 100%;
		height: 85%;
	}
}
#HomeTwo .box .el-tabs__content {
	width: 100%;
	height: 100%;
}
/deep/ .el-tabs__nav-wrap::after {
	background-color: transparent;
}
/deep/ .el-tabs__item {
	color: #67798d;
	font-size: 11px;
	padding: 0 5px;
	font-family: Arial;
	font-weight: bold;
}
/deep/ .el-tabs--top .el-tabs__item.is-top:last-child{
	padding-right: 10px;
}
/deep/ .is-active {
	color: #00c2f9;
	font-family: Arial;
	font-weight: bold;
}
/deep/ .el-tabs__active-bar {
	background-color: transparent;
}
/deep/ .el-tabs__header {
	margin: 0;
}
/deep/ .el-tabs__nav {
	width: 100%;
	text-align: right;
}



// @media screen and (max-width:1700px) and (min-width:1500px){
//    /deep/ .el-tabs__item{
// 	   font-size: 14px;
//    }
// }
// @media screen and (max-width:1980px) and (min-width:1701px){
//     /deep/ .el-tabs__item{
//       font-size: 15px;
//     }
// }
</style>

