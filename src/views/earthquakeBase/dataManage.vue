<template>
	<div class="boxAll">
		<div class="boxCenter">
			<div class="search">
				<el-form label-width="130px" :inline="false" ref="queryCondition" :model="queryCondition">
					<h3>条件查询</h3>
					<el-row>
						<el-col :span="8">
							<el-form-item label="地震名称：" prop="earhtquakeName">
								<el-input placeholder="模糊查询" type="text" size="mini" v-model="queryCondition.earthquakeName" @input="changeEvent"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="开始时间：" prop="earthquakeStartTime">
								<el-date-picker
									type="date"
									placeholder="开始时间"
									style="width: 40%;"
									size="mini"
									v-model="queryCondition.earthquakeStartTime"
									value-format="yyyy-MM-dd HH:mm:ss"
								></el-date-picker>
								~
								<el-date-picker
									placeholder="结束时间"
									style="width: 40%;"
									size="mini"
									v-model="queryCondition.earthquakeEndTime"
									value-format="yyyy-MM-dd HH:mm:ss"
								></el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label="地震震级：" prop="level">
								<el-input
								v-model="queryCondition.level"
								placeholder="请输入地震震级"
								type="text" 
								size="mini"
								>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="地震深度：" prop="depth">
								<el-input
								v-model="queryCondition.depth"
								placeholder="请输入地震深度"
								type="text" 
								size="mini"
								>
								</el-input>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item label="断层名称：" prop="fName">
								<el-select v-model="queryCondition.fName" placeholder="全部" size="mini">
									<el-option v-for="item in queryCondition.faultName" :key="item.faultName" :label="item.faultName" :value="item.faultName"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">
							<el-form-item label="地震来源：" prop="dSource">
								<el-select v-model="queryCondition.dSource" placeholder="全部" size="mini">
									<el-option v-for="item in queryCondition.dataSource" :key="item.datasource" :label="item.dataSource" :value="item.dataSource"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<div class="btnCenter">
					<el-button type="primary" size="mini" @click="onSubmit" icon="el-icon-search" :loading="isLoad">查询</el-button>
					<el-button type="primary" size="mini" icon="el-icon-refresh" @click="clearFields('queryCondition')">重置</el-button>
				</div>
			</div>
			<div class="tableBox">
				<h3>查询结果</h3>
				<el-table :data="tableData" v-loading="isLoad" @cell-mouse-enter="getRowDatas" border height="calc(100% - 180px)" style="width: 100%">
					<el-table-column label="序号" type="index" align="center"></el-table-column>
					<el-table-column prop="featid" label="主键" v-if="(show = false)"></el-table-column>
					<el-table-column label="操作" align="center" width="240px">
						<el-button size="small" @click="goToDetail">详情</el-button>
						<el-button size="small">删除</el-button>
						<el-button size="small">编辑</el-button>
					</el-table-column>
					<el-table-column prop="dataSource" label="数据来源" align="center"></el-table-column>
					<el-table-column prop="earthquakeName" label="地震名称" align="center"></el-table-column>
					<el-table-column prop="earthquakeTime" label="地震时间" align="center"></el-table-column>
					<el-table-column prop="triggerTime" label="触发时间" align="center"></el-table-column>
					<el-table-column prop="finishTime" label="完成时间" align="center"></el-table-column>
					<el-table-column prop="earthquakeLevel" label="地震等级" align="center"></el-table-column>
					<el-table-column prop="earthquakeLocation" label="地震位置" align="center"></el-table-column>
					<el-table-column prop="longitude" label="经度" align="center"></el-table-column>
					<el-table-column prop="latitude" label="纬度" align="center"></el-table-column>
					<el-table-column prop="focalDepth" label="震源深度" align="center"></el-table-column>
					<el-table-column prop="faultName" label="断层名称" align="center"></el-table-column>
					<el-table-column prop="reptureDirection" label="破裂方向" align="center"></el-table-column>
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
<style scoped="scoped">
.boxAll .boxCenter .search {
	height: 270px;
}

.boxAll .boxCenter .tableBox {
	height: calc(100vh - 315px);
}

