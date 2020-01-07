<template>
	<div class="boxAll">
		<div class="boxCenter">
			<div class="search">
				<el-form ref="form" :model="form" label-width="130px" :inline="false">
					<h3>条件查询</h3>
					<el-col :span="12">
						<el-form-item label="编码：" prop="id">
							<el-input style="width:60%;" size="mini" placeholder="请输入编码" type="text" v-model="queryCondition.id"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="医院数量：" prop="hospital">
							<el-input style="width:40%;" size="mini" placeholder="最小医院数量" type="text" v-model="queryCondition.hospitalMin"></el-input>
							~
							<el-input placeholder="最大医院数量" style="width: 40%;" size="mini" type="text" v-model="queryCondition.hospitalMax"></el-input>
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
						<el-table-column prop="id" label="编码" align="center"></el-table-column>
						<el-table-column prop="name" label="区域名称" align="center"></el-table-column>
						<el-table-column prop="hospital" label="医院数量" align="center"></el-table-column>
						<el-table-column prop="bed" label="病床数量" align="center"></el-table-column>
						<el-table-column prop="ambulance" label="急救车辆数量" align="center"></el-table-column>
						<el-table-column prop="plasma" label="库存血浆量" align="center"></el-table-column>
						<el-table-column prop="doctor" label="医生数" align="center"></el-table-column>
						<el-table-column prop="surgeryDct" label="外科医生数" align="center"></el-table-column>
						<el-table-column prop="orthopedist" label="骨科医生数" align="center"></el-table-column>
						<el-table-column prop="anesthetist" label="麻醉科医生数" align="center"></el-table-column>
						<el-table-column prop="nurse" label="护理人员数" align="center"></el-table-column>
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
				hospitalMin: null,
				hospitalMax: null
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
			if (this.queryCondition.hospitalMin != null && this.queryCondition.hospitalMax != null) {
				if (this.queryCondition.hospitalMin === this.queryCondition.hospitalMax) {
					this.$alert('开始数字不可等于结束数字', '提示', {
						confirmButtonText: '确定'
					});
					this.isLoad = false;
					return;
				}
				if (this.queryCondition.hospitalMin < this.queryCondition.hospitalMax) {
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
				hospitalMin: this.queryCondition.hospitalMin,
				hospitalMax: this.queryCondition.hospitalMax
			};
			request({ url: '/commonData/medical/list', method: 'post', data: pageCondition })
				.then(res => {
					this.tableData = res.data.result;
					this.isLoad = false;
				})
				.catch(function(res) {
					alert(res);
					this.isLoad = false;
				});
			request({
				url: '/commonData/medical/getCount',
				method: 'post',
				data: {
					name: this.queryCondition.name,
					hospitalMin: this.queryCondition.hospitalMin,
					hospitalMax: this.queryCondition.hospitalMax
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
				hospitalMin: this.queryCondition.hospitalMin,
				hospitalMax: this.queryCondition.hospitalMax
			};
			request({ url: '/commonData/medical/list', method: 'post', data: pageCondition })
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
			this.queryCondition.hospitalMin = undefined;
			this.queryCondition.hospitalMax = undefined;
		},
		//处理分页当前页面展示方法
		handleCurrentChange(val) {
			this.pageNo = val;
			this.isLoad = true;
			let pageCondition = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				name: this.queryCondition.name,
				hospitalMin: this.queryCondition.hospitalMin,
				hospitalMax: this.queryCondition.hospitalMax
			};
			request({ url: '/commonData/medical/list', method: 'post', data: pageCondition })
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
