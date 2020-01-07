<template>
	<div class="boxAll">
		<div class="boxTabs">
			<b>人口与经济</b>
			&nbsp;&nbsp;&nbsp;|&nbsp;
			<span>
				<router-link to="/countyPersonStatistics">区县级人口统计</router-link>
				<router-link to="/townPersonStatistics">乡镇级人口统计</router-link>
				<router-link to="/economyStatistics">国民经济统计</router-link>
			</span>
		</div>
		<div class="boxCenter">
			<div class="search">
				<el-form ref="form" :model="form" label-width="120px" :inline="false">
					<h3>条件查询</h3>
					<el-col :span="12">
						<el-form-item label="行政区域名称：" prop="name">
							<el-input style="width:60%;" size="mini" placeholder="请输入行政区域名称" type="text" v-model="queryCondition.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="国内生产总值：" prop="gdp">
							<el-input style="width:40%;" size="mini" placeholder="开始生产总值" type="text" v-model="queryCondition.gdpMin"></el-input>
							~
							<el-input placeholder="结束生产总值" style="width:40%;" size="mini" type="text" v-model="queryCondition.gdpMax"></el-input>
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
					<el-table-column prop="" label="操作" width="100" align="center"><el-button type="primary" size="mini" icon="el-icon-edit"></el-button></el-table-column>
					<el-table-column prop="name" label="行政区划名称" align="center"></el-table-column>
					<el-table-column prop="gdp" label="国内生产总值" align="center"></el-table-column>
					<el-table-column prop="industryValue" label="工业总产值" align="center"></el-table-column>
					<el-table-column prop="agriValue" label="农业总产值" align="center"></el-table-column>
					<el-table-column prop="serviceValue" label="第三产业总产值" align="center"></el-table-column>
					<el-table-column prop="income" label="财政收入" align="center"></el-table-column>
					<el-table-column prop="outcome" label="财政支出" align="center"></el-table-column>
					<el-table-column prop="investment" label="全社会固定资产投资总额" align="center"></el-table-column>
					<el-table-column prop="impExp" label="外贸进出口总额" align="center"></el-table-column>
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
				gdpMin: null,
				gdpMax: null
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
			if (this.queryCondition.gdpMin != null && this.queryCondition.gdpMax != null) {
				if (this.queryCondition.gdpMin === this.queryCondition.gdpMax) {
					this.$alert('开始数字不可等于结束数字', '提示', {
						confirmButtonText: '确定'
					});
					this.isLoad = false;
					return;
				}
				if (this.queryCondition.gdpMin < this.queryCondition.gdpMax) {
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
				gdpMin: this.queryCondition.gdpMin,
				gdpMax: this.queryCondition.gdpMax
			};
			request({ url: '/commonData/nationalEconomy/list', method: 'post', data: pageCondition })
				.then(res => {
					this.tableData = res.data.result;
					this.isLoad = false;
				})
				.catch(function(res) {
					alert(res);
					this.isLoad = false;
				});
			request({
				url: '/commonData/nationalEconomy/getCount',
				method: 'post',
				data: {
					name: this.queryCondition.name,
					gdpMin: this.queryCondition.gdpMin,
					gdpMax: this.queryCondition.gdpMax
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
				gdpMin: this.queryCondition.gdpMin,
				gdpMax: this.queryCondition.gdpMax
			};
			request({ url: '/commonData/nationalEconomy/list', method: 'post', data: pageCondition })
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
			this.queryCondition.gdpMin = undefined;
			this.queryCondition.gdpMax = undefined;
		},
		//处理分页当前页面展示方法
		handleCurrentChange(val) {
			this.pageNo = val;
			this.isLoad = true;
			let pageCondition = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				name: this.queryCondition.name,
				gdpMin: this.queryCondition.gdpMin,
				gdpMax: this.queryCondition.gdpMax
			};
			request({ url: '/commonData/nationalEconomy/list', method: 'post', data: pageCondition })
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
