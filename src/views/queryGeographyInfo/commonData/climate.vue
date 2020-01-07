<template>
	<div class="boxAll">
		<div class="boxCenter">
			<div class="search">
				<el-form ref="form" :model="form" label-width="130px" :inline="false">
					<h3>条件查询</h3>
					<el-col :span="12">
						<el-form-item label="行政区名称：" prop="name">
							<el-input style="width:60%;" size="mini" placeholder="请输入行政区名称" type="text" v-model="queryCondition.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="月份：" prop="month">
							<el-input style="width:60%;" size="mini" placeholder="请输入月份" type="text" v-model="queryCondition.month"></el-input>
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
					<el-table :data="tableData" v-loading="isLoad" border height="calc(100% - 65px)" width="100%">
						<el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
						<!-- <el-table-column prop="featId" label="主键" v-if="show=false"></el-table-column>  -->
						<!-- <el-table-column label="操作" align="center" width="240px"> -->
						<el-table-column prop="" label="操作" width="100" align="center"><el-button type="primary" size="mini" icon="el-icon-edit"></el-button></el-table-column>
						<el-table-column prop="name" label="行政区名称"   align="center"></el-table-column>
						<el-table-column prop="month" label="月份"   align="center"></el-table-column>
						<el-table-column prop="avPrec" label="平均降水量"   align="center"></el-table-column>
						<el-table-column prop="hPrec" label="最高降水量"   align="center"></el-table-column>
						<el-table-column prop="lPrec" label="最低降水量"   align="center"></el-table-column>
						<el-table-column prop="avtemp" label="平均温度"   align="center"></el-table-column>
						<el-table-column prop="hTemp" label="最高温度"   align="center"></el-table-column>
						<el-table-column prop="lTemp" label="最低温度"   align="center"></el-table-column>
						<el-table-column prop="avWinddir" label="平均风向"   align="center"></el-table-column>
						<el-table-column prop="avWindgrade" label="平均风力"   align="center"></el-table-column>
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
				month: null
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
				name: this.queryCondition.name,
				month: this.queryCondition.month
			};
			request({ url: '/commonData/climate/list', method: 'post', data: pageCondition })
				.then(res => {
					this.tableData = res.data.result;
					this.isLoad = false;
				})
				.catch(function(res) {
					alert(res);
					this.isLoad = false;
				});
			request({
				url: '/commonData/climate/getCount',
				method: 'post',
				data: {
					name: this.queryCondition.name,
					month: this.queryCondition.month
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
				month: this.queryCondition.month
			};
			request({ url: '/commonData/climate/list', method: 'post', data: pageCondition })
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
			this.queryCondition.month = undefined;
		},
		//处理分页当前页面展示方法
		handleCurrentChange(val) {
			this.pageNo = val;
			this.isLoad = true;
			let pageCondition = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				name: this.queryCondition.name,
				month: this.queryCondition.month
			};
			request({ url: '/commonData/climate/list', method: 'post', data: pageCondition })
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
