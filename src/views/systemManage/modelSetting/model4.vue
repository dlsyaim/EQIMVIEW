<template>
	<div class="boxAllOn">
		<div class="boxContent">
			<div class="boxTop">
				<h3>受伤人员-尹之潜</h3>
				<h4>【模型公式】</h4>
				<img :src="img" style="margin-left:30px;" />
				<h4>【参数说明】</h4>
				<p>In--表示受伤人数；&nbsp;&nbsp;&nbsp;De--表示死亡人数</p>
				<h4>【参数设置】</h4>
				<el-row class="search">
					<el-col :span="1">L0：</el-col>
					<el-col :span="6"><el-input v-model="setParamValue" size="mini" :readonly="isEdit"></el-input></el-col>
				</el-row>
			</div>

			<div class="boxCenter">
				<h3>受伤人员-按震级</h3>
				<el-row class="heardTitle">
					<el-col :span="12">地震震级</el-col>
					<el-col :span="12">受伤人员</el-col>
				</el-row>
				<el-row>
					<el-col :span="12"><el-input class="first_table_input" v-model="ssryazj_five.dzzj" readonly></el-input></el-col>
					<el-col :span="12"><el-input class="first_table_input" v-model="ssryazj_five.ssry" :readonly="isEdit"></el-input></el-col>
					<el-col :span="12"><el-input class="first_table_input" v-model="ssryazj_six.dzzj" readonly></el-input></el-col>
					<el-col :span="12"><el-input class="first_table_input" v-model="ssryazj_six.ssry" :readonly="isEdit"></el-input></el-col>
					<el-col :span="12"><el-input class="first_table_input" v-model="ssryazj_seven.dzzj" readonly></el-input></el-col>
					<el-col :span="12"><el-input class="first_table_input" v-model="ssryazj_seven.ssry" :readonly="isEdit"></el-input></el-col>
					<el-col :span="12"><el-input class="first_table_input" v-model="ssryazj_eight.dzzj" readonly></el-input></el-col>
					<el-col :span="12"><el-input class="first_table_input" v-model="ssryazj_eight.ssry" :readonly="isEdit"></el-input></el-col>
				</el-row>
			</div>

			<div class="boxBottom">
				<h3>受伤人员-按烈度</h3>
				<el-row class="heardTitle">
					<el-col :span="12">地震烈度</el-col>
					<el-col :span="12">受伤人员</el-col>
				</el-row>
				<el-row>
					<el-col :span="12"><el-input class="first_table_input" v-model="ssryald_six.dzld" readonly></el-input></el-col>
					<el-col :span="12"><el-input class="first_table_input" v-model="ssryald_six.ssry" :readonly="isEdit"></el-input></el-col>
					<el-col :span="12"><el-input class="first_table_input" v-model="ssryald_seven.dzld" readonly></el-input></el-col>
					<el-col :span="12"><el-input class="first_table_input" v-model="ssryald_seven.ssry" :readonly="isEdit"></el-input></el-col>
					<el-col :span="12"><el-input class="first_table_input" v-model="ssryald_eight.dzld" readonly></el-input></el-col>
					<el-col :span="12"><el-input class="first_table_input" v-model="ssryald_eight.ssry" :readonly="isEdit"></el-input></el-col>
					<el-col :span="12"><el-input class="first_table_input" v-model="ssryald_nine.dzld" readonly></el-input></el-col>
					<el-col :span="12"><el-input class="first_table_input" v-model="ssryald_nine.ssry" :readonly="isEdit"></el-input></el-col>
					<el-col :span="12"><el-input class="first_table_input" v-model="ssryald_ten.dzld" readonly></el-input></el-col>
					<el-col :span="12"><el-input class="first_table_input" v-model="ssryald_ten.ssry" :readonly="isEdit"></el-input></el-col>
				</el-row>
			</div>
			<div class="boxBtn">
				<el-button type="primary" size="mini" icon="el-icon-edit" @click="openEdit">编辑</el-button>
				<el-button type="primary" size="mini" icon="el-icon-refresh" @click="resetData">重置</el-button>
				<el-button type="primary" size="mini" icon="el-icon-check" @click="updateData">保存</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import request from '@/utils/request';
