<template>
	<div class="boxAll">
		<div class="boxTabs">
			<b>管线数据</b>
			&nbsp;&nbsp;&nbsp;|&nbsp;
			<span>
				<router-link to="/queryGeographyInfo/trafficDistribution/largeoilgaspipeline">大型油气管线</router-link>
				<router-link to="/queryGeographyInfo/trafficDistribution/gaspipe">燃气管网</router-link>
				<router-link to="/queryGeographyInfo/trafficDistribution/waterpipe">供水主管网</router-link>
			</span>
		</div>
		<div class="boxCenter">
			<div class="search">
				<el-form ref="form" :model="form" label-width="120px" :inline="false">
					<h3>条件查询</h3>
					<el-col :span="12">
						<el-form-item label="管段："><el-input v-model="form.gaspipeName" size="mini" style="width: 60%;"></el-input></el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="材料：">
							<el-select v-model="form.gaspipematerial" placeholder="请选择" size="mini" style="width: 60%;">
								<el-option
									v-for="item in form.GasPipeGradeList"
									:key="item.gaspipematerial"
									:label="item.gaspipematerial"
									:value="item.gaspipematerial"
								></el-option>
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
						<el-table-column prop="gaspipeName" label="管段"   align="center"></el-table-column>
						<el-table-column prop="gaspipeClass" label="类型"   align="center"></el-table-column>
						<el-table-column prop="gaspipeRoad" label="道路"   align="center"></el-table-column>
						<el-table-column prop="gaspipeDepth" label="埋深"   align="center"></el-table-column>
						<el-table-column prop="pressure" label="压力"   align="center"></el-table-column>
						<el-table-column prop="gaspipematerial" label="材料"   align="center"></el-table-column>
						<el-table-column prop="materialType" label="材料类型"   align="center"></el-table-column>
						<el-table-column prop="length" label="长度(米)"   align="center"></el-table-column>
						<el-table-column prop="diameter" label="管道直径"   align="center"></el-table-column>
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
				//管段
				gaspipeName: '',
				//材料
				gaspipematerial: ''
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
			//获取燃气管网相关数据
			let params = { gaspipeName: this.form.gaspipeName, gaspipematerial: this.form.gaspipematerial, pageNo: this.pageNo, pageSize: this.pageSize };
			request({ url: '/getGaspipeMaterialListAndCountAndList', method: 'post', data: params }).then(res => {
				let data = res.data.result;
				console.log(data);
				this.tableData = data.list;
				this.count = data.count;
				this.form.GasPipeGradeList = data.GasPipeGradeList;
				this.isLoad = false;
			});
		},
		//重置数据
		resetData() {
			this.form.gaspipeName = null;
			this.form.gaspipematerial = null;
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
