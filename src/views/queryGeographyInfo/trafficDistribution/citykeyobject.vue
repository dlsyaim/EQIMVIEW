<template>
	<div class="boxAll">
		<div class="boxCenter">
			<div class="search">
				<el-form ref="form" :model="form" label-width="120px" :inline="false">
					<h3>条件查询</h3>
					<el-col :span="12">
						<el-form-item label="名称："><el-input v-model="form.citykeyName" style="width:60%;" size="mini"></el-input></el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="性质：">
							<el-select v-model="form.citykeyClass" placeholder="请选择" style="width:60%;" size="mini">
								<el-option v-for="item in form.CityKeyObjectClassList" :key="item.citykeyclass" :label="item.citykeyclass" :value="item.citykeyclass"></el-option>
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
					<el-table-column prop="citykeyName" label="名称" align="center"></el-table-column>
					<el-table-column prop="citykeyPostcode" label="邮政编码" align="center"></el-table-column>
					<el-table-column prop="citykeyClass" label="性质" align="center"></el-table-column>
					<el-table-column prop="citykeyNote_" label="备注" width="250" align="center"></el-table-column>
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
				//名称
				citykeyName: '',
				//性质
				citykeyClass: ''
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
			let params = { citykeyName: this.form.citykeyName, citykeyClass: this.form.citykeyClass, pageNo: this.pageNo, pageSize: this.pageSize };
			request({ url: '/getCityKeyObjectClassListAndAndCountAndList', method: 'post', data: params }).then(res => {
				let data = res.data.result;
				console.log(data);
				this.tableData = data.list;
				this.count = data.count;
				this.form.CityKeyObjectClassList = data.CityKeyObjectClassList;
				this.isLoad = false;
			});
		},
		//重置数据
		resetData() {
			this.form.citykeyName = null;
			this.form.citykeyClass = null;
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
