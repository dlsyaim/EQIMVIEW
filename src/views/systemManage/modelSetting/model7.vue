<template>
	<div class="boxAllOn">
		<div class="boxContent">
			<div class="boxTop">
				<h3>经济损失-按烈度</h3>
				<el-row class="heardTitle">
					<el-col :span="12">地震烈度</el-col>
					<el-col :span="12">经济损失</el-col>
				</el-row>
				<el-row>
					<el-col :span="12"><el-input v-model="jjss_sixRegion.dzld" readonly></el-input></el-col>
					<el-col :span="12"><el-input v-model="jjss_sixRegion.jjss" :readonly="isEidt"></el-input></el-col>
					<el-col :span="12"><el-input v-model="jjss_sevenRegion.dzld" readonly></el-input></el-col>
					<el-col :span="12"><el-input v-model="jjss_sevenRegion.jjss" :readonly="isEidt"></el-input></el-col>
					<el-col :span="12"><el-input v-model="jjss_eightRegion.dzld" readonly></el-input></el-col>
					<el-col :span="12"><el-input v-model="jjss_eightRegion.jjss" :readonly="isEidt"></el-input></el-col>
					<el-col :span="12"><el-input v-model="jjss_beyondNineRegion.dzld" readonly></el-input></el-col>
					<el-col :span="12"><el-input v-model="jjss_beyondNineRegion.jjss" :readonly="isEidt"></el-input></el-col>
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
// import '@/views/systemManage/modelSetting/model7.scss';
export default {
	data() {
		return {
			//控制编辑功能
			isEidt: true,
			//经济损失按烈度
			//6度区
			jjss_sixRegion: {
				//地震烈度
				dzld: '',
				//经济损失
				jjss: 0
			},
			//7度区
			jjss_sevenRegion: {
				//地震烈度
				dzld: '',
				//经济损失
				jjss: 0
			},
			//8度区
			jjss_eightRegion: {
				//地震烈度
				dzld: '',
				//经济损失
				jjss: 0
			},
			//9度区及以上
			jjss_beyondNineRegion: {
				//地震烈度
				dzld: '',
				//经济损失
				jjss: 0
			},
			//用于存放重置经济损失数据对象
			jjss: []
		};
	},
	methods: {
		//开启编辑功能
		openEdit() {
			this.isEidt = false;
		},
		//重置编辑的数据
		resetData() {
			let data = this.jjss;
			for (let i = 0; i < data.length; i++) {
				if (data[i].i == '6度区') {
					this.jjss_sixRegion.dzld = data[i].i;
					this.jjss_sixRegion.jjss = data[i].economicLosses;
				} else if (data[i].i == '7度区') {
					this.jjss_sevenRegion.dzld = data[i].i;
					this.jjss_sevenRegion.jjss = data[i].economicLosses;
				} else if (data[i].i == '8度区') {
					this.jjss_eightRegion.dzld = data[i].i;
					this.jjss_eightRegion.jjss = data[i].economicLosses;
				} else if (data[i].i == '9度区及以上') {
					this.jjss_beyondNineRegion.dzld = data[i].i;
					this.jjss_beyondNineRegion.jjss = data[i].economicLosses;
				}
			}
		},
		//更新经济损失数据
		updateData() {
			let economicLossesParams = [this.jjss_sixRegion, this.jjss_sevenRegion, this.jjss_eightRegion, this.jjss_beyondNineRegion];
			request({ url: '/updateEconomicLossesData', method: 'post', data: JSON.stringify(economicLossesParams) }).then(res => {
				console.log(res);
				this.$message({
					message: '修改成功',
					type: 'success'
				});
			});
		}
	},
	created() {
		//获取经济损失数据
		request({ url: '/getEconomicLossesData', method: 'get' }).then(res => {
			let data = res.data.result;
			this.jjss = data;
			for (let i = 0; i < data.length; i++) {
				if (data[i].i == '6度区') {
					this.jjss_sixRegion.dzld = data[i].i;
					this.jjss_sixRegion.jjss = data[i].economicLosses;
				} else if (data[i].i == '7度区') {
					this.jjss_sevenRegion.dzld = data[i].i;
					this.jjss_sevenRegion.jjss = data[i].economicLosses;
				} else if (data[i].i == '8度区') {
					this.jjss_eightRegion.dzld = data[i].i;
					this.jjss_eightRegion.jjss = data[i].economicLosses;
				} else if (data[i].i == '9度区及以上') {
					this.jjss_beyondNineRegion.dzld = data[i].i;
					this.jjss_beyondNineRegion.jjss = data[i].economicLosses;
				}
			}
			console.log(data);
		});
	},
	mounted() {
	}
};
</script>
