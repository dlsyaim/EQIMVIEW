<template>
	<div class="boxAll">
		<div class="boxTabs">
			<b>房屋</b>
			&nbsp;&nbsp;&nbsp;|&nbsp;
			<span>
				<router-link to="/cityBuilding">城市房屋总体统计</router-link>
				<router-link to="/townBuilding">乡镇房屋统计</router-link>
			</span>
		</div>
		<div class="boxCenter">
			<div class="search">
				<el-form ref="form" :model="form" label-width="120px" :inline="false">
					<h3>条件查询</h3>
					<el-col :span="12">
						<el-form-item label="城市名称：" prop="name">
							<el-input style="width:60%;" size="mini" placeholder="请输入城市名称" type="text" v-model="queryCondition.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="房屋总面积：" prop="totalArea">
							<el-input style="width:40%;" size="mini" placeholder="最小房屋面积" type="text" v-model="queryCondition.totalAreaMin"></el-input>
							~
							<el-input placeholder="最大房屋面积" style="width: 40%;" size="mini" type="text" v-model="queryCondition.totalAreaMax"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="人均居住面积：" prop="average">
							<el-input style="width:40%;" placeholder="最小人均居住面积" size="mini" type="text" v-model="queryCondition.averageMin"></el-input>
							~
							<el-input placeholder="最大人均居住面积" style="width: 40%;" size="mini" type="text" v-model="queryCondition.averageMax"></el-input>
						</el-form-item>
					</el-col>
				</el-form>
				<div class="btnCenter">
					<el-button type="primary" size="mini" @click="dataQuery" icon="el-icon-search" :loading="isLoad">查询</el-button>
					<el-button type="primary" size="mini" icon="el-icon-refresh" @click="onReset">重置</el-button>
				</div>
			</div>
			<div class="tableBox">
				<h3>查询结果</h3>
				<el-table :data="tableData" v-loading="isLoad" border height="calc(100% - 100px)" width="100%">
					<el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
					<!-- <el-table-column prop="featId" label="主键" v-if="show=false"></el-table-column>  -->
					<!-- <el-table-column label="操作" align="center" width="240px"> -->
					<el-table-column prop="" label="操作" width="100" align="center"><el-button type="primary" size="mini" icon="el-icon-edit"></el-button></el-table-column>
					<el-table-column prop="name" label="城市名称" align="center"></el-table-column>
					<el-table-column prop="totalArea" label="房屋总面积" align="center"></el-table-column>
					<el-table-column prop="average" label="人均居住面积" align="center"></el-table-column>
					<el-table-column prop="highRise" label="高层建筑面积" align="center"></el-table-column>
					<el-table-column prop="highRisePrice" label="高层建筑单位面积平均造价" align="center"></el-table-column>
					<el-table-column prop="highRiseProperty" label="高层建筑单位面积平均室内财产价值" align="center"></el-table-column>
					<el-table-column prop="rcframe" label="多层钢筋混凝土房屋面积" align="center"></el-table-column>
					<el-table-column prop="rcframePrice" label="多层钢筋混凝土房屋单位面积平均造价" align="center"></el-table-column>
					<el-table-column prop="rcframeProperty" label="多层钢筋混凝土房屋单位面积平均室内财产价值" align="center"></el-table-column>
					<el-table-column prop="brickStructure" label="多层砌体房屋面积" align="center"></el-table-column>
					<el-table-column prop="brickPrice" label="多层砌体房屋单位面积平均造价" align="center"></el-table-column>
					<el-table-column prop="brickProperty" label="多层砌体房屋单位面积平均室内财产价值" align="center"></el-table-column>
					<el-table-column prop="singleArea" label="单层民宅面积" align="center"></el-table-column>
					<el-table-column prop="singlePrice" label="单层民宅平均造价" align="center"></el-table-column>
					<el-table-column prop="singleProperty" label="单层民宅平均室内财产价值" align="center"></el-table-column>
					<el-table-column prop="otherStructure" label="其他类别面积" align="center"></el-table-column>
					<el-table-column prop="otherPrice" label="其他类别单位面积平均造价" align="center"></el-table-column>
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
			</div>
		</div>
	</div>
