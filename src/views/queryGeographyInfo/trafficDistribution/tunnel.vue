<template>
	<div class="boxAll">
		<div class="boxTabs">
			<b>交通分布</b>
			&nbsp;&nbsp;&nbsp;|&nbsp;
			<span>
				<router-link to="/queryGeographyInfo/trafficDistribution/airport">机场</router-link>
				<router-link to="/queryGeographyInfo/trafficDistribution/road">道路</router-link>
				<router-link to="/queryGeographyInfo/trafficDistribution/railway">铁路</router-link>
				<router-link to="/queryGeographyInfo/trafficDistribution/waterway">水道</router-link>
				<router-link to="/queryGeographyInfo/trafficDistribution/bridge">桥梁</router-link>
				<router-link to="/queryGeographyInfo/trafficDistribution/tunnel">隧道</router-link>
				<router-link to="/queryGeographyInfo/trafficDistribution/harbor">港口、码头</router-link>
				<router-link to="/queryGeographyInfo/trafficDistribution/metroline">地铁线路</router-link>
				<router-link to="/queryGeographyInfo/trafficDistribution/metrostation">地铁站</router-link>
			</span>
		</div>
		<div class="boxCenter">
			<div class="search">
				<el-form ref="form" :model="form" label-width="120px" :inline="false">
					<h3>条件查询</h3>
					<el-col :span="12">
						<el-form-item label="隧道名称："><el-input v-model="form.tunnelName" size="mini" style="width: 60%;"></el-input></el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="隧道类别：">
							<el-select v-model="form.tunnelClass" placeholder="请选择" size="mini" style="width: 60%;">
								<el-option v-for="item in form.tunnelClassList" :key="item.tunnelClass" :label="item.tunnelClass" :value="item.tunnelClass"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="隧道等级：">
							<el-select v-model="form.tunnelGrade" placeholder="请选择" size="mini" style="width: 60%;">
								<el-option v-for="item in form.tunnelGradeList" :key="item.tunnelGrade" :label="item.tunnelGrade" :value="item.tunnelGrade"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="抗震设防烈度："><el-input v-model="form.tunnelIntensity" size="mini" style="width: 60%;"></el-input></el-form-item>
					</el-col>
				</el-form>
				<div class="btnCenter">
					<el-button type="primary" size="mini" @click="doSearch" icon="el-icon-search">查询</el-button>
					<el-button type="primary" size="mini" icon="el-icon-refresh" @click="resetData">重置</el-button>
				</div>
			</div>
			<div class="tableBox">
				<h3>查询结果</h3>
				<el-table :data="tableData" v-loading="isLoad" border height="calc(100% - 100px)"  style="width: 100%">
					<el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
					<el-table-column prop="" label="操作" width="100" align="center"><el-button type="primary" size="mini" icon="el-icon-edit"></el-button></el-table-column>
					<el-table-column prop="tunnelName" label="隧道名称"   align="center"></el-table-column>
					<el-table-column prop="tunnelClass" label="隧道类别"   align="center"></el-table-column>
					<el-table-column prop="location" label="所在位置"   align="center"></el-table-column>
					<el-table-column prop="tunnelGrade" label="隧道等级"   align="center"></el-table-column>
					<el-table-column prop="tunnelLength" label="隧道长度"   align="center"></el-table-column>
					<el-table-column prop="tunnelWidth" label="隧道宽度"   align="center"></el-table-column>
					<el-table-column prop="tunnelHeight" label="最大允许通过高度"   align="center"></el-table-column>
					<el-table-column prop="numberLine" label="是否复线隧道"   align="center"></el-table-column>
					<el-table-column prop="tunnelIntensity" label="抗震设防烈度"   align="center"></el-table-column>
					<el-table-column prop="builtEra" label="建造年代"  align="center"></el-table-column>
					<el-table-column prop="tunnelNote" label="隧道简介" width="350" align="center"></el-table-column>
				</el-table>
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pageNo"
					:page-sizes="[10, 20, 30, 40]"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
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
			//表单参数
			form: {
				//隧道名称
				tunnelName: '',
				//隧道类别
				tunnelClass: '',
				//隧道类别列表
				tunnelClassList: [],
				//隧道等级
				tunnelGrade: '',
				//隧道等级列表
				bridgeGradeList: '',
				//隧道抗震设防烈度
				tunnelIntensity: ''
			},
			isLoad: true,
			tableData: null,
			pageNo: 1,
			pageSize: 10,
			count: 0
		};
	},
	methods: {
		commonPart() {
			//获取桥梁相关数据
			let params = {
				tunnelName: this.form.tunnelName,
				tunnelClass: this.form.tunnelClass,
				tunnelGrade: this.form.tunnelGrade,
				tunnelIntensity: this.form.tunnelIntensity,
				pageNo: this.pageNo,
				pageSize: this.pageSize
			};
			request({ url: '/getTunnelClassListAndGradeListAndCountAndList', method: 'post', data: params }).then(res => {
				let data = res.data.result;
				console.log(data);
				this.tableData = data.list;
				this.count = data.count;
				this.form.tunnelClassList = data.tunnelClassList;
				this.form.tunnelGradeList = data.tunnelGradeList;
				this.isLoad = false;
			});
		},
		//重置数据
		resetData() {
			this.form.tunnelName = null;
			this.form.tunnelClass = null;
			this.form.tunnelGrade = null;
			this.form.tunnelIntensity = null;
		},
		//查询
		doSearch() {
			this.pageNo = 1;
			this.pageSize = 10;
			this.commonPart();
		},
		//改变pageSize时做翻页操作
		handleSizeChange(pageSize) {
			this.pageSize = pageSize;
			this.commonPart();
		},
		//改变pageNo时做翻页操作
		handleCurrentChange(pageNo) {
			this.pageNo = pageNo;
			this.commonPart();
		}
	},
	created() {
		this.commonPart();
	}
};
</script>
