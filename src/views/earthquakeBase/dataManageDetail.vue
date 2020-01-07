<template>
	<div class="boxAlls">
		<div class="boxContent">
			<h3>地震详情</h3>
			<el-button type="primary" size="mini" @click="goToAidDecision">辅助决策</el-button>
			<h4>信息列表</h4>
			<div class="boxTop">
				<el-row>
					<el-col :span="3">地震名称</el-col>
					<el-col :span="9">{{ dataOfBasicInfo.earthquakeName }}</el-col>
					<el-col :span="3">发震时间</el-col>
					<el-col :span="9">{{ dataOfBasicInfo.earthquakeTime }}</el-col>
				</el-row>
				<el-row>
					<el-col :span="3">参考位置</el-col>
					<el-col :span="9">{{ dataOfBasicInfo.earthquakeLocation }}</el-col>
					<el-col :span="3">震中经纬度</el-col>
					<el-col :span="9">{{ dataOfBasicInfo.longitude }},{{ dataOfBasicInfo.latitude }}</el-col>
				</el-row>
				<el-row>
					<el-col :span="3">地震震级</el-col>
					<el-col :span="9">{{ dataOfBasicInfo.earthquakeLevel }}</el-col>
					<el-col :span="3">震源深度</el-col>
					<el-col :span="9">{{ dataOfBasicInfo.focalDepth }}</el-col>
				</el-row>
				<el-row>
					<el-col :span="3">断层名称</el-col>
					<el-col :span="9">{{ dataOfBasicInfo.faultName }}</el-col>
					<el-col :span="3">破裂方向</el-col>
					<el-col :span="9">{{ dataOfBasicInfo.reptureDirection }}</el-col>
				</el-row>
				<el-row>
					<el-col :span="3">灾情简报</el-col>
					<el-col :span="9"><a href="#" @click="showPdf">查看文档</a></el-col>
					<el-col :span="3">震区基本信息</el-col>
					<el-col :span="9"><a href="#" @click="showPdf">查看文档</a></el-col>
				</el-row>
			</div>

			<div class="boxBottom">
				<h3>评估结果</h3>
				<el-tabs>
					<el-tab-pane label="建筑物损坏详情">
						<el-table :data="structureDamageData" v-loading="isLoad" border style="width:100%;">
							<el-table-column label="序号" type="index"></el-table-column>
							<el-table-column prop="featId" label="主键" v-if="(show = false)"></el-table-column>
							<el-table-column prop="townName" label="乡镇名称"></el-table-column>
							<el-table-column prop="structureJ" label="基本完好(㎡)"></el-table-column>
							<el-table-column prop="structureQ" label="轻度破坏(㎡)"></el-table-column>
							<el-table-column prop="structureZ" label="中度破坏(㎡)"></el-table-column>
							<el-table-column prop="structureY" label="严重破坏(㎡)"></el-table-column>
							<el-table-column prop="structureD" label="毁坏(㎡)"></el-table-column>
						</el-table>
						<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:page-sizes="[10, 20, 30, 40]"
							:page-size="pageSize"
							:current-page="pageNo"
							layout="total, sizes, prev, pager, next, jumper"
							:background="true"
							:total="count"
						></el-pagination>
					</el-tab-pane>
					<el-tab-pane label="死亡人员分布">
						<el-table :data="structureDamageData" v-loading="isLoad" border>
							<el-table-column label="序号" type="index"></el-table-column>
							<el-table-column prop="featId" label="主键" v-if="(show = false)"></el-table-column>
							<el-table-column prop="townName" label="乡镇名称"></el-table-column>
							<el-table-column prop="deathNumber" label="死亡人数(个)"></el-table-column>
						</el-table>
						<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:page-sizes="[10, 20, 30, 40]"
							:page-size="pageSize"
							:current-page="pageNo"
							layout="total, sizes, prev, pager, next, jumper"
							:background="true"
							:total="count"
						></el-pagination>
					</el-tab-pane>
					<el-tab-pane label="受伤人员分布">
						<el-table :data="structureDamageData" v-loading="isLoad" border>
							<el-table-column label="序号" type="index"></el-table-column>
							<el-table-column prop="featId" label="主键" v-if="(show = false)"></el-table-column>
							<el-table-column prop="townName" label="乡镇名称"></el-table-column>
							<el-table-column prop="injuredNumber" label="受伤人数(个)"></el-table-column>
						</el-table>
						<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:page-sizes="[10, 20, 30, 40]"
							:page-size="pageSize"
							:current-page="pageNo"
							layout="total, sizes, prev, pager, next, jumper"
							:background="true"
							:total="count"
						></el-pagination>
					</el-tab-pane>
					<el-tab-pane label="经济损失">
						<el-table :data="structureDamageData" v-loading="isLoad" border>
							<el-table-column label="序号" type="index"></el-table-column>
							<el-table-column prop="featId" label="主键" v-if="(show = false)"></el-table-column>
							<el-table-column prop="townName" label="乡镇名称"></el-table-column>
							<el-table-column prop="directEconomicLoss" label="直接经济损失(万元)"></el-table-column>
						</el-table>
						<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:page-sizes="[10, 20, 30, 40]"
							:page-size="pageSize"
							:current-page="pageNo"
							layout="total, sizes, prev, pager, next, jumper"
							:background="true"
							:total="count"
						></el-pagination>
					</el-tab-pane>
					<el-tab-pane label="需紧急安置人员">
						<el-table :data="structureDamageData" v-loading="isLoad" border>
							<el-table-column label="序号" type="index"></el-table-column>
							<el-table-column prop="featId" label="主键" v-if="(show = false)"></el-table-column>
							<el-table-column prop="townName" label="乡镇名称"></el-table-column>
							<el-table-column prop="emergencyRehousingNumber" label="需紧急安置人数(人)"></el-table-column>
						</el-table>
						<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:page-sizes="[10, 20, 30, 40]"
							:page-size="pageSize"
							:current-page="pageNo"
							layout="total, sizes, prev, pager, next, jumper"
							:background="true"
							:total="count"
						></el-pagination>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>