// import '@/views/systemManage/modelSetting/model4.scss';
import '../../../styles/comTable.css';
import Img from './model4Formula.png';
export default {
	data() {
		return {
			img: Img,
			isEdit: true,
			//设置参数
			setParamValue: 0,
			//受伤人员按震级
			ssryazj_five: {
				//地震震级
				dzzj: 0,
				//受伤人员
				ssry: 0,
				//模型类型
				modelType:'受伤人员按震级'
			},
			ssryazj_six: {
				//地震震级
				dzzj: 0,
				//受伤人员
				ssry: 0,
				//模型类型
				modelType:'受伤人员按震级'
			},
			ssryazj_seven: {
				//地震震级
				dzzj: 0,
				//受伤人员
				ssry: 0,
				//模型类型
				modelType:'受伤人员按震级'
			},
			ssryazj_eight: {
				//地震震级
				dzzj: 0,
				//受伤人员
				ssry: 0,
				//模型类型
				modelType:'受伤人员按震级'
			},
			//受伤人员按烈度
			ssryald_six: {
				//地震烈度
				dzld: 0,
				//受伤人员
				ssry: 0,
				//模型类型
				modelType:'受伤人员按烈度'
			},
			ssryald_seven: {
				//地震烈度
				dzld: 0,
				//受伤人员
				ssry: 0,
				//模型类型
				modelType:'受伤人员按烈度'
			},
			ssryald_eight: {
				//地震烈度
				dzld: 0,
				//受伤人员
				ssry: 0,
				//模型类型
				modelType:'受伤人员按烈度'
			},
			ssryald_nine: {
				//地震烈度
				dzld: 0,
				//受伤人员
				ssry: 0,
				//模型类型
				modelType:'受伤人员按烈度'
			},
			ssryald_ten: {
				//地震烈度
				dzld: 0,
				//受伤人员
				ssry: 0,
				//模型类型
				modelType:'受伤人员按烈度'
			},
			//存放重置数据对象
			//受伤人员按震级
			ssryazj: [],
			//受伤人员按烈度
			ssryald: []
		};
	},
	methods: {
		//开启编辑
		openEdit() {
			this.isEdit = false;
		},
		//重置数据
		resetData() {
			//重置受伤人员按震级和L0数据
			for (let i = 0; i < this.ssryazj.length; i++) {
				if (this.ssryazj[i].scale == 5) {
					this.ssryazj_five.dzzj = this.ssryazj[i].scale;
					this.ssryazj_five.ssry = this.ssryazj[i].percentInjured;
					this.setParamValue = this.ssryazj[i].l0;
				} else if (this.ssryazj[i].scale == 6) {
					this.ssryazj_six.dzzj = this.ssryazj[i].scale;
					this.ssryazj_six.ssry = this.ssryazj[i].percentInjured;
				} else if (this.ssryazj[i].scale == 7) {
					this.ssryazj_seven.dzzj = this.ssryazj[i].scale;
					this.ssryazj_seven.ssry = this.ssryazj[i].percentInjured;
				} else if (this.ssryazj[i].scale == 8) {
					this.ssryazj_eight.dzzj = this.ssryazj[i].scale;
					this.ssryazj_eight.ssry = this.ssryazj[i].percentInjured;
				}
			}
			//重置受伤人员按烈度
			for (let i = 0; i < this.ssryald.length; i++) {
				if (this.ssryald[i].scale == 'Ⅵ') {
					this.ssryald_six.dzld = this.ssryald[i].scale;
					this.ssryald_six.ssry = this.ssryald[i].percentInjured;
				} else if (this.ssryald[i].scale == 'Ⅶ') {
					this.ssryald_seven.dzld = this.ssryald[i].scale;
					this.ssryald_seven.ssry = this.ssryald[i].percentInjured;
				} else if (this.ssryald[i].scale == 'Ⅷ') {
					this.ssryald_eight.dzld = this.ssryald[i].scale;
					this.ssryald_eight.ssry = this.ssryald[i].percentInjured;
				} else if (this.ssryald[i].scale == 'Ⅸ') {
					this.ssryald_nine.dzld = this.ssryald[i].scale;
					this.ssryald_nine.ssry = this.ssryald[i].percentInjured;
				} else if (this.ssryald[i].scale == 'Ⅹ') {
					this.ssryald_ten.dzld = this.ssryald[i].scale;
					this.ssryald_ten.ssry = this.ssryald[i].percentInjured;
				}
			}
		},
		updateData() {
			//更新受伤人员按震级数据
			this.ssryazj_five['l0'] = this.setParamValue;
			this.ssryazj_six['l0'] = this.setParamValue;
			this.ssryazj_seven['l0'] = this.setParamValue;
			this.ssryazj_eight['l0'] = this.setParamValue;
			//更新受伤人员按烈度数据
			this.ssryald_six['l0'] = this.setParamValue;
			this.ssryald_seven['l0'] = this.setParamValue;
			this.ssryald_eight['l0'] = this.setParamValue;
			this.ssryald_nine['l0'] = this.setParamValue;
			this.ssryald_ten['l0'] = this.setParamValue;
			let params = [this.ssryazj_five, this.ssryazj_six, this.ssryazj_seven, this.ssryazj_eight,this.ssryald_six, this.ssryald_seven, this.ssryald_eight, this.ssryald_nine, this.ssryald_ten];
			request({ url: '/updateInjuredDdata', method: 'post', data: JSON.stringify(params) }).then(res => {
				console.log(res);
				this.$message({ message: '修改成功！', type: 'success' });
			});
		}
	},
	created() {
		
	},
	mounted() {
		//获取受伤人员按震级数据
		request({ url: '/getInjuredAZJdata', method: 'post' }).then(res => {
			let data = res.data.result;
			this.ssryazj = data;
			for (let i = 0; i < data.length; i++) {
				if (data[i].scale == 5) {
					this.ssryazj_five.dzzj = data[i].scale;
					this.ssryazj_five.ssry = data[i].percentInjured;
					this.setParamValue = this.ssryazj[i].l0;
				} else if (data[i].scale == 6) {
					this.ssryazj_six.dzzj = data[i].scale;
					this.ssryazj_six.ssry = data[i].percentInjured;
				} else if (data[i].scale == 7) {
					this.ssryazj_seven.dzzj = data[i].scale;
					this.ssryazj_seven.ssry = data[i].percentInjured;
				} else if (data[i].scale == 8) {
					this.ssryazj_eight.dzzj = data[i].scale;
					this.ssryazj_eight.ssry = data[i].percentInjured;
				}
			}
		});
		//获取受伤人员按烈度
		request({ url: '/getInjuredALDdata', method: 'post' }).then(res => {
			let data = res.data.result;
			this.ssryald = data;
			for (let i = 0; i < data.length; i++) {
				if (data[i].scale == 'Ⅵ') {
					this.ssryald_six.dzld = data[i].scale;
					this.ssryald_six.ssry = data[i].percentInjured;
				} else if (data[i].scale == 'Ⅶ') {
					this.ssryald_seven.dzld = data[i].scale;
					this.ssryald_seven.ssry = data[i].percentInjured;
				} else if (data[i].scale == 'Ⅷ') {
					this.ssryald_eight.dzld = data[i].scale;
					this.ssryald_eight.ssry = data[i].percentInjured;
				} else if (data[i].scale == 'Ⅸ') {
					this.ssryald_nine.dzld = data[i].scale;
					this.ssryald_nine.ssry = data[i].percentInjured;
				} else if (data[i].scale == 'Ⅹ') {
					this.ssryald_ten.dzld = data[i].scale;
					this.ssryald_ten.ssry = data[i].percentInjured;
				}
			}
		});
	}
};
</script>
