<template>
	<div class="boxAll">
		<div class="boxTop">
			<h3>死亡人数-尹之潜</h3>
			<h4>【模型公式】</h4>
			<img :src="img" />
			<h4>【参数说明】</h4>
			<p>Rd--评估区域内地震死亡率；Nd--评估区域内地震死亡人数；</p>
			<p>A--评估区域内房屋毁坏比；M--评估区域内总人口数；</p>
		</div>

		<div class="boxTables">
			<div class="boxBtn">
				<el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="openAddModel">添加</el-button>
				<!-- <el-button :loading="downloadLoading" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button> -->
			</div>
			<el-table :data="deathModelData" v-loading="isLoad" @cell-mouse-enter="getRowDatas" border height="calc(100% - 90px)">
				<el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
				<el-table-column prop="featId" label="主键" v-if="(show = false)" align="center"></el-table-column>
				<el-table-column prop="paramName" label="参数名称" align="center"></el-table-column>
				<el-table-column prop="l0" label="L0" align="center"></el-table-column>
				<el-table-column prop="l1" label="L1" align="center"></el-table-column>
				<el-table-column prop="l2" label="L2" align="center"></el-table-column>
				<!-- <el-table-column prop="defaultStatus" label="defaultStatus"></el-table-column> -->
				<el-table-column label="操作" align="center" width="240px">
					<el-button @click="settingDefault" icon="el-icon-setting" size="mini">计算</el-button>
					<el-button size="mini" icon="el-icon-delete" @click="deleteDeathData">删除</el-button>
				</el-table-column>
			</el-table>
			<div class="block" align="left">
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
		<el-dialog title="添加模型" :visible.sync="centerDialogVisible" width="30%" center>
			<el-form style="width:100%;height:200px;">
				<el-col :span="12">
					<el-form-item label="模型名称:" label-width="20px;"><el-input type="text" v-model="deathModel.paramName" size="mini"></el-input></el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="参数l0:" label-width="20px;"><el-input type="text" v-model="deathModel.l0" size="mini"></el-input></el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="参数l1:" label-width="20px;"><el-input type="text" v-model="deathModel.l1" size="mini"></el-input></el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="参数l2:" label-width="20px;"><el-input type="text" v-model="deathModel.l2" size="mini"></el-input></el-form-item>
				</el-col>
			</el-form>
			<el-button size="mini" type="primary" icon="el-icon-check" style="margin-left:40%;" @click="addDeathModel">保存</el-button>
		</el-dialog>
	</div>
</template>
<script>
import '../../../styles/scrollbar.css';	
import request from '@/utils/request';
export default {
	data() {
		return {
			img: require('./model3Formula.png'),
			centerDialogVisible: false,
			isLoad: false,
			deathModelData: null,
			featId: null,
			pageNo: 1,
			pageSize: 10,
			count: null,
			downloadLoading: false,
			deathModel: {
				paramName: null,
				l0: null,
				l1: null,
				l2: null
			}
		};
	},
	methods: {
		getList() {
			this.isLoad = true;
			request({
				url: '/listDeath',
				method: 'post',
				data: {
					pageNo: this.pageNo,
					pageSize: this.pageSize
				}
			})
				.then(res => {
					this.deathModelData = res.data.result;
					this.isLoad = false;
				})
				.catch(function(res) {
					alert(res);
					this.isLoad = false;
				});
			request({ url: '/listDeathModelCount', method: 'post' })
				.then(response => {
					let data = response.data.result;
					this.count = data.count.count;
				})
				.catch(response => {
					alert(response);
				});
		},

		// handleDownload() {
		//   this.downloadLoading = true
		//   import('@/vendor/Export2Excel').then(excel => {
		//     const tHeader = ['模型名称', '参数L0', '参数L1', '参数L2']
		//     const filterVal = ['paramName', 'l0', 'l1', 'l2']
		//     const data = this.formatJson(filterVal, this.deathModelData)
		//     excel.export_json_to_excel({
		//       header: tHeader,
		//       data,
		//       filename: 'table-list'
		//     })
		//     this.downloadLoading = false
		//   })
		// },
		//  formatJson(filterVal, jsonData) {
		//     return jsonData.map(v => filterVal.map(j => v[j]))
		//   },

		openAddModel() {
			this.centerDialogVisible = true;
		},
		addDeathModel() {
			var addDeath = this.deathModel;
			request({
				url: '/addDeathModel',
				method: 'post',
				data: addDeath
			})
				.then(response => {
					const result = response.data;
					if (result.success == true) {
						this.$message({
							type: 'success',
							message: '增加成功!',
							centerDialogVisible: false,
							created: true
						});
						this.getList();
					}
				})
				.catch(response => {
					alert(response);
				});
		},
		getRowDatas(row) {
			this.featId = row.featId;
		},

		deleteDeathData() {
			if (this.deathModelData.length > 0) {
				this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
					.then(() => {
						request({
							url: '/deleteDeathPerson',
							method: 'post',
							data: { featId: this.featId }
						});
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getList();
					})
					.catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
			}
		},
		settingDefault() {
			alert(this.featId);
			request({
				url: '/getResultByFeatId',
				method: 'post',
				data: { featId: this.featId }
			});
		},
		handleSizeChange(val) {
			this.pageSize = val;
			this.isLoad = true;
			let pageCondition = {
				pageNo: this.pageNo,
				pageSize: this.pageSize
			};
			request({ url: '/listDeath', method: 'post', data: pageCondition })
				.then(res => {
					this.deathModelData = res.data.result;
					this.isLoad = false;
				})
				.catch(function(res) {
					alert(res);
					this.isLoad = false;
				});
		},
		handleCurrentChange(val) {
			this.pageNo = val;
			this.isLoad = true;
			let pageCondition = {
				pageNo: this.pageNo,
				pageSize: this.pageSize
			};
			request({ url: '/listDeath', method: 'post', data: pageCondition })
				.then(res => {
					this.deathModelData = res.data.result;
					this.isLoad = false;
				})
				.catch(function(res) {
					alert(res);
					this.isLoad = false;
				});
		}
	},
	//页面最初数据加载请求函数
	created() {
		this.getList();
	}
};
</script>
<style scoped="scoped">
* {
	box-sizing: border-box;
}
.boxAll {
	width: 100%;
	height: 100%;
	background: rgb(242, 242, 242);
	overflow: hidden;
}
.boxAll .boxTop {
	width: 100%;
	height: 240px;
	background: #ffffff;
	padding: 10px 15px;
	margin: 10px;
}
.boxAll .boxTop h3 {
	font-size: 16px;
	font-weight: normal;
	line-height: 30px;
}
.boxAll .boxTop h4 {
	font-size: 15px;
	font-weight: normal;
	line-height: 30px;
}
.boxAll .boxTop p {
	line-height: 30px;
}
.boxAll .boxTop img {
	height: 50px;
	margin: 10px 0;
}
.boxAll .boxTables {
	width: 100%;
	height: calc(100% - 230px);
	margin: 0 10px;
}
.boxAll .boxTables .boxBtn {
	text-align: right;
	background: #ffffff;
	padding-right: 20px;
}
.boxAll .boxTables .block {
	background: #ffffff;
}
</style>
