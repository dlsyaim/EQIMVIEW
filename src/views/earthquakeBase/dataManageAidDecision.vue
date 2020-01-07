<template>
	<div class="boxAll">
		<div class="boxTop">
			<h3>救援力量与物资</h3>
			<el-tabs>
				<el-tab-pane label="救援力量需求详情">
					<el-table :data="aidDecisionData" v-loading="isLoading" border style="width:100%;" height="200px">
						<el-table-column label="序号" type="index"></el-table-column>
						<el-table-column prop="featId" label="主键" v-if="(show = false)"></el-table-column>
						<el-table-column prop="townName" label="乡镇名称"></el-table-column>
						<el-table-column prop="rescueStaffDemand" label="救援队伍需求(人)" :formatter="getMaxInt"></el-table-column>
						<el-table-column prop="medicalStaffDemand" label="医务人员需求(人)" :formatter="getMaxInt"></el-table-column>
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
				<el-tab-pane label="救援物资详情">
					<el-table :data="aidDecisionData" v-loading="isLoading" border style="width:100%;" height="200px">
						<el-table-column label="序号" type="index"></el-table-column>
						<el-table-column prop="featId" label="主键" v-if="(show = false)"></el-table-column>
						<el-table-column prop="townName" label="乡镇名称" width="250"></el-table-column>
						<el-table-column prop="tentDemand" label="帐篷需求(顶)"></el-table-column>
						<el-table-column prop="temporaryToiletDemand" width="250" label="临时厕所需求(所)"></el-table-column>
						<el-table-column prop="emergencyWaterDemand" width="250" label="应急饮水需求(吨)"></el-table-column>
						<el-table-column prop="foodSubsidy" label="粮食补助(吨)"></el-table-column>
						<el-table-column prop="clothingDemand" label="衣服需求(件)"></el-table-column>
						<el-table-column prop="quiltDemand" label="棉被需求(床)"></el-table-column>
						<el-table-column prop="blanketDemand" label="毛毯需求(床)"></el-table-column>
						<el-table-column prop="stretcherDemand" label="担架需求(副)"></el-table-column>
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

		<div class="boxCenter">
			<h3>救灾路径分析</h3>
			<el-col :span="3">地点1</el-col>
			<el-col :span="9">
				121.53，31.62
				<a href="javascript:;"><i class="el-icon-location"></i></a>
			</el-col>
			<el-col :span="3">地点2</el-col>
			<el-col :span="9">
				121.53，31.62
				<a href="javascript:;"><i class="el-icon-location"></i></a>
			</el-col>
			<el-col :span="3">途径点1</el-col>
			<el-col :span="9">
				121.53，31.62
				<a href="javascript:;"><i class="el-icon-location"></i></a>
			</el-col>
			<el-col :span="3">途径点2</el-col>
			<el-col :span="9">
				121.53，31.62
				<a href="javascript:;"><i class="el-icon-location"></i></a>
			</el-col>
			<div class="boxBtn">
				<el-button type="primary" icon="el-icon-delete" size="mini">清空</el-button>
				<el-button type="primary" icon="el-icon-more" size="mini">路径规划</el-button>
			</div>
		</div>

		<div class="boxBottom">
			<h3>辅助决策文档查看</h3>
			<el-col :span="8">应急响应文档</el-col>
			<el-col :span="16"><a href="#">查看文档</a></el-col>
			<div class="boxBtn">
				<el-button type="primary" icon="el-icon-search" size="mini" @click="goToFocusTarget">重点目标查询</el-button>
			</div>
		</div>
	</div>
</template>
<style scoped="scoped">
.boxAll {
	height: 100%;
	background: #f5f5f5;
	overflow: initial;
}
.boxAll h3 {
	font-size: 16px;
	font-weight: normal;
	line-height: 30px;
}
.boxAll .boxTop,
.boxAll .boxCenter,
.boxAll .boxBottom {
	padding: 10px 15px;
	background: #ffffff;
	margin: 10px;
}
.boxAll .boxTop {
	border-top: 10px solid #f5f5f5;
}
.boxAll .boxCenter {
	height: 180px;
}
.boxAll .boxBottom {
	height: 130px;
}
.boxAll .boxCenter .el-col,
.boxAll .boxBottom .el-col{
	line-height: 40px;
	line-height: 40px;
	text-align: center;
	border-bottom: 1px solid #d5d5d5;
}
.boxAll .boxCenter .el-col-9 a i {
	font-size: 15px;
	margin-left: 10px;
	color: #409eff;
}
.boxAll .boxBottom .el-col-16 a{
	color: #66b1ff;
}
.boxAll .boxCenter .boxBtn,
.boxAll .boxBottom .boxBtn{
	text-align: center;
}
.boxAll .boxCenter .boxBtn .el-button,
.boxAll .boxBottom .boxBtn .el-button{
	margin-top: 10px;
}
</style>
<script>
import '@/views/earthquakeBase/aidDecision.scss';
import '../../styles/scrollbar.css';
import request from '@/utils/request';
export default {
	data() {
		return {
			featId: this.$route.query.featId,
			aidDecisionData: null,
			isLoading: true,
			pageNo: 1,
			pageSize: 10,
			count: 1
		};
	},
	methods: {
		//格式化数字进行向上取整
		getMaxInt(row,column,cellValue,index){
			let maxInt = Math.ceil(cellValue);
			return maxInt;
		},
		getList() {
			let data = { earthquakeFeatId: this.featId, pageNo: this.pageNo, pageSize: this.pageSize };
			request({ url: '/getAidDecisionByEqId', method: 'post', data: data })
				.then(res => {
					let result = res.data.result;
					this.aidDecisionData = result.list;
					this.count = result.count.count;
					this.isLoading = false;
				})
				.catch(res => {
					this.isLoading = false;
					alert(res);
				});
		},
		handleSizeChange(val) {
			this.pageSize = val;
			this.getList();
		},
		handleCurrentChange(val) {
			this.pageNo = val;
			this.getList();
		},
		goToFocusTarget() {
			this.$router.push({
				path: '/focusTarget',
				name: '重点目标查询',
				query: {
					featId: this.featId
				}
			});
		}
	},
	created() {
		this.getList();
	}
};
</script>
