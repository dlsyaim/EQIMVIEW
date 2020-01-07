<template>
	<div class="boxAllOn">
		<div class="boxContent">
			<div class="boxTop">
				<h3>建筑易损性矩阵</h3>
				<el-row class="search">
					<el-col :span="3">建筑类型：</el-col>
					<el-col :span="8">
						<el-select v-model="buildingTypeValue" size="mini" @change="changeBuildingType">
							<el-option v-for="item in this.buildingType" :key="item.buildingType" :label="item.buildingType" :value="item.buildingType"></el-option>
						</el-select>
					</el-col>
				</el-row>

				<el-row class="heardTitle">
					<el-col :span="4">地震烈度</el-col>
					<el-col :span="4">基本完好</el-col>
					<el-col :span="4">轻度破坏</el-col>
					<el-col :span="4">中度破坏</el-col>
					<el-col :span="4">严重破坏</el-col>
					<el-col :span="4">毁坏</el-col>
				</el-row>
				<el-row>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_six.ld" readonly></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_six.jbwh" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_six.qdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_six.zdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_six.yzph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_six.hh" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_seven.ld" readonly></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_seven.jbwh" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_seven.qdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_seven.zdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_seven.yzph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_seven.hh" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_eight.ld" readonly></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_eight.jbwh" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_eight.qdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_eight.zdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_eight.yzph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_eight.hh" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_nine.ld" readonly></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_nine.jbwh" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_nine.qdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_nine.zdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_nine.yzph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_nine.hh" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_ten.ld" readonly></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_ten.jbwh" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_ten.qdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_ten.zdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_ten.yzph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_ten.hh" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_eleven.ld" readonly></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_eleven.jbwh" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_eleven.qdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_eleven.zdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_eleven.yzph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzysxjz_eleven.hh" :readonly="isEdit"></el-input></el-col>
				</el-row>
			</div>

			<div class="boxCenter">
				<h3>建筑破坏比</h3>
				<el-row class="heardTitle">
					<el-col :span="4">建筑类型</el-col>
					<el-col :span="4">基本完好</el-col>
					<el-col :span="4">轻度破坏</el-col>
					<el-col :span="4">中度破坏</el-col>
					<el-col :span="4">严重破坏</el-col>
					<el-col :span="4">毁坏</el-col>
				</el-row>
				<el-row>
					<el-col :span="4"><el-input type="text" v-model="jzphb_dcqt.jzlx" readonly></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_dcqt.jbwh" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_dcqt.qdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_dcqt.zdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_dcqt.yzph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_dcqt.hh" :readonly="isEdit"></el-input></el-col>

					<el-col :span="4"><el-input type="text" v-model="jzphb_gcjz.jzlx" readonly></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_gcjz.jbwh" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_gcjz.qdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_gcjz.zdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_gcjz.yzph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_gcjz.hh" :readonly="isEdit"></el-input></el-col>

					<el-col :span="4"><el-input type="text" v-model="jzphb_dccf.jzlx" readonly></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_dccf.jbwh" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_dccf.qdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_dccf.zdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_dccf.yzph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_dccf.hh" :readonly="isEdit"></el-input></el-col>

					<el-col :span="4"><el-input type="text" v-model="jzphb_gjhn.jzlx" readonly></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_gjhn.jbwh" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_gjhn.qdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_gjhn.zdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_gjhn.yzph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_gjhn.hh" :readonly="isEdit"></el-input></el-col>

					<el-col :span="4"><el-input type="text" v-model="jzphb_ljmf.jzlx" readonly></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_ljmf.jbwh" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_ljmf.qdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_ljmf.zdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_ljmf.yzph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzphb_ljmf.hh" :readonly="isEdit"></el-input></el-col>
				</el-row>
			</div>
			<div class="boxBottom">
				<h3>建筑经济损失比</h3>
				<el-row  class="heardTitle">
					<el-col :span="5">基本完好</el-col>
					<el-col :span="5">轻度破坏</el-col>
					<el-col :span="5">中度破坏</el-col>
					<el-col :span="5">严重破坏</el-col>
					<el-col :span="4">毁坏</el-col>
				</el-row>
				<el-row>
					<el-col :span="5"><el-input type="text" v-model="jzjjssb.jbwh" :readonly="isEdit"></el-input></el-col>
					<el-col :span="5"><el-input type="text" v-model="jzjjssb.qdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="5"><el-input type="text" v-model="jzjjssb.zdph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="5"><el-input type="text" v-model="jzjjssb.yzph" :readonly="isEdit"></el-input></el-col>
					<el-col :span="4"><el-input type="text" v-model="jzjjssb.hh" :readonly="isEdit"></el-input></el-col>
				</el-row>
			</div>
			<div class="boxBtn">
				<el-button type="primary" icon="el-icon-edit" size="mini" @click="openEdit">编辑</el-button>
				<el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
				<el-button type="primary" icon="el-icon-check" size="mini" @click="updataModelData">保存</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import request from '@/utils/request';
