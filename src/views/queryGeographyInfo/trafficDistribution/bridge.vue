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
					<el-col :span="6">
						<el-form-item label="桥梁名称："><el-input v-model="form.bridgeName" size="mini"></el-input></el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="桥梁类别：">
							<el-select v-model="form.bridgeClass" placeholder="请选择" size="mini">
								<el-option v-for="item in form.bridgeClassList" :key="item.bridgeClass" :label="item.bridgeClass" :value="item.bridgeClass"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="桥梁等级：">
							<el-select v-model="form.bridgeGrade" placeholder="请选择" size="mini">
								<el-option v-for="item in form.bridgeGradeList" :key="item.bridgeGrade" :label="item.bridgeGrade" :value="item.bridgeGrade"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="抗震设防烈度："><el-input v-model="form.bridgeIntensity" size="mini"></el-input></el-form-item>
					</el-col>
				</el-form>
				<div class="btnCenter">
					<el-button type="primary" size="mini" @click="doSearch" icon="el-icon-search">查询</el-button>
					<el-button type="primary" size="mini" icon="el-icon-refresh" @click="resetData">重置</el-button>
				</div>
			</div>
			<div class="tableBox">
				<h3>查询结果</h3>
				<el-table :data="tableData" v-loading="isLoad" border height="calc(100% - 100px)" style="width: 100%">
					<el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
					<el-table-column prop="" label="操作" width="100" align="center"><el-button type="primary" size="mini" icon="el-icon-edit"></el-button></el-table-column>
					<el-table-column prop="bridgeName" label="桥梁名称" align="center"></el-table-column>
					<el-table-column prop="bridgeClass" label="桥梁类别" align="center"></el-table-column>
					<el-table-column prop="location" label="所在位置" align="center"></el-table-column>
					<el-table-column prop="bridgeGrade" label="桥梁等级" align="center"></el-table-column>
					<el-table-column prop="bridgeLength" label="桥梁长度" align="center"></el-table-column>
					<el-table-column prop="bridgeWidth" label="桥梁宽度" align="center"></el-table-column>
					<el-table-column prop="maxLoad" label="最大载重量(吨)" align="center"></el-table-column>
					<el-table-column prop="bridgeIntensity" label="抗震设防烈度" align="center"></el-table-column>
					<el-table-column prop="bridgeStructure" label="桥梁结构" align="center"></el-table-column>
					<el-table-column prop="builtEra" label="建造年代" align="center"></el-table-column>
					<el-table-column prop="bridgeNote" label="桥梁简介" width="350" align="center"></el-table-column>
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
				//桥梁名称
				bridgeName: '',
				//桥梁类别
				bridgeClass: '',
				//桥梁类别列表
				bridgeClassList: [],
				//桥梁等级
				bridgeGrade: '',
				//桥梁等级列表
				bridgeGradeList: '',
				//桥梁抗震设防烈度
				bridgeIntensity: ''
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
				bridgeName: this.form.bridgeName,
				bridgeClass: this.form.bridgeClass,
				bridgeGrade: this.form.bridgeGrade,
				bridgeIntensity: this.form.bridgeIntensity,
				pageNo: this.pageNo,
				pageSize: this.pageSize
			};
			request({ url: '/getBridgeClassListAndGradeListAndCountAndList', method: 'post', data: params }).then(res => {
				let data = res.data.result;
				console.log(data);
				this.tableData = data.list;
				this.count = data.count;
				this.form.bridgeClassList = data.bridgeClassList;
				this.form.bridgeGradeList = data.bridgeGradeList;
				this.isLoad = false;
			});
		},
		//重置数据
		resetData() {
			this.form.bridgeName = null;
			this.form.bridgeClass = null;
			this.form.bridgeGrade = null;
			this.form.bridgeIntensity = null;
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
