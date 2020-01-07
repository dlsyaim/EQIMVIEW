<template>
	<div class="boxAll">
		<div class="boxCenter">
			<div class="search">
				<el-form ref="form" :model="form" label-width="130px" :inline="false">
					<h3>条件查询</h3>
					<el-col :span="12">
						<el-form-item label="名称："><el-input v-model="form.ref" style="width:60%;" size="mini"></el-input></el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="类型：">
							<el-select v-model="form.type" placeholder="请选择" style="width:60%;" size="mini">
								<el-option v-for="item in form.UrbanRefugeTypeList" :key="item.type" :label="item.type" :value="item.type"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="所属区县：">
							<el-select v-model="form.cit" placeholder="请选择" style="width:60%;" size="mini">
								<el-option v-for="item in form.UrbanRefugeCitList" :key="item.cit" :label="item.cit" :value="item.cit"></el-option>
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
				<el-table :data="tableData" v-loading="isLoad" border height="calc(100% - 65px)" style="width: 100%">
					<el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
					<el-table-column prop="" label="操作" width="100" align="center"><el-button type="primary" size="mini" icon="el-icon-edit"></el-button></el-table-column>
					<el-table-column prop="ref" label="名称" align="center"></el-table-column>
					<el-table-column prop="placeAddress" label="地址" align="center"></el-table-column>
					<el-table-column prop="type" label="类型" align="center"></el-table-column>
					<el-table-column prop="area" label="面积" align="center"></el-table-column>
					<el-table-column prop="con" label="所属街道" align="center"></el-table-column>
					<el-table-column prop="cit" label="所属区县" align="center"></el-table-column>
					<el-table-column prop="deg" label="分类等级" align="center"></el-table-column>
					<el-table-column prop="date" label="日期" align="center"></el-table-column>
					<el-table-column prop="note" label="备注" width="200" align="center"></el-table-column>
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
				ref: '',
				//桥梁类别
				type: '',
				//桥梁类别列表
				cit: ''
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
			let params = { ref: this.form.ref, type: this.form.type, cit: this.form.cit, pageNo: this.pageNo, pageSize: this.pageSize };
			request({ url: '/getUrbanRefugeTypeListAndCitListAndCountAndList', method: 'post', data: params }).then(res => {
				let data = res.data.result;
				console.log(data);
				this.tableData = data.list;
				this.count = data.count;
				this.form.UrbanRefugeTypeList = data.UrbanRefugeTypeList;
				this.form.UrbanRefugeCitList = data.UrbanRefugeCitList;
				this.isLoad = false;
			});
		},
		//重置数据
		resetData() {
			this.form.ref = null;
			this.form.type = null;
			this.form.cit = null;
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