<script>
import request from '@/utils/request';
import '@/views/earthquakeBase/detail.scss';
import '../../styles/scrollbar.css';
export default {
	data() {
		return {
			isLoad: false,
			firstSelect: false,
			secondSelect: false,
			thirdSelect: false,
			fourthSelect: false,
			fivethSelect: false,
			isHover: true,
			featId: this.$route.query.featId,
			structureDamageData: null,
			pageSize: 10,
			pageNo: 1,
			count: null,
			dataOfBasicInfo:{
				earthquakeName:'2018年10月29日上海徐汇5.7级地震',
				earthquakeTime:'2018-10-29 16:37:00.0',
				earthquakeLocation:'上海市徐汇区天平路街道',
				longitude:121.44,
				latitude:31.2,
				earthquakeLevel:5.7,
				focalDepth:10,
				faultName:'合利屋',
				reptureDirection:'从西到东'
			}
		};
	},
	methods: {
		commonPart() {
			this.isLoad = true;
			let data = { earthquakeInfoFeatId: this.featId, pageNo: this.pageNo, pageSize: this.pageSize };
			request({ url: '/getDetailByEqInfoId', method: 'post', data: data })
				.then(res => {
					this.isLoad = false;
					let data = res.data.result.detailData;
					this.count = res.data.result.count.count;
					this.structureDamageData = data;
				})
				.catch(res => {
					this.isLoad = false;
					console.log(res);
				});
		},
		selectFirst() {
			this.firstSelect = true;
			this.secondSelect = false;
			this.thirdSelect = false;
			this.fourthSelect = false;
			this.fivethSelect = false;
			this.commonPart();
		},
		selectSecond() {
			this.firstSelect = false;
			this.secondSelect = true;
			this.thirdSelect = false;
			this.fourthSelect = false;
			this.fivethSelect = false;
			this.commonPart();
		},
		selectThird() {
			this.firstSelect = false;
			this.secondSelect = false;
			this.thirdSelect = true;
			this.fourthSelect = false;
			this.fivethSelect = false;
			this.commonPart();
		},
		selectFourth() {
			this.firstSelect = false;
			this.secondSelect = false;
			this.thirdSelect = false;
			this.fourthSelect = true;
			this.fivethSelect = false;
			this.commonPart();
		},
		selectFiveth() {
			this.firstSelect = false;
			this.secondSelect = false;
			this.thirdSelect = false;
			this.fourthSelect = false;
			this.fivethSelect = true;
			this.commonPart();
		},
		handleSizeChange(pageSize) {
			this.pageSize = pageSize;
			if (this.firstSelect == true) {
				this.selectFirst();
			}
			if (this.secondSelect == true) {
				this.selectSecond();
			}
			if (this.thirdSelect == true) {
				this.selectThird();
			}
			if (this.fourthSelect == true) {
				this.selectFourth();
			}
			if (this.fivethSelect == true) {
				this.selectFiveth();
			}
		},
		handleCurrentChange(pageNo) {
			this.pageNo = pageNo;
			if (this.firstSelect == true) {
				this.selectFirst();
			}
			if (this.secondSelect == true) {
				this.selectSecond();
			}
			if (this.thirdSelect == true) {
				this.selectThird();
			}
			if (this.fourthSelect == true) {
				this.selectFourth();
			}
			if (this.fivethSelect == true) {
				this.selectFiveth();
			}
		},
		//查看pdf
		showPdf(){
			this.$router.push({
				path: '/dashboard/common/showDocument',
				name: 'showPdf',
			});
		},
		goToAidDecision() {
			this.$router.push({
				path: '/datamanageAidDecision',
				name: '地震辅助决策',
				query: {
					featId: this.featId
				}
			});
		}
	},
	created() {
		request({ url: '/getInfoByFeatId', method: 'post', data: { featId: this.featId } }).then(res => {
			if(res.data.result){
				let data = res.data.result;
				this.dataOfBasicInfo = data;
			}
		});
		this.selectFirst();
	}
};
</script>
<style scoped="scoped">
.boxAlls {
	width: 100%;
	height: 100%;
	background: rgb(242, 242, 242);
}
.boxAlls .boxContent {
	width: 98%;
	height: 100%;
	margin: 0 auto;
	background: #ffffff;
	border-top: 10px solid rgb(242, 242, 242);
	padding: 10px 15px;
}
.boxAlls .boxContent h3,
.boxAlls .boxContent h4 {
	font-size: 17px;
	font-weight: normal;
	line-height: 25px;
}
.boxAlls .boxContent h4 {
	font-size: 16px;
	margin-top: 10px;
}
.boxAlls .boxContent .el-button {
	float: right;
	padding-right: 10px;
}
.boxAlls .boxContent .boxTop {
	margin: 10px 0;
	position: relative;
}
.boxAlls .boxContent .boxTop:after {
	width: 103%;
	height: 15px;
	background: rgb(244, 244, 244);
	content: '';
	position: absolute;
	left: -15px;
	bottom: -40px;
}

.boxAlls .boxContent .boxTop .el-row {
	height: 40px;
	line-height: 40px;
	text-align: center;
}
.boxAlls .boxContent .boxTop .el-row {
	border-bottom: 1px solid #d5d5d5;
}
.boxAlls .boxContent .boxTop .el-row a{
	color: #409EFF;
}
.boxAlls .boxContent .boxBottom {
	margin-top: 50px;
}
.el-pagination {
	position: fixed;
	bottom: 40px;
}
</style>