</style>
<script>
import '@/views/earthquakeBase/dataManage.scss';
import request from '@/utils/request';
import '../../styles/comment.css'
export default {
	inject:['reload'],
	data() {
		return {
			queryCondition: {
				earthquakeName: '',
				earthquakeStartTime: '',
				earthquakeEndTime: '',
				level: '',
				depth: '',
				fName: '',
				dSource: '',
				earthquakeLevel: [],
				focalDepth: [],
				faultName: [],
				dataSource: []
			},
			pageNo: 1,
			pageSize: 10,
			count: null,
			isLoad: false,
			tableData: null,
			PK: null,
			batchNum:null,
			x:null,
			y:null
		};
	},
	methods: {
		onSubmit() {
			this.isLoad = true;
			if (this.queryCondition.earthquakeStartTime && this.queryCondition.earthquakeEndTime) {
				if (this.queryCondition.earthquakeStartTime === this.queryCondition.earthquakeEndTime) {
					this.$alert('开始时间不可等于结束时间', '提示', {
						confirmButtonText: '确定'
					});
					this.isLoad = false;
					return;
				}
				if (this.queryCondition.earthquakeStartTime > this.queryCondition.earthquakeEndTime) {
					this.$alert('开始时间不可大于结束时间', '提示', {
						confirmButtonText: '确定'
					});
					this.isLoad = false;
					return;
				}
			}
			let pageCondition = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				earthquakeName: this.queryCondition.earthquakeName,
				startTime: this.queryCondition.earthquakeStartTime,
				endTime: this.queryCondition.earthquakeEndTime,
				earthquakeLevel: this.queryCondition.level,
				focalDepth: this.queryCondition.depth,
				faultName: this.queryCondition.fName,
				dataSource: this.queryCondition.dSource
			};
			request({ url: '/getEQdataList', method: 'post', data: pageCondition })
				.then(res => {
					this.tableData = res.data.result.list;
					this.count = res.data.result.count.count;
					this.isLoad = false;
				})
				.catch(function(res) {
					console.log(res);
					this.isLoad = false;
				});
		},
		clearFields(formName) {
			this.$refs[formName].resetFields();
			if (this.queryCondition.earthquakeName) {
				this.queryCondition.earthquakeName = null;
			}
			if(this.queryCondition.earthquakeEndTime){
				this.queryCondition.earthquakeEndTime = null;
			}
		},
		handleSizeChange(val) {
			this.pageSize = val;
			this.isLoad = true;
			let pageCondition = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				earthquakeName: this.queryCondition.earthquakeName,
				startTime: this.queryCondition.earthquakeStartTime,
				endTime: this.queryCondition.earthquakeEndTime,
				earthquakeLevel: this.queryCondition.level,
				focalDepth: this.queryCondition.depth,
				faultName: this.queryCondition.fName,
				dataSource: this.queryCondition.dSource
			};
			request({ url: '/getEQdataList', method: 'post', data: pageCondition })
				.then(res => {
					this.tableData = res.data.result.list;
					this.count = res.data.result.count.count;
					this.isLoad = false;
				})
				.catch(function(res) {
					console.log(res);
					this.isLoad = false;
				});
		},
		handleCurrentChange(val) {
			this.pageNo = val;
			this.isLoad = true;
			let pageCondition = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				earthquakeName: this.queryCondition.earthquakeName,
				startTime: this.queryCondition.earthquakeStartTime,
				endTime: this.queryCondition.earthquakeEndTime,
				earthquakeLevel: this.queryCondition.level,
				focalDepth: this.queryCondition.depth,
				faultName: this.queryCondition.fName,
				dataSource: this.queryCondition.dSource
			};
			request({ url: '/getEQdataList', method: 'post', data: pageCondition })
				.then(res => {
					this.tableData = res.data.result.list;
					this.count = res.data.result.count.count;
					this.isLoad = false;
				})
				.catch(function(res) {
					console.log(res);
					this.isLoad = false;
				});
		},
		changeEvent(val) {
			this.queryCondition.earthquakeName = val;
		},
		getRowDatas(row) {
			this.PK = row.featid;
			this.batchNum =row.batchNumber;
			this.x = row.longitude;
      		this.y = row.latitude;
		},

		getMapShow(){
			var id = this.PK;
			var batch = this.batchNum;
			var x = this.x;
			var y = this.y;	
			var mainMap = window.frames["mapFrame"].window;
			if(id != null && batch !=null && batch != 0){
				mainMap.getMainViewer().showEarthquakeIntensityGeo(
					{
						id: id,
						batch: batch,
						x: x,
						y: y
					});
			}else{
				this.reload();
			}
		},
		goToDetail() {
			// this.getMapShow();
			this.$router.push({
				path: 'earthquakeBase/dataManageDetail',
				name: '地震详情',
				query: {
					featId: this.PK
				}
			});
		}
	},
	created: function() {
		this.isLoad = true;
		request({
			url: '/getEQdataList',
			method: 'post',
			data: {
				pageNo: this.pageNo,
				pageSize: this.pageSize
			}
		})
			.then(res => {
				this.tableData = res.data.result.list;
				this.count = res.data.result.count.count;
				this.isLoad = false;
			})
			.catch(function(res) {
				console.log(res);
				this.isLoad = false;
			});
	},
	mounted() {
		request({ url: '/getQueryList', method: 'get' })
			.then(response => {
				let data = response.data.result;
				this.queryCondition.earthquakeLevel = data.earthquakeLevel.filter(item =>{
					if(item == '' || item == null){
						return;
					}else{
						return item;
					}
				});
				this.queryCondition.focalDepth = data.focalDepth.filter(item =>{
					if(item == '' || item == null){
						return;
					}else{
						return item;
					}
				});
				this.queryCondition.faultName = data.faultName.filter(item =>{
					if(item == '' || item == null){
						return;
					}else{
						return item;
					}
				});
				this.queryCondition.dataSource = data.dataSource.filter(item =>{
					if(item == '' || item == null){
						return;
					}else{
						return item;
					}
				});
				//console.log(this.queryCondition.focalDepth);
			})
			.catch(response => {
				console.log(response);
			});
	}
};
</script>
