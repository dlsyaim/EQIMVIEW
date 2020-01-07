<template>
	<div class="boxAll">
		<div class="boxTop">
			<el-form label-width="150px" style :inline="true" size="mini">
				<h3>条件查询</h3>
				<el-form-item label="选择查询重点目标">
					<el-select v-model="focusAim">
						<el-option v-for="item in this.queryConditions.focusTarget" :key="item.value" :label="item.value" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-row>
					<el-col :span="6">
						<el-form-item><el-radio v-model="radio" label="1" @change="radio1">按震中缓冲区</el-radio></el-form-item>
					</el-col>
					<el-col :span="18">
						<el-form-item label="输入缓冲半径"><el-input v-model="bufferRadius" placeholder="输入缓冲半径" :disabled="isDisabled1"></el-input></el-form-item>
						千米
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item><el-radio v-model="radio" label="2" @change="radio1">按影响场烈度</el-radio></el-form-item>
					</el-col>
					<el-col :span="18">
						<el-form-item label="选择地震烈度">
							<el-select v-model="earthquakeIntensity" :disabled="isDisabled2">
								<el-option v-for="item in this.queryConditions.focusTarget" :key="item.value" :label="item.value" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item><el-radio v-model="radio" label="3" @change="radio1">按区县行政单元</el-radio></el-form-item>
					</el-col>
					<el-col :span="18">
						<el-form-item label="选择区县行政单元">
							<el-select v-model="districtAndCountry" :disabled="isDisabled3">
								<el-option v-for="item in this.queryConditions.focusTarget" :key="item.value" :label="item.value" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item><el-radio v-model="radio" label="4" @change="radio1">按乡镇行政单元</el-radio></el-form-item>
					</el-col>
					<el-col :span="18">
						<el-form-item label="选择乡镇行政单元">
							<el-cascader v-model="value" :options="options" @change="changeCascader" :disabled="isDisabled4"></el-cascader>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<el-row>
				<el-col style="text-align:center;">
					<el-button type="primary" size="mini" icon="el-icon-refresh">重置</el-button>
					<el-button type="primary" size="mini" icon="el-icon-check">查询</el-button>
				</el-col>
			</el-row>
		</div>

		<div class="boxBottom">
			<h3>查询结果</h3>
			<el-table :data="focusData" v-loading="isLoading" border style="height: calc(100% - 120px)">
				<el-table-column label="序号" type="index"></el-table-column>
				<el-table-column prop="featId" label="主键" v-if="(show = false)"></el-table-column>
				<el-table-column prop="districtName" label="区县行政区名称"></el-table-column>
				<el-table-column prop="schoolName" label="学校名称"></el-table-column>
				<el-table-column prop="postCode" label="邮政编码"></el-table-column>
				<el-table-column prop="schoolNature" label="学校性质"></el-table-column>
				<el-table-column prop="schoolScale" label="学校规模"></el-table-column>
				<el-table-column prop="teacherNumber" label="教师人数"></el-table-column>
				<el-table-column prop="studentNumber" label="学生人数"></el-table-column>
				<el-table-column prop="schoolLocation" label="所在位置"></el-table-column>
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
</template>
<style scoped="scoped">
.boxAll {
	height: 100%;
	background: #f4f4f4;
	overflow-y: hidden;
}
.boxAll h3 {
	font-size: 16px;
	line-height: 30px;
	font-weight: normal;
}
.boxAll .boxTop {
	background: #ffffff;
	padding: 10px 15px;
	border: 10px solid #f4f4f4;
}
.boxAll .boxBottom{
	height: calc(100% - 300px);
	padding: 10px 15px;
	background: #ffffff;
	border: 10px solid #f4f4f4;
	border-top: none;
}
.el-pagination{
	position: fixed;
	bottom: 40px;
}
</style>
<script>
import request from '@/utils/request';
import '../../styles/scrollbar.css';
export default {
	data() {
		return {
			featId: this.$route.query.featId,
			queryConditions: {
				focusTarget: [
					{ value: '学校', label: '学校' },
					{ value: '道路', label: '道路' },
					{ value: '地铁', label: '地铁' },
					{ value: '危险源', label: '危险源' },
					{ value: '疏散场地', label: '疏散场地' },
					{ value: '医院', label: '医院' },
					{ value: '重要目标', label: '重要目标' },
					{ value: '等等...', label: '等等...' }
				]
			},
			focusAim: '学校',
			radio: '1',
			isDisabled1: false,
			bufferRadius: 10,
			isDisabled2: true,
			earthquakeIntensity: '5度区',
			isDisabled3: true,
			districtAndCountry: '浦东区',
			isDisabled4: true,
			value: ['浦东区', '浦1镇'],
			options: [
				{
					value: '浦东区',
					label: '浦东区',
					children: [
						{
							value: '浦1镇',
							label: '浦1镇'
						},
						{
							value: '浦2镇',
							label: '浦2镇'
						},
						{
							value: '浦3镇',
							label: '浦3镇'
						}
					]
				}
			],
			pageNo: 1,
			pageSize: 10,
			isLoading: true,
			focusData: null,
			count: 0
		};
	},
	methods: {
		radio1(label) {
			if (label == 1) {
				this.isDisabled1 = false;
				this.isDisabled2 = true;
				this.isDisabled3 = true;
				this.isDisabled4 = true;
			} else if (label == 2) {
				this.isDisabled1 = true;
				this.isDisabled2 = false;
				this.isDisabled3 = true;
				this.isDisabled4 = true;
			} else if (label == 3) {
				this.isDisabled1 = true;
				this.isDisabled2 = true;
				this.isDisabled3 = false;
				this.isDisabled4 = true;
			} else {
				this.isDisabled1 = true;
				this.isDisabled2 = true;
				this.isDisabled3 = true;
				this.isDisabled4 = false;
			}
		},
		handleSizeChange(pageSize) {
			this.pageSize = pageSize;
			let data = { earthquakeFeatId: this.featId, pageNo: this.pageNo, pageSize: this.pageSize };
			request({ url: '/getFocusTargetListAndCount', method: 'post', data: data })
				.then(res => {
					this.isLoading = false;
					let data = res.data.result;
					this.focusData = data.list;
					this.count = data.count.count;
				})
				.catch(res => {
					this.isLoading = false;
					alert(res);
				});
		},
		handleCurrentChange(pageNo) {
			this.pageNo = pageNo;
			let data = { earthquakeFeatId: this.featId, pageNo: this.pageNo, pageSize: this.pageSize };
			request({ url: '/getFocusTargetListAndCount', method: 'post', data: data })
				.then(res => {
					this.isLoading = false;
					let data = res.data.result;
					this.focusData = data.list;
					this.count = data.count.count;
				})
			
		}
	},
	created() {
		let data = { earthquakeFeatId: this.featId, pageNo: this.pageNo, pageSize: this.pageSize };
		request({ url: '/getFocusTargetListAndCount', method: 'post', data: data })
			.then(res => {
				this.isLoading = false;
				let data = res.data.result;
				this.focusData = data.list;
				this.count = data.count.count;
			})
			
	}
};
</script>
