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
						<el-form-item label="类型：">
							<el-select v-model="form.waterpipeClass" placeholder="请选择" size="mini" style="width: 60%;">
								<el-option v-for="item in form.WaterPipeClassList" :key="item.waterpipeclass" :label="item.waterpipeclass" :value="item.waterpipeclass"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="材料：">
							<el-select v-model="form.waterpipemateial" placeholder="请选择" size="mini" style="width: 60%;">
								<el-option
									v-for="item in form.WaterPipeMateialList"
									:key="item.waterpipemateial"
									:label="item.waterpipemateial"
									:value="item.waterpipemateial"
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
						<el-table-column prop="waterpipeClass" label="类型"   align="center"></el-table-column>
						<el-table-column prop="depth" label="埋深"   align="center"></el-table-column>
						<el-table-column prop="waterpipemateial" label="材料"   align="center"></el-table-column>
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
				//桥梁类别
				waterpipeClass: '',
				//桥梁名称
				waterpipemateial: ''
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
			let params = { waterpipeClass: this.form.waterpipeClass, waterpipemateial: this.form.waterpipemateial, pageNo: this.pageNo, pageSize: this.pageSize };
			request({ url: '/getWaterPipeClassListAndMateialListAndCountAndList', method: 'post', data: params }).then(res => {
				let data = res.data.result;
				console.log(data);
				this.tableData = data.list;
				this.count = data.count;
				this.form.WaterPipeClassList = data.WaterPipeClassList;
				this.form.WaterPipeMateialList = data.WaterPipeMateialList;
				this.isLoad = false;
			});
		},
		//重置数据
		resetData() {
			this.form.waterpipeClass = null;
			this.form.waterpipemateial = null;
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