</template>
<script>
import '../../../styles/comment.css';	
import request from '@/utils/request';
export default {
	data() {
		return {
			queryCondition: {
				name: null,
				totalAreaMin: null,
				totalAreaMax: null,
				averageMin: null,
				averageMax: null
			},
			pageNo: 1,
			pageSize: 10,
			count: null,
			isLoad: false,
			tableData: null,
			PK: null
		};
	},
	methods: {
		// 模糊查询方法
		dataQuery() {
			this.isLoad = true;
			if (this.queryCondition.totalAreaMin != null && this.queryCondition.totalAreaMax != null) {
				if (this.queryCondition.totalAreaMin === this.queryCondition.totalAreaMax) {
					this.$alert('开始数字不可等于结束数字', '提示', {
						confirmButtonText: '确定'
					});
					this.isLoad = false;
					return;
				}
				if (this.queryCondition.totalAreaMin < this.queryCondition.totalAreaMax) {
					this.$alert('开始数字不可大于结束数字', '提示', {
						confirmButtonText: '确定'
					});
					this.isLoad = false;
					return;
				}
			}
			if (this.queryCondition.averageMin != null && this.queryCondition.averageMax != null) {
				if (this.queryCondition.averageMin === this.queryCondition.averageMax) {
					this.$alert('开始数字不可等于结束数字', '提示', {
						confirmButtonText: '确定'
					});
					this.isLoad = false;
					return;
				}
				if (this.queryCondition.averageMin < this.queryCondition.averageMax) {
					this.$alert('开始数字不可大于结束数字', '提示', {
						confirmButtonText: '确定'
					});
					this.isLoad = false;
					return;
				}
			}
			let pageCondition = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				name: this.queryCondition.name,
				totalAreaMin: this.queryCondition.totalAreaMin,
				totalAreaMax: this.queryCondition.totalAreaMax,
				averageMin: this.queryCondition.averageMin,
				averageMax: this.queryCondition.averageMax
			};
			request({ url: '/commonData/cityBuilding/list', method: 'post', data: pageCondition })
				.then(res => {
					this.tableData = res.data.result;
					this.isLoad = false;
				})
				.catch(function(res) {
					alert(res);
					this.isLoad = false;
				});
			request({
				url: '/commonData/cityBuilding/getCount',
				method: 'post',
				data: {
					name: this.queryCondition.name,
					totalAreaMin: this.queryCondition.totalAreaMin,
					totalAreaMax: this.queryCondition.totalAreaMax,
					averageMin: this.queryCondition.averageMin,
					averageMax: this.queryCondition.averageMax
				}
			})
				.then(response => {
					let data = response.data.result;
					this.count = data.count.count;
				})
				.catch(response => {
					alert(response);
				});
		},
		//处理分页大小页面数据加载方法
		handleSizeChange(val) {
			this.pageSize = val;
			this.isLoad = true;
			let pageCondition = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				name: this.queryCondition.name,
				totalAreaMin: this.queryCondition.totalAreaMin,
				totalAreaMax: this.queryCondition.totalAreaMax,
				averageMin: this.queryCondition.averageMin,
				averageMax: this.queryCondition.averageMax
			};
			request({ url: '/commonData/cityBuilding/list', method: 'post', data: pageCondition })
				.then(res => {
					this.tableData = res.data.result;
					this.isLoad = false;
				})
				.catch(function(res) {
					alert(res);
					this.isLoad = false;
				});
		},
		//搜索框重置方法
		onReset() {
			this.queryCondition.name = undefined;
			this.queryCondition.totalAreaMin = undefined;
			this.queryCondition.totalAreaMax = undefined;
			this.queryCondition.averageMin = undefined;
			this.queryCondition.averageMax = undefined;
		},
		//处理分页当前页面展示方法
		handleCurrentChange(val) {
			this.pageNo = val;
			this.isLoad = true;
			let pageCondition = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				name: this.queryCondition.name,
				totalAreaMin: this.queryCondition.totalAreaMin,
				totalAreaMax: this.queryCondition.totalAreaMax,
				averageMin: this.queryCondition.averageMin,
				averageMax: this.queryCondition.averageMax
			};
			request({ url: '/commonData/cityBuilding/list', method: 'post', data: pageCondition })
				.then(res => {
					this.tableData = res.data.result;
					this.isLoad = false;
				})
				.catch(function(res) {
					alert(res);
					this.isLoad = false;
				});
		}
	},
	//页面最初数据加载请求函数
	created: function() {
		this.dataQuery();
	}
};
</script>
