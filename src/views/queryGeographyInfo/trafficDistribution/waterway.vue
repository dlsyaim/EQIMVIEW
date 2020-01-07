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
				<el-form ref="form" :model="form" label-width="100px" :inline="false">
					<h3>条件查询</h3>
					<el-col :span="12">
						<el-form-item label="水道名称："><el-input v-model="form.waterwayName" size="mini" style="width: 60%;"></el-input></el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="水道类别：">
							<el-select v-model="form.waterwayClass" placeholder="请选择" size="mini" style="width: 60%;">
								<el-option v-for="item in form.waterwayClassList" :key="item.waterwayClass" :label="item.waterwayClass" :value="item.waterwayClass"></el-option>
							</el-select>
						</el-form-item>
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
						<el-table-column prop="waterwayName" label="水道名称"  align="center"></el-table-column>
						<el-table-column prop="waterwayClass" label="水道类别"  align="center"></el-table-column>
						<el-table-column prop="coverArea" label="水道区间"  align="center"></el-table-column>
						<el-table-column prop="waterwayLength" label="水道长度"  align="center"></el-table-column>
						<el-table-column prop="waterwayNote" label="水道简介" width="350" align="center"></el-table-column>
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
				//水道名称
				waterwayName: '',
				//水道等级
				waterwayClass: '',
				//水道等级列表
				waterwayClassList: []
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
			//获取历史强震的数据列表及总记录数
			let params = { waterwayName: this.form.waterwayName, waterwayClass: this.form.waterwayClass, pageNo: this.pageNo, pageSize: this.pageSize };
			request({ url: '/getWaterwayClassListAndCountAndList', method: 'post', data: params }).then(res => {
				let data = res.data.result;
				console.log(data);
				this.tableData = data.list;
				this.count = data.count;
				this.form.waterwayClassList = data.selectList;
				this.isLoad = false;
			});
		},
		//重置数据
		resetData() {
			this.form.waterwayName = null;
			this.form.waterwayClass = null;
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
