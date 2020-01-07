<template>
	<div id="HomeEight">
		<!-- <h3>{{Title}}</h3> -->
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="灾情评估报告" name="first">
				<ul>
					<li v-for="(item, index) in DOXtableData" :key="index">
						{{ item.name }}
						<a style="display:block;width:32px" :href = "item.path" @click="getProductDetail(item.name,item.fileType,item.path)" v-bind:download="item.name"><img :src="require('../../../assets/home/icon_down.png')" style="display:block;width:12px;padding-right:0px"/></a>
					</li>
				</ul>
			</el-tab-pane>
			<el-tab-pane label="快速生成专题图" name="second">
				<ul>
					<li v-for="(item, index) in JPGtableData" :key="index">
						{{ item.name }}
						<a style="display:block;width:32px" :href = "item.path" @click="getProductDetail(item.name,item.fileType,item.path)" v-bind:download="item.name"><img :src="require('../../../assets/home/icon_down.png')" style="display:block;width:12px;padding-right:0px"/></a>
					</li>
				</ul>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
import request from '@/utils/request';

export default {
	inject:['reload'],
	name: 'HomeEight',
	data() {
		return {
			activeName: 'first',
			featId:this.$route.query.featId,
			DOXtableData: [],
			JPGtableData: []
		};
	},
	components: {},
	methods: {
		getProductDetail(name,suffix,url) {
			window.location.href="http://192.168.0.46:8083/EQIM_Bis/getTEarthquakeProductsPsDOXCount/fileDownload?fileName="+name+'.'+suffix+"&filePath="+url;		
		},
		handleClick() {
		},
		//		初始化方法
		lyPush(){
			this.$router.push({
				path: '/home/dashboard',
			});
		},
		commonPart() {
			
			var param = { relId: this.featId };
			request({ url: '/getTEarthquakeProductsPsDOXCountAndDOXListAndJPGCountAndJPGList', method: 'post', data: param }).then(res => {
				
				let data = res.data.result;
				this.DOXtableData = data.DOXlist;
				console.log(this.DOXtableData);
				this.JPGtableData = data.JPGlist;
				console.log(this.JPGtableData);
			});
		}
	},
	created() {
		this.lyPush();
		this.commonPart();
	}
};
</script>
<style lang="scss" scoped="scoped">
#HomeEight {
	height: 90%;
	ul li {
		line-height: 25px;
		a {
			display: inline-block;
			float: right;
			img {
				width: 12px;
				height: 12px;
				padding-right: 20px;
			}
		}
	}
}
/deep/ .el-tabs--top {
	height: 80%;
}
/deep/ .el-tabs__nav-wrap::after {
	background-color: transparent;
}
/deep/ .el-tabs__item {
	color: #67798d;
	font-size: 14px;
	padding: 0 10px;
	font-family: Arial;
	font-weight: bold;
}
/deep/ .is-active {
	color: #00c2f9;
	font-family: Arial;
	font-weight: bold;
}
/deep/ #tab-first {
	padding-left: 10px;
}
/deep/ .el-tabs__active-bar {
	background-color: transparent;
}
/deep/ .el-tabs__header {
	margin: 0;
}
/deep/ .el-tabs__content {
	width: 95%;
	height: 100%;
	margin: 0 auto;
	padding: 0px;
	overflow-y: scroll;
	color: #d3d9df;
}
/*滚动条样式*/

/deep/ .el-tabs__content::-webkit-scrollbar {
	width: 5px;
	height: 5px;
	background-color: transparent;
}

/*定义滚动条轨道 内阴影+圆角*/
/deep/ .el-tabs__content::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	border-radius: 10px;
	background-color: transparent;
}

/*定义滑块 内阴影+圆角*/
/deep/ .el-tabs__content::-webkit-scrollbar-thumb {
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	background-color: #067086;
}



@media screen and (max-width: 1700px) and (min-width: 1500px) {
	/deep/ .el-tabs__item {
		font-size: 15px;
	}
}
@media screen and (max-width: 1980px) and (min-width: 1701px) {
	/deep/ .el-tabs__item {
		font-size: 17px;
	}
	#HomeEight {
		ul li {
			line-height: 35px;
			font-size: 16px;
			a {
				img {
					width: 15px;
					height: 15px;
					padding-right: 20px;
				}
			}
		}
	}
}
</style>
