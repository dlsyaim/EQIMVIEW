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
						<el-form-item label="区县名称：" prop="name">
							<el-input style="width:60%;" size="mini" placeholder="请输入区县名称" type="text" v-model="queryCondition.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="总人口：">
							<el-input style="width:40%;" size="mini" placeholder="开始人口数量" type="text" v-model="queryCondition.totalMin"></el-input>
							~
							<el-input placeholder="结束人口数量" size="mini" style="width: 40%;" type="text" v-model="queryCondition.totalMax"></el-input>
						</el-form-item>
					</el-col>
				</el-form>
				<div class="btnCenter">
					<el-button size="mini" type="primary" @click="dataQuery" icon="el-icon-search" :loading="isLoad">查询</el-button>
					<el-button size="mini" type="primary" icon="el-icon-refresh" @click="onReset">重置</el-button>
				</div>
			</div>
			<div class="tableBox">
				<h3>查询结果</h3>
				<el-table :data="tableData" v-loading="isLoad" border height="calc(100% - 100px)" width="100%">
					<el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
					<!-- <el-table-column prop="featId" label="主键" v-if="show=false"></el-table-column>  -->
					<!-- <el-table-column label="操作" align="center" width="240px"> -->
					<el-table-column prop="" label="操作" width="100" align="center"><el-button type="primary" size="mini" icon="el-icon-edit"></el-button></el-table-column>
					<el-table-column prop="name" label="区县名称" align="center"></el-table-column>
					<el-table-column prop="total" label="总人口" align="center"></el-table-column>
					<el-table-column prop="family" label="家庭户户数" align="center"></el-table-column>
					<el-table-column prop="over65" label="大于65岁人口" align="center"></el-table-column>
					<el-table-column prop="under14" label="14岁年龄人口" align="center"></el-table-column>
					<el-table-column prop="resident" label="居住本地，户口在本地人口数" width="200" align="center"></el-table-column>
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
				totalMin: null,
				totalMax: null
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
			if (this.queryCondition.totalMin != null && this.queryCondition.totalMax != null) {
				if (this.queryCondition.totalMin === this.queryCondition.totalMax) {
					this.$alert('开始数字不可等于结束数字', '提示', {
						confirmButtonText: '确定'
					});
					this.isLoad = false;
					return;
				}
				if (this.queryCondition.totalMin < this.queryCondition.totalMax) {
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
				totalMin: this.queryCondition.totalMin,
				totalMax: this.queryCondition.totalMax
			};
			request({ url: '/commonData/countyStatistics/list', method: 'post', data: pageCondition })
				.then(res => {
					this.tableData = res.data.result;
					this.isLoad = false;
				})
				.catch(function(res) {
					alert(res);
					this.isLoad = false;
				});
			request({
				url: '/commonData/countyStatistics/getCount',
				method: 'post',
				data: {
					name: this.queryCondition.name,
					totalMin: this.queryCondition.totalMin,
					totalMax: this.queryCondition.totalMax
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
				totalMin: this.queryCondition.totalMin,
				totalMax: this.queryCondition.totalMax
			};
			request({ url: '/commonData/countyStatistics/list', method: 'post', data: pageCondition })
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
			this.queryCondition.totalMin = undefined;
			this.queryCondition.totalMax = undefined;
		},
		//处理分页当前页面展示方法
		handleCurrentChange(val) {
			this.pageNo = val;
			this.isLoad = true;
			let pageCondition = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				name: this.queryCondition.name,
				totalMin: this.queryCondition.totalMin,
				totalMax: this.queryCondition.totalMax
			};
			request({ url: '/commonData/countyStatistics/list', method: 'post', data: pageCondition })
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
