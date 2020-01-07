<template>
	<div id="home">
		<div class="header">
			{{ headerTitle }}
			<div class="headerRight">
				<img :src="weatherUrls[weatherText.indexOf(weatherData.weatherPre)]" :title="weatherData.weatherPre" alt="天气" />
				<span>{{ weatherData.weatherPre }}</span>
				<span>{{ weatherData.wendu }}℃</span>
				<!-- <span>{{ weatherData.min }}~{{ weatherData.max }}℃</span> -->
				<router-link to="/earthquakeBase/dataManage">
					详情
					<img :src="detailIcon" />
				</router-link>
			</div>
		</div>
		<div class="homeTop">
			<div class="homeLeft">
				<home-one class="one"></home-one>
				<home-two class="two"></home-two>
			</div>
			<home-three class="three"></home-three>
			<div class="homeRight">
				<home-four class="four"></home-four>
				<home-five class="five"></home-five>
			</div>
		</div>
		<div class="homeBottom">
			<home-six class="six"></home-six>
			<home-seven class="seven"></home-seven>
			<home-eight class="eight"></home-eight>
			<home-nine class="nine"></home-nine>
		</div>
	</div>
</template>
<script>
import request from '@/utils/request';
import HomeOne from './HomeOne.vue';
import HomeTwo from './HomeTwo.vue';
import HomeThree from './HomeThree.vue';
import HomeFour from './HomeFour.vue';
import HomeFive from './HomeFive.vue';
import HomeSix from './HomeSix.vue';
import HomeSeven from './HomeSeven.vue';
import HomeEight from './HomeEight.vue';
import HomeNine from './HomeNine.vue';
//import request from '@/utils/request';
export default {
	name: 'home',
	data() {
		return {
			featId:this.$route.query.featId,
			headerTitle: '上海市徐汇区5.7级地震应急评估展示',
			detailIcon: require('../../../assets/home/icon_sanjiao.png'),
			weatherUrls: [
				require('../../../assets/home/ic_weather_cloudy.png'),
				require('../../../assets/home/ic_weather_foggy.png'),
				require('../../../assets/home/ic_weather_overcast.png'),
				require('../../../assets/home/ic_weather_rain_heavy.png'),
				require('../../../assets/home/ic_weather_rain_light.png'),
				require('../../../assets/home/ic_weather_rain_moderate.png'),
				require('../../../assets/home/ic_weather_snow.png'),
				require('../../../assets/home/ic_weather_sunny.png'),
				require('../../../assets/home/ic_weather_thunder.png'),
				require('../../../assets/home/ic_weather_windy.png')
			],
			// 天气文字表述情况
			weatherText: ['多云', '雾', '阴', '大雨', '小雨', '中雨', '雪', '晴', '雷阵雨', '台风'],
			weatherData: {
				weatherPre: '晴',
				weatherNext: '',
				wendu: 20,
				min: 8,
				max: 20
			}
		};
	},
	components: {
		HomeOne,
		HomeTwo,
		HomeThree,
		HomeFour,
		HomeFive,
		HomeSix,
		HomeSeven,
		HomeEight,
		HomeNine
	},
	methods: {
		weather() {
			// 天气接口错误信息返回数据-----需要处理
			// request({ url: 'http://wthrcdn.etouch.cn/weather_mini?city=上海', method: 'get' })
			// 	.then(res => {
			// 		this.weatherData.wendu = res.data.wendu;
			// 		console.log('成功');
			// 	})
			// 	.catch(res => {
			// 		this.weatherData.wendu = res.data.wendu;
			// 		this.weatherData.weatherPre = res.data.forecast[0].type;
					// 最低温度-最高温度
					// let mins = res.data.forecast[0].low.replace(/[^0-9]/gi, '');
					// let maxs = res.data.forecast[0].high.replace(/[^0-9]/gi, '');
					// this.weatherData.min = mins;
					// this.weatherData.max = maxs;
				//});
		},
		lyPush(){
			this.$router.push({
				path: '/home/dashboard',
			});
		},
		commonPart() {
			var param = { featid: this.featId };
			request({ url: '/getTEarthquakeId', method: 'post', data: param }).then(res => {
				let data = res.data.result;
				this.headerTitle = data.list["0"].earthquakeName+"应急评估展示";
			});
		}
	},
	mounted() {
		this.weather();
		window.onresize = () => {
			// 基于准备好的dom，初始化echarts实例
			let myChart1 = this.$echarts.init(document.getElementById('myChart1'));
			let myChart2 = this.$echarts.init(document.getElementById('myChart2'));
			let myChart3 = this.$echarts.init(document.getElementById('myChart3'));
			myChart1.resize();
			myChart2.resize();
			myChart3.resize();
		};
	},
	created() {
		this.lyPush();
		this.commonPart();
	}
};
</script>
<style lang="scss" scoped>
#home {
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-image: url(../../../assets/home/bg.png);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-position: center;
	.header {
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 1.5625rem;
		color: #ffffff;
		background-image: url(../../../assets/home/icon_header.png);
		background-repeat: no-repeat;
		background-size: inherit;
		background-position: center;
		position: relative;
		.headerRight {
			width: 200px;
			height: 30px;
			line-height: 30px;
			display: inline-block;
			float: right;
			color: #d3d9df;
			position: absolute;
			top: 0;
			right: 0;
			img {
				width: 15px;
				height: 15px;
				display: inline-block;
				vertical-align: text-bottom;
				margin: 0 5px;
			}

			span {
				margin: 0 5px;
				font-size: 13px;
			}
			a {
				text-decoration: none;
				font-size: 15px;
				color: #2dd8f2;
				img {
					width: 8px;
					height: 8px;
					display: inline-block;
					vertical-align: middle;
				}
			}
		}
	}
	.homeTop {
		width: 100%;
		height: 60%;
		margin: 5px 0;
		.homeLeft {
			float: left;
			width: 21%;
			height: 100%;
			padding-left: 5px;
			div {
				width: 96%;
				height: 48%;
				margin: 10px 5px;
				background-image: url(../../../assets/home/znbdBox.png);
				background-position: center;
				background-size: 100% 100%;
			}
		}
		.homeRight {
			float: right;
			width: 21%;
			height: 100%;
			padding-right: 5px;
			div {
				width: 96%;
				height: 48%;
				margin: 10px 5px;
				background-image: url(../../../assets/home/znbdBox.png);
				background-position: center;
				background-size: 100% 100%;
			}
		}
		.three {
			float: left;
			margin: 10px 0;
			width: 57%;
			height: 96%;
		}
	}
	.homeBottom {
		width: 100%;
		height: 30%;
		margin: 10px 5px;
		padding: 0 5px;
		div {
			float: left;
			margin-right: 10px;
			height: 100%;
			background-image: url(../../../assets/home/znbdBox.png);
			background-position: center;
			background-size: 100% 100%;
		}
		:last-child {
			margin-right: 0px;
		}
		.six {
			width: 20%;
		}
		.seven {
			width: 20%;
		}
		.eight {
			width: 20%;
		}
		.nine {
			width: 36.5%;
		}
	}
}
/deep/ .homeLeft div h3,
/deep/ .homeRight div h3,
/deep/ .homeBottom div h3 {
	color: #00c2f9;
	padding: 10px;
	font-size: 14px;
}
@media screen and (max-width: 1700px) and (min-width: 1500px) {
	/deep/ .homeLeft div h3,
	/deep/ .homeRight div h3,
	/deep/ .homeBottom div h3 {
		font-size: 15px;
	}
}
@media screen and (max-width: 1980px) and (min-width: 1701px) {
	/deep/ .homeLeft div h3,
	/deep/ .homeRight div h3,
	/deep/ .homeBottom div h3 {
		font-size: 17px;
	}
	.header {
		height: 60px !important;
		line-height: 60px !important;
		font-size: 25px !important;
		.headerRight {
			height: 45px !important;
			line-height: 45px !important;
			right: 15px !important;
			img {
				width: 20px !important;
				height: 20px !important;
			}
			span {
				font-size: 15px !important;
			}
			a {
				font-size: 15px !important;
				img {
					width: 10px !important;
					height: 10px !important;
				}
			}
		}
	}
	.nine {
		width: 37% !important;
	}
}
</style>
