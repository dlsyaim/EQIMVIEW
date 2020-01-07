<template>
	<div class="boxAllOn">
		<div class="boxContent">
			<div class="boxTop">
				<h3>需紧急安置</h3>
				<el-row class="heardTitle">
					<el-col :span="6">地震烈度</el-col>
					<el-col :span="6">低比例（适用上海）</el-col>
					<el-col :span="6">中比例</el-col>
					<el-col :span="6">高比例</el-col>
				</el-row>
				<el-row>
					<el-col :span="6"><el-input class="first_table_input" v-model="xjjaz_six.dzld" readonly></el-input></el-col>
					<el-col :span="6"><el-input class="first_table_input" v-model="xjjaz_six.dbl" :readonly="isEdit"></el-input></el-col>
					<el-col :span="6"><el-input class="first_table_input" v-model="xjjaz_six.zbl" :readonly="isEdit"></el-input></el-col>
					<el-col :span="6"><el-input class="first_table_input" v-model="xjjaz_six.gbl" :readonly="isEdit"></el-input></el-col>
					<el-col :span="6"><el-input class="first_table_input" v-model="xjjaz_seven.dzld" readonly></el-input></el-col>
					<el-col :span="6"><el-input class="first_table_input" v-model="xjjaz_seven.dbl" :readonly="isEdit"></el-input></el-col>
					<el-col :span="6"><el-input class="first_table_input" v-model="xjjaz_seven.zbl" :readonly="isEdit"></el-input></el-col>
					<el-col :span="6"><el-input class="first_table_input" v-model="xjjaz_seven.gbl" :readonly="isEdit"></el-input></el-col>
					<el-col :span="6"><el-input class="first_table_input" v-model="xjjaz_eight.dzld" readonly></el-input></el-col>
					<el-col :span="6"><el-input class="first_table_input" v-model="xjjaz_eight.dbl" :readonly="isEdit"></el-input></el-col>
					<el-col :span="6"><el-input class="first_table_input" v-model="xjjaz_eight.zbl" :readonly="isEdit"></el-input></el-col>
					<el-col :span="6"><el-input class="first_table_input" v-model="xjjaz_eight.gbl" :readonly="isEdit"></el-input></el-col>
					<el-col :span="6"><el-input class="first_table_input" v-model="xjjaz_nine.dzld" readonly></el-input></el-col>
					<el-col :span="6"><el-input class="first_table_input" v-model="xjjaz_nine.dbl" :readonly="isEdit"></el-input></el-col>
					<el-col :span="6"><el-input class="first_table_input" v-model="xjjaz_nine.zbl" :readonly="isEdit"></el-input></el-col>
					<el-col :span="6"><el-input class="first_table_input" v-model="xjjaz_nine.gbl" :readonly="isEdit"></el-input></el-col>
					<el-col :span="6"><el-input class="first_table_input" v-model="xjjaz_ten.dzld" readonly></el-input></el-col>
					<el-col :span="6"><el-input class="first_table_input" v-model="xjjaz_ten.dbl" :readonly="isEdit"></el-input></el-col>
					<el-col :span="6"><el-input class="first_table_input" v-model="xjjaz_ten.zbl" :readonly="isEdit"></el-input></el-col>
					<el-col :span="6"><el-input class="first_table_input" v-model="xjjaz_ten.gbl" :readonly="isEdit"></el-input></el-col>
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
import '../../../styles/comTable.css';
// import '@/views/systemManage/modelSetting/model6.scss' ;
export default {
	data() {
		return {
			//控制是否可编辑功能
			isEdit: true,
			//需紧急安置地震烈度VI
			xjjaz_six: {
				//地震烈度
				dzld: '',
				//低比例
				dbl: 0,
				//中比例
				zbl: 0,
				//高比例
				gbl: 0
			},
			//需紧急安置地震烈度VII
			xjjaz_seven: {
				//地震烈度
				dzld: '',
				//低比例
				dbl: 0,
				//中比例
				zbl: 0,
				//高比例
				gbl: 0
			},
			//需紧急安置地震烈度VIII
			xjjaz_eight: {
				//地震烈度
				dzld: '',
				//低比例
				dbl: 0,
				//中比例
				zbl: 0,
				//高比例
				gbl: 0
			},
			//需紧急安置地震烈度IX
			xjjaz_nine: {
				//地震烈度
				dzld: '',
				//低比例
				dbl: 0,
				//中比例
				zbl: 0,
				//高比例
				gbl: 0
			},
			//需紧急安置地震烈度X
			xjjaz_ten: {
				//地震烈度
				dzld: '',
				//低比例
				dbl: 0,
				//中比例
				zbl: 0,
				//高比例
				gbl: 0
			},
			//存放重置数据对象
			xjjaz: []
		};
	},
	methods: {
		//开启编辑功能
		openEdit() {
			this.isEdit = false;
		},
		//重置需紧急安置数据
		resetData() {
			let data = this.xjjaz;
			for (let i = 0; i < data.length; i++) {
				if (data[i].i == 'Ⅵ') {
					this.xjjaz_six.dzld = data[i].i;
					this.xjjaz_six.dbl = data[i].proportionLow;
					this.xjjaz_six.zbl = data[i].proportionMedium;
					this.xjjaz_six.gbl = data[i].proportionHigh;
				} else if (data[i].i == 'Ⅶ') {
					this.xjjaz_seven.dzld = data[i].i;
					this.xjjaz_seven.dbl = data[i].proportionLow;
					this.xjjaz_seven.zbl = data[i].proportionMedium;
					this.xjjaz_seven.gbl = data[i].proportionHigh;
				} else if (data[i].i == 'Ⅷ') {
					this.xjjaz_eight.dzld = data[i].i;
					this.xjjaz_eight.dbl = data[i].proportionLow;
					this.xjjaz_eight.zbl = data[i].proportionMedium;
					this.xjjaz_eight.gbl = data[i].proportionHigh;
				} else if (data[i].i == 'Ⅸ') {
					this.xjjaz_nine.dzld = data[i].i;
					this.xjjaz_nine.dbl = data[i].proportionLow;
					this.xjjaz_nine.zbl = data[i].proportionMedium;
					this.xjjaz_nine.gbl = data[i].proportionHigh;
				} else if (data[i].i == 'Ⅹ') {
					this.xjjaz_ten.dzld = data[i].i;
					this.xjjaz_ten.dbl = data[i].proportionLow;
					this.xjjaz_ten.zbl = data[i].proportionMedium;
					this.xjjaz_ten.gbl = data[i].proportionHigh;
				}
			}
		},
		//更新数据
		updateData() {
			let homelessParams = [this.xjjaz_six, this.xjjaz_seven, this.xjjaz_eight, this.xjjaz_nine, this.xjjaz_ten];
			request({ url: '/updateHomelessMemberData', method: 'post', data: JSON.stringify(homelessParams) }).then(res => {
				console.log(res);
				this.$message({ message: '修改成功！', type: 'success' });
			});
		}
	},
	created() {
		//获取无家可归人员模型数据
		request({ url: '/getHomelessMemberData', method: 'post' }).then(res => {
			let data = res.data.result;
			this.xjjaz = data;
			for (let i = 0; i < data.length; i++) {
				if (data[i].i == 'Ⅵ') {
					this.xjjaz_six.dzld = data[i].i;
					this.xjjaz_six.dbl = data[i].proportionLow;
					this.xjjaz_six.zbl = data[i].proportionMedium;
					this.xjjaz_six.gbl = data[i].proportionHigh;
				} else if (data[i].i == 'Ⅶ') {
					this.xjjaz_seven.dzld = data[i].i;
					this.xjjaz_seven.dbl = data[i].proportionLow;
					this.xjjaz_seven.zbl = data[i].proportionMedium;
					this.xjjaz_seven.gbl = data[i].proportionHigh;
				} else if (data[i].i == 'Ⅷ') {
					this.xjjaz_eight.dzld = data[i].i;
					this.xjjaz_eight.dbl = data[i].proportionLow;
					this.xjjaz_eight.zbl = data[i].proportionMedium;
					this.xjjaz_eight.gbl = data[i].proportionHigh;
				} else if (data[i].i == 'Ⅸ') {
					this.xjjaz_nine.dzld = data[i].i;
					this.xjjaz_nine.dbl = data[i].proportionLow;
					this.xjjaz_nine.zbl = data[i].proportionMedium;
					this.xjjaz_nine.gbl = data[i].proportionHigh;
				} else if (data[i].i == 'Ⅹ') {
					this.xjjaz_ten.dzld = data[i].i;
					this.xjjaz_ten.dbl = data[i].proportionLow;
					this.xjjaz_ten.zbl = data[i].proportionMedium;
					this.xjjaz_ten.gbl = data[i].proportionHigh;
				}
			}
			console.log(data);
		});
	},
};
</script>
