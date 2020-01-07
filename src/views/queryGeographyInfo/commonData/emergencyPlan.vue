<template>
	<div class="boxAll">
		<div class="boxCenter">
			<div class="search">
				<el-form ref="form" :model="form" label-width="130px" :inline="false">
					<h3>条件查询</h3>
					<el-col :span="12">
						<el-form-item label="行政区名称：" prop="fullName">
							<el-input style="width:60%;" size="mini" placeholder="请输入行政区名称" type="text" v-model="queryCondition.fullName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="预案名称：" prop="unitname">
							<el-input style="width:60%;" size="mini" placeholder="请输入预案名称" type="text" v-model="queryCondition.unitname"></el-input>
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
				<el-table :data="tableData" v-loading="isLoad" border height="calc(100% - 65px)" style="width: 100%">
					<el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
					<!-- <el-table-column prop="featId" label="主键" v-if="show=false"></el-table-column>  -->
					<!-- <el-table-column label="操作" align="center" width="240px"> -->
					<el-table-column prop="" label="操作" width="100" align="center"><el-button type="primary" size="mini" icon="el-icon-edit"></el-button></el-table-column>
					<el-table-column prop="fullName" label="行政区名称全称" align="center"></el-table-column>
					<el-table-column prop="unitname" label="预案单位名称" align="center"></el-table-column>
					<el-table-column prop="department" label="部门" align="center"></el-table-column>
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
				fullName: null,
				unitname: null
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
			let pageCondition = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				fullName: this.queryCondition.fullName,
				unitname: this.queryCondition.unitname
			};
			request({ url: '/commonData/emergencyPlan/list', method: 'post', data: pageCondition })
				.then(res => {
					this.tableData = res.data.result.data;
					this.isLoad = false;
				})
				.catch(function(res) {
					alert(res);
					this.isLoad = false;
				});
			request({
				url: '/commonData/emergencyPlan/getCount',
				method: 'post',
				data: {
					fullName: this.queryCondition.fullName,
					unitname: this.queryCondition.unitname
				}
			})
				.then(response => {
					this.tableData = response.data.result.data;
					this.count = response.data.result.count.count;
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
				fullName: this.queryCondition.fullName,
				unitname: this.queryCondition.unitname
			};
			request({ url: '/commonData/emergencyPlan/list', method: 'post', data: pageCondition })
				.then(res => {
					this.tableData = res.data.result.data;
					this.isLoad = false;
				})
				.catch(function(res) {
					alert(res);
					this.isLoad = false;
				});
		},
		//搜索框重置方法
		onReset() {
			this.queryCondition.fullName = undefined;
			this.queryCondition.unitname = undefined;
		},
		//处理分页当前页面展示方法
		handleCurrentChange(val) {
			this.pageNo = val;
			this.isLoad = true;
			let pageCondition = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				fullName: this.queryCondition.fullName,
				unitname: this.queryCondition.unitname
			};
			request({ url: '/commonData/emergencyPlan/list', method: 'post', data: pageCondition })
				.then(res => {
					this.tableData = res.data.result.data;
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
