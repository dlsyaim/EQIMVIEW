<template>
	<div id="HomeSeven">
		<h3>{{ Title }}</h3>
		<el-select v-model="value" placeholder="主要景点" @change="onchange">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
		</el-select>
		<div ref="myChart3" id="myChart3" style="height:100%;width:100%"></div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			Title: '震中周边项目',
			value: '',
			datas:[
				[[100, 50, 90, 10, 49]],
				[[90, 60, 80, 35, 70]],
				[[80, 70, 100, 41, 80]],
				[[70, 80, 60, 62, 70]],
				[[60, 90, 50, 75, 46]],
				[[50, 100, 30, 55, 42]],
			],
			seltValue: [
				[{ name: '外滩', max: 300 }, { name: '东方明珠', max: 300 }, { name: '老城隍庙', max: 300 }, { name: '田子坊', max: 300 }, { name: '海洋馆', max: 300 }],
				[{ name: '第一小学', max: 300 }, { name: '第二小学', max: 300 }, { name: '第三小学', max: 300 }, { name: '第四小学', max: 300 }, { name: '第五小学', max: 300 }],
				[{ name: '第一道路', max: 300 }, { name: '第二道路', max: 300 }, { name: '第三道路', max: 300 }, { name: '第四道路', max: 300 }, { name: '第五道路', max: 300 }],
				[{ name: '第一铁路', max: 300 }, { name: '第二铁路', max: 300 }, { name: '第三铁路', max: 300 }, { name: '第四铁路', max: 300 }, { name: '第五铁路', max: 300 }],
				[{ name: '第一危险源', max: 300 },{ name: '第二危险源', max: 300 },{ name: '第三危险源', max: 300 },{ name: '第四危险源', max: 300 },{ name: '第五危险源', max: 300 }],
				[{ name: '第一重要目标', max: 300 },{ name: '第二重要目标', max: 300 },{ name: '第三重要目标', max: 300 },{ name: '第四重要目标', max: 300 },{ name: '第五重要目标', max: 300 }]
			],
			options: [
				{ value: '0', label: '主要景点' },
				{ value: '1', label: '学校' },
				{ value: '2', label: '道路' },
				{ value: '3', label: '地铁' },
				{ value: '4', label: '危险源' },
				{ value: '5', label: '重要目标' }
			]
		};
	},
	components: {},
	methods: {
		onchange(value) {
			console.log("value",value)
			this.datas.map((item,index)=>{	
				if(index == value){
					console.log('item',item)
					console.log('index',index)
					this.downSelect(this.seltValue[index],item);
				}
			})
		},
		downSelect(seltValue,datas) {
			// 基于准备好的dom，初始化echarts实例
			let myChart3 = this.$echarts.init(this.$refs.myChart3);
			var lineStyle = {
				normal: {
					width: 1,
					opacity: 0.5
				}
			};
			// 绘制图表
			myChart3.setOption({
				color: [],
				tooltip: {},
				radar: {
					radius: '50%',
					center: ['50%', '45%'],
					indicator: seltValue,
					splitNumber: 1,
					name: {
						textStyle: {
							color: '#ffffff',
							fontSize: '110%'
						}
					},
					splitLine: {
						lineStyle: {
							color: '#2b5a6a',
							opacity: 0.5
						}
					},
					splitArea: {
						show: true,
						areaStyle: {
							color: '#2b5a6a',
							opacity: 0.1
						}
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: '#2b5a6a',
							opacity: 0.5
						}
					}
				},
				series: [
					{
						name: '雷达线ALL',
						type: 'radar',
						silent: true,
						lineStyle: {
							normal: {
								type: 'solid',
								color: '#2b5a6a',
								width: 0.5,
								opacity: 1
							}
						},
						data: [[300, 300, 300, 300, 300]],

						itemStyle: {
							normal: {
								opacity: 0
							}
						},
						areaStyle: {
							normal: {
								color: '#0d6dba',
								opacity: 0.1
							}
						}
					},
					{
						name: '雷达线2',
						type: 'radar',
						silent: true,
						lineStyle: {
							normal: {
								type: 'solid',
								color: '#2b5a6a',
								width: 0.5,
								opacity: 1
							}
						},
						data: [[250, 250, 250, 250, 250]],

						itemStyle: {
							normal: {
								opacity: 0
							}
						},
						areaStyle: {
							normal: {
								color: 'rgba(0,0,0,0)',
								opacity: 0.1
							}
						}
					},
					{
						name: '雷达线3',
						type: 'radar',
						silent: true,
						lineStyle: {
							normal: {
								type: 'solid',
								color: '#2b5a6a',
								width: 0.5,
								opacity: 1
							}
						},
						data: [[200, 200, 200, 200, 200]],

						itemStyle: {
							normal: {
								opacity: 0
							}
						},
						areaStyle: {
							normal: {
								color: 'rgba(0,0,0,0)',
								opacity: 0.1
							}
						}
					},
					{
						name: '雷达线4',
						type: 'radar',
						silent: true,
						lineStyle: {
							normal: {
								type: 'solid',
								color: '#2b5a6a',
								width: 0.5,
								opacity: 1
							}
						},
						data: [[150, 150, 150, 150, 150]],

						itemStyle: {
							normal: {
								opacity: 0
							}
						},
						areaStyle: {
							normal: {
								color: '#103d64',
								opacity: 0.1
							}
						}
					},

					{
						name: '震中周边项目数(个)',
						type: 'radar',
						lineStyle: lineStyle,
						data: datas,
						symbolSize: 4,
						itemStyle: {
							normal: {
								borderColor: '#59aac8',
								borderWidth: 2
							}
						},
						areaStyle: {
							normal: {
								color: '#14456e',
								opacity: 0.5
							}
						}
					},
					{
						name: '雷达线',
						type: 'radar',
						silent: true,
						lineStyle: {
							normal: {
								type: 'dotted',
								width: 4,
								opacity: 0.3
							}
						},
						data: [[6, 5, 6, 4, 2]],

						itemStyle: {
							normal: {
								opacity: 0
							}
						}
					}
				]
			});
		}
	},

	mounted() {
		this.downSelect(this.seltValue[0],this.datas[0]);
	}
};
</script>
<style lang="scss" scoped="scoped">
#HomeSeven {
	position: relative;
	.el-select {
		position: absolute;
		top: 5%;
		right: 5%;
		width: 100px !important;
		/deep/ .el-input__inner {
			height: 30px !important;
			line-height: 30px !important;
			background: transparent !important;
			border: none;
			color: #ffffff;
			font-size: 13px;
		}
		/deep/ .el-input__icon {
			line-height: 30px;
		}
	}
}
</style>