import '../../../styles/comTable.css'
// import '@/views/systemManage/modelSetting/model2.scss';
export default {
	data() {
		return {
			//控制数据框是否可编辑
			isEdit: true,
			buildingTypeValue: '高层建筑',
			buildingType: [],
			//建筑易损性矩阵数据
			jzysxjz_six: {
				ld: 0,
				jbwh: 0,
				qdph: 0,
				zdph: 0,
				yzph: 0,
				hh: 0
			},
			jzysxjz_seven: {
				ld: 0,
				jbwh: 0,
				qdph: 0,
				zdph: 0,
				yzph: 0,
				hh: 0
			},
			jzysxjz_eight: {
				ld: 0,
				jbwh: 0,
				qdph: 0,
				zdph: 0,
				yzph: 0,
				hh: 0
			},
			jzysxjz_nine: {
				ld: 0,
				jbwh: 0,
				qdph: 0,
				zdph: 0,
				yzph: 0,
				hh: 0
			},
			jzysxjz_ten: {
				ld: 0,
				jbwh: 0,
				qdph: 0,
				zdph: 0,
				yzph: 0,
				hh: 0
			},
			jzysxjz_eleven: {
				ld: 0,
				jbwh: 0,
				qdph: 0,
				zdph: 0,
				yzph: 0,
				hh: 0
			},
			//建筑破坏比数据
			jzphb_dcqt: {
				jzlx: '多层砌体',
				jbwh: 0,
				qdph: 0,
				zdph: 0,
				yzph: 0,
				hh: 0
			},
			jzphb_gcjz: {
				jzlx: '高层建筑',
				jbwh: 0,
				qdph: 0,
				zdph: 0,
				yzph: 0,
				hh: 0
			},
			jzphb_dccf: {
				jzlx: '单层厂房',
				jbwh: 0,
				qdph: 0,
				zdph: 0,
				yzph: 0,
				hh: 0
			},
			jzphb_gjhn: {
				jzlx: '钢筋混凝',
				jbwh: 0,
				qdph: 0,
				zdph: 0,
				yzph: 0,
				hh: 0
			},
			jzphb_ljmf: {
				jzlx: '老旧民房',
				jbwh: 0,
				qdph: 0,
				zdph: 0,
				yzph: 0,
				hh: 0
			},
			//建筑经济损失比数据
			jzjjssb: {
				jbwh: 0,
				qdph: 0,
				zdph: 0,
				yzph: 0,
				hh: 0
			},
			//重置数据对象
			//建筑易损性矩阵
			jzysxjzData: [],
			//建筑破坏比
			jzphbData: [],
			//建筑经济损失比
			jzjjssbData: []
		};
	},
	methods: {
		changeBuildingType() {
			//根据建筑类型获取建筑易损性矩阵数据
			let param = { buildingType: this.buildingTypeValue };
			request({ url: '/getYSDataByBuildingType', method: 'post', data: param })
				.then(res => {
					let data = res.data.result;
					this.jzysxjzData = data;
					alert(data.length);
					for (let i = 0; i < data.length; i++) {
						if (data[i].i === 6) {
							this.jzysxjz_six.ld = data[i].i;
							this.jzysxjz_six.jbwh = data[i].j;
							this.jzysxjz_six.qdph = data[i].q;
							this.jzysxjz_six.zdph = data[i].z;
							this.jzysxjz_six.yzph = data[i].y;
							this.jzysxjz_six.hh = data[i].d;
						} else if (data[i].i === 7) {
							this.jzysxjz_seven.ld = data[i].i;
							this.jzysxjz_seven.jbwh = data[i].j;
							this.jzysxjz_seven.qdph = data[i].q;
							this.jzysxjz_seven.zdph = data[i].z;
							this.jzysxjz_seven.yzph = data[i].y;
							this.jzysxjz_seven.hh = data[i].d;
						} else if (data[i].i === 8) {
							this.jzysxjz_eight.ld = data[i].i;
							this.jzysxjz_eight.jbwh = data[i].j;
							this.jzysxjz_eight.qdph = data[i].q;
							this.jzysxjz_eight.zdph = data[i].z;
							this.jzysxjz_eight.yzph = data[i].y;
							this.jzysxjz_eight.hh = data[i].d;
						} else if (data[i].i === 9) {
							this.jzysxjz_nine.ld = data[i].i;
							this.jzysxjz_nine.jbwh = data[i].j;
							this.jzysxjz_nine.qdph = data[i].q;
							this.jzysxjz_nine.zdph = data[i].z;
							this.jzysxjz_nine.yzph = data[i].y;
							this.jzysxjz_nine.hh = data[i].d;
						} else if (data[i].i === 10) {
							this.jzysxjz_ten.ld = data[i].i;
							this.jzysxjz_ten.jbwh = data[i].j;
							this.jzysxjz_ten.qdph = data[i].q;
							this.jzysxjz_ten.zdph = data[i].z;
							this.jzysxjz_ten.yzph = data[i].y;
							this.jzysxjz_ten.hh = data[i].d;
						} else if (data[i].i === 11) {
							this.jzysxjz_eleven.ld = data[i].i;
							this.jzysxjz_eleven.jbwh = data[i].j;
							this.jzysxjz_eleven.qdph = data[i].q;
							this.jzysxjz_eleven.zdph = data[i].z;
							this.jzysxjz_eleven.yzph = data[i].y;
							this.jzysxjz_eleven.hh = data[i].d;
						}
					}
				});
		},
		resetData() {
			//重置建筑易损性矩阵数据
			for (let i = 0; i < this.jzysxjzData.length; i++) {
				if (this.jzysxjzData[i].i === 6) {
					this.jzysxjz_six.ld = this.jzysxjzData[i].i;
					this.jzysxjz_six.jbwh = this.jzysxjzData[i].j;
					this.jzysxjz_six.qdph = this.jzysxjzData[i].q;
					this.jzysxjz_six.zdph = this.jzysxjzData[i].z;
					this.jzysxjz_six.yzph = this.jzysxjzData[i].y;
					this.jzysxjz_six.hh = this.jzysxjzData[i].d;
				} else if (this.jzysxjzData[i].i === 7) {
					this.jzysxjz_seven.ld = this.jzysxjzData[i].i;
					this.jzysxjz_seven.jbwh = this.jzysxjzData[i].j;
					this.jzysxjz_seven.qdph = this.jzysxjzData[i].q;
					this.jzysxjz_seven.zdph = this.jzysxjzData[i].z;
					this.jzysxjz_seven.yzph = this.jzysxjzData[i].y;
					this.jzysxjz_seven.hh = this.jzysxjzData[i].d;
				} else if (this.jzysxjzData[i].i === 8) {
					this.jzysxjz_eight.ld = this.jzysxjzData[i].i;
					this.jzysxjz_eight.jbwh = this.jzysxjzData[i].j;
					this.jzysxjz_eight.qdph = this.jzysxjzData[i].q;
					this.jzysxjz_eight.zdph = this.jzysxjzData[i].z;
					this.jzysxjz_eight.yzph = this.jzysxjzData[i].y;
					this.jzysxjz_eight.hh = this.jzysxjzData[i].d;
				} else if (this.jzysxjzData[i].i === 9) {
					this.jzysxjz_nine.ld = this.jzysxjzData[i].i;
					this.jzysxjz_nine.jbwh = this.jzysxjzData[i].j;
					this.jzysxjz_nine.qdph = this.jzysxjzData[i].q;
					this.jzysxjz_nine.zdph = this.jzysxjzData[i].z;
					this.jzysxjz_nine.yzph = this.jzysxjzData[i].y;
					this.jzysxjz_nine.hh = this.jzysxjzData[i].d;
				} else if (this.jzysxjzData[i].i === 10) {
					this.jzysxjz_ten.ld = this.jzysxjzData[i].i;
					this.jzysxjz_ten.jbwh = this.jzysxjzData[i].j;
					this.jzysxjz_ten.qdph = this.jzysxjzData[i].q;
					this.jzysxjz_ten.zdph = this.jzysxjzData[i].z;
					this.jzysxjz_ten.yzph = this.jzysxjzData[i].y;
					this.jzysxjz_ten.hh = this.jzysxjzData[i].d;
				} else if (this.jzysxjzData[i].i === 11) {
					this.jzysxjz_eleven.ld = this.jzysxjzData[i].i;
					this.jzysxjz_eleven.jbwh = this.jzysxjzData[i].j;
					this.jzysxjz_eleven.qdph = this.jzysxjzData[i].q;
					this.jzysxjz_eleven.zdph = this.jzysxjzData[i].z;
					this.jzysxjz_eleven.yzph = this.jzysxjzData[i].y;
					this.jzysxjz_eleven.hh = this.jzysxjzData[i].d;
				}
			}
			//重置建筑破坏比数据
			for (let i = 0; i < this.jzphbData.length; i++) {
				if (this.jzphbData[i].buildingType === '多层砌体') {
					this.jzphb_dcqt.jzlx = this.jzphbData[i].buildingType;
					this.jzphb_dcqt.jbwh = this.jzphbData[i].j;
					this.jzphb_dcqt.qdph = this.jzphbData[i].q;
					this.jzphb_dcqt.zdph = this.jzphbData[i].z;
					this.jzphb_dcqt.yzph = this.jzphbData[i].y;
					this.jzphb_dcqt.hh = this.jzphbData[i].d;
				} else if (this.jzphbData[i].buildingType === '高层建筑') {
					this.jzphb_gcjz.jzlx = this.jzphbData[i].buildingType;
					this.jzphb_gcjz.jbwh = this.jzphbData[i].j;
					this.jzphb_gcjz.qdph = this.jzphbData[i].q;
					this.jzphb_gcjz.zdph = this.jzphbData[i].z;
					this.jzphb_gcjz.yzph = this.jzphbData[i].y;
					this.jzphb_gcjz.hh = this.jzphbData[i].d;
				} else if (this.jzphbData[i].buildingType === '单层厂房') {
					this.jzphb_dccf.jzlx = this.jzphbData[i].buildingType;
					this.jzphb_dccf.jbwh = this.jzphbData[i].j;
					this.jzphb_dccf.qdph = this.jzphbData[i].q;
					this.jzphb_dccf.zdph = this.jzphbData[i].z;
					this.jzphb_dccf.yzph = this.jzphbData[i].y;
					this.jzphb_dccf.hh = this.jzphbData[i].d;
				} else if (this.jzphbData[i].buildingType === '钢筋混凝') {
					this.jzphb_gjhn.jzlx = this.jzphbData[i].buildingType;
					this.jzphb_gjhn.jbwh = this.jzphbData[i].j;
					this.jzphb_gjhn.qdph = this.jzphbData[i].q;
					this.jzphb_gjhn.zdph = this.jzphbData[i].z;
					this.jzphb_gjhn.yzph = this.jzphbData[i].y;
					this.jzphb_gjhn.hh = this.jzphbData[i].d;
				} else if (this.jzphbData[i].buildingType === '老旧民房') {
					this.jzphb_ljmf.jzlx = this.jzphbData[i].buildingType;
					this.jzphb_ljmf.jbwh = this.jzphbData[i].j;
					this.jzphb_ljmf.qdph = this.jzphbData[i].q;
					this.jzphb_ljmf.zdph = this.jzphbData[i].z;
					this.jzphb_ljmf.yzph = this.jzphbData[i].y;
					this.jzphb_ljmf.hh = this.jzphbData[i].d;
				}
			}
			//重置建筑经济损失比数据
			this.jzjjssb.jbwh = this.jzjjssbData.j;
			this.jzjjssb.qdph = this.jzjjssbData.q;
			this.jzjjssb.zdph = this.jzjjssbData.z;
			this.jzjjssb.yzph = this.jzjjssbData.y;
			this.jzjjssb.hh = this.jzjjssbData.d;
		},
		//开启数据框编辑功能
		openEdit() {
			this.isEdit = false;
		},
		updataModelData() {
			//更新建筑易损性相关建筑类型的数据
			this.jzysxjz_six['buildingType'] = this.buildingTypeValue;
			this.jzysxjz_seven['buildingType'] = this.buildingTypeValue;
			this.jzysxjz_eight['buildingType'] = this.buildingTypeValue;
			this.jzysxjz_nine['buildingType'] = this.buildingTypeValue;
			this.jzysxjz_ten['buildingType'] = this.buildingTypeValue;
			this.jzysxjz_eleven['buildingType'] = this.buildingTypeValue;
			let jzysParams = [this.jzysxjz_six, this.jzysxjz_seven, this.jzysxjz_eight, this.jzysxjz_nine, this.jzysxjz_ten, this.jzysxjz_eleven];
			request({ url: '/updateJZYSdata', method: 'post', data: JSON.stringify(jzysParams) }).then(res => {
				console.log(res);
				this.$message({ message: '修改成功！', type: 'success' });
			});
			//更新建筑破坏比相关数据
			let jzphbParam = [this.jzphb_dcqt, this.jzphb_gcjz, this.jzphb_dccf, this.jzphb_gjhn, this.jzphb_ljmf];
			request({ url: '/updateJZPHBdata', method: 'post', data: JSON.stringify(jzphbParam) });
			//更新建筑经济损失比相关数据
			let updateJZJJSSBcondition = this.jzjjssb;
			request({ url: '/updateJZJJSSBdata', method: 'post', data: updateJZJJSSBcondition });
		}
	},
	created() {
		//获取建筑类型下拉列表
		request({ url: '/getBuildingTypeList', method: 'get' })
			.then(res => {
				let buildingType = res.data.result;
				this.buildingType = buildingType;
			});
		//根据建筑类型获取建筑易损性矩阵数据
		let param = { buildingType: this.buildingTypeValue };
		request({ url: '/getYSDataByBuildingType', method: 'post', data: param })
			.then(res => {
				let data = res.data.result;
				this.jzysxjzData = data;
				console.log(this.jzysxjzData);
				for (let i = 0; i < data.length; i++) {
					if (data[i].i === 6) {
						this.jzysxjz_six.ld = data[i].i;
						this.jzysxjz_six.jbwh = data[i].j;
						this.jzysxjz_six.qdph = data[i].q;
						this.jzysxjz_six.zdph = data[i].z;
						this.jzysxjz_six.yzph = data[i].y;
						this.jzysxjz_six.hh = data[i].d;
					} else if (data[i].i === 7) {
						this.jzysxjz_seven.ld = data[i].i;
						this.jzysxjz_seven.jbwh = data[i].j;
						this.jzysxjz_seven.qdph = data[i].q;
						this.jzysxjz_seven.zdph = data[i].z;
						this.jzysxjz_seven.yzph = data[i].y;
						this.jzysxjz_seven.hh = data[i].d;
					} else if (data[i].i === 8) {
						this.jzysxjz_eight.ld = data[i].i;
						this.jzysxjz_eight.jbwh = data[i].j;
						this.jzysxjz_eight.qdph = data[i].q;
						this.jzysxjz_eight.zdph = data[i].z;
						this.jzysxjz_eight.yzph = data[i].y;
						this.jzysxjz_eight.hh = data[i].d;
					} else if (data[i].i === 9) {
						this.jzysxjz_nine.ld = data[i].i;
						this.jzysxjz_nine.jbwh = data[i].j;
						this.jzysxjz_nine.qdph = data[i].q;
						this.jzysxjz_nine.zdph = data[i].z;
						this.jzysxjz_nine.yzph = data[i].y;
						this.jzysxjz_nine.hh = data[i].d;
					} else if (data[i].i === 10) {
						this.jzysxjz_ten.ld = data[i].i;
						this.jzysxjz_ten.jbwh = data[i].j;
						this.jzysxjz_ten.qdph = data[i].q;
						this.jzysxjz_ten.zdph = data[i].z;
						this.jzysxjz_ten.yzph = data[i].y;
						this.jzysxjz_ten.hh = data[i].d;
					} else if (data[i].i === 11) {
						this.jzysxjz_eleven.ld = data[i].i;
						this.jzysxjz_eleven.jbwh = data[i].j;
						this.jzysxjz_eleven.qdph = data[i].q;
						this.jzysxjz_eleven.zdph = data[i].z;
						this.jzysxjz_eleven.yzph = data[i].y;
						this.jzysxjz_eleven.hh = data[i].d;
					}
				}
			});
		//获取建筑破坏比数据
		request({ url: '/getPHBData', method: 'get' })
			.then(res => {
				let data = res.data.result;
				this.jzphbData = data;
				for (let i = 0; i < data.length; i++) {
					if (data[i].buildingType === '多层砌体') {
						this.jzphb_dcqt.jzlx = data[i].buildingType;
						this.jzphb_dcqt.jbwh = data[i].j;
						this.jzphb_dcqt.qdph = data[i].q;
						this.jzphb_dcqt.zdph = data[i].z;
						this.jzphb_dcqt.yzph = data[i].y;
						this.jzphb_dcqt.hh = data[i].d;
					} else if (data[i].buildingType === '高层建筑') {
						this.jzphb_gcjz.jzlx = data[i].buildingType;
						this.jzphb_gcjz.jbwh = data[i].j;
						this.jzphb_gcjz.qdph = data[i].q;
						this.jzphb_gcjz.zdph = data[i].z;
						this.jzphb_gcjz.yzph = data[i].y;
						this.jzphb_gcjz.hh = data[i].d;
					} else if (data[i].buildingType === '单层厂房') {
						this.jzphb_dccf.jzlx = data[i].buildingType;
						this.jzphb_dccf.jbwh = data[i].j;
						this.jzphb_dccf.qdph = data[i].q;
						this.jzphb_dccf.zdph = data[i].z;
						this.jzphb_dccf.yzph = data[i].y;
						this.jzphb_dccf.hh = data[i].d;
					} else if (data[i].buildingType === '钢筋混凝') {
						this.jzphb_gjhn.jzlx = data[i].buildingType;
						this.jzphb_gjhn.jbwh = data[i].j;
						this.jzphb_gjhn.qdph = data[i].q;
						this.jzphb_gjhn.zdph = data[i].z;
						this.jzphb_gjhn.yzph = data[i].y;
						this.jzphb_gjhn.hh = data[i].d;
					} else if (data[i].buildingType === '老旧民房') {
						this.jzphb_ljmf.jzlx = data[i].buildingType;
						this.jzphb_ljmf.jbwh = data[i].j;
						this.jzphb_ljmf.qdph = data[i].q;
						this.jzphb_ljmf.zdph = data[i].z;
						this.jzphb_ljmf.yzph = data[i].y;
						this.jzphb_ljmf.hh = data[i].d;
					}
				}
			});
		//获取经济损失比数据
		request({ url: '/getJJSSBData', method: 'get' }).then(res => {
			let data = res.data.result;
			this.jzjjssbData = data;
			this.jzjjssb.jbwh = data.j;
			this.jzjjssb.qdph = data.q;
			this.jzjjssb.zdph = data.z;
			this.jzjjssb.yzph = data.y;
			this.jzjjssb.hh = data.d;
		});
	},
	mounted() {
		
	}
};
</script>
