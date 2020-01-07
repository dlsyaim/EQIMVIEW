<template>
	<div class="boxMain">
		<div class="boxDefult">
			<h3>救援力量-按震级</h3>
			<h4>【模型公式】</h4>
			<img src="@/views/systemManage/modelSetting/model10-1.jpg" />
			<h4>【参数说明】</h4>
			<p>
				<span>Re--表示救援队伍;</span>
				<span>De--表示死亡人数</span>
			</p>
			<el-row class="search">
				<el-col :span="6">
					<el-row>
						<el-col :span="4">L0：</el-col>
						<el-col :span="16"><el-input type="text" size="mini" v-model="rescueParam.force0" :readonly="isEdit"></el-input></el-col>
					</el-row>
				</el-col>

				<el-col :span="6">
					<el-row>
						<el-col :span="4">L1：</el-col>
						<el-col :span="16"><el-input type="text" size="mini" v-model="rescueParam.force1" :readonly="isEdit"></el-input></el-col>
					</el-row>
				</el-col>

				<el-col :span="6">
					<el-row>
						<el-col :span="4">L2：</el-col>
						<el-col :span="16"><el-input type="text" size="mini" v-model="rescueParam.force2" :readonly="isEdit"></el-input></el-col>
					</el-row>
				</el-col>

				<el-col :span="6">
					<el-row>
						<el-col :span="4">L3：</el-col>
						<el-col :span="16"><el-input type="text" size="mini" v-model="rescueParam.force3" :readonly="isEdit"></el-input></el-col>
					</el-row>
				</el-col>

				<el-col :span="6">
					<el-row>
						<el-col :span="4">L4：</el-col>
						<el-col :span="16"><el-input type="text" size="mini" v-model="rescueParam.force4" :readonly="isEdit"></el-input></el-col>
					</el-row>
				</el-col>

				<el-col :span="6">
					<el-row>
						<el-col :span="4">L5：</el-col>
						<el-col :span="16"><el-input type="text" size="mini" v-model="rescueParam.force5" :readonly="isEdit"></el-input></el-col>
					</el-row>
				</el-col>

				<el-col :span="6">
					<el-row>
						<el-col :span="4">L6：</el-col>
						<el-col :span="16"><el-input type="text" size="mini" v-model="rescueParam.force6" :readonly="isEdit"></el-input></el-col>
					</el-row>
				</el-col>
			</el-row>
		</div>

		<div class="boxDefult">
			<h3>医务人员</h3>
			<h4>【模型公式】</h4>
			<img src="@/views/systemManage/modelSetting/model10-2.jpg" />
			<h4>【参数说明】</h4>
			<p>
				<span>Dr--表示医务人员;</span>
				<span>Re--表示救援队伍;</span>
				<span>In--表示受伤人数;</span>
				<span>De--表示死亡人数</span>
			</p>
			<el-row class="search">
				<el-col :span="6">
					<el-row>
						<el-col :span="4">L0：</el-col>
						<el-col :span="16"><el-input type="text" size="mini" v-model="rescueParam.medicalStaff0" :readonly="isEdit"></el-input></el-col>
					</el-row>
				</el-col>
				<el-col :span="6">
					<el-row>
						<el-col :span="4">L1：</el-col>
						<el-col :span="16"><el-input type="text" size="mini" v-model="rescueParam.medicalStaff1" :readonly="isEdit"></el-input></el-col>
					</el-row>
				</el-col>
				<el-col :span="6">
					<el-row>
						<el-col :span="4">L2：</el-col>
						<el-col :span="16"><el-input type="text" size="mini" v-model="rescueParam.medicalStaff2" :readonly="isEdit"></el-input></el-col>
					</el-row>
				</el-col>
				<el-col :span="6">
					<el-row>
						<el-col :span="4">L3：</el-col>
						<el-col :span="16"><el-input type="text" size="mini" v-model="rescueParam.medicalStaff3" :readonly="isEdit"></el-input></el-col>
					</el-row>
				</el-col>
			</el-row>
		</div>

		<div class="boxDefult">
			<h3>防疫人员</h3>
			<h4>【模型公式】</h4>
			<img src="@/views/systemManage/modelSetting/model10-2.jpg" />
			<h4>【参数说明】</h4>
			<p>
				<span>Epiper--表示防疫人员;</span>
				<span>De--表示死亡人数</span>
			</p>
			<el-row class="search">
				<el-col :span="6">
					<el-row>
						<el-col :span="4">L0：</el-col>
						<el-col :span="16"><el-input type="text" size="mini" v-model="rescueParam.epidemicPrevention0" :readonly="isEdit"></el-input></el-col>
					</el-row>
				</el-col>
				<el-col :span="6">
					<el-row>
						<el-col :span="4">L1：</el-col>
						<el-col :span="16"><el-input type="text" size="mini" v-model="rescueParam.epidemicPrevention1" :readonly="isEdit"></el-input></el-col>
					</el-row>
				</el-col>
				<el-col :span="6">
					<el-row>
						<el-col :span="4">L2：</el-col>
						<el-col :span="16"><el-input type="text" size="mini" v-model="rescueParam.epidemicPrevention2" :readonly="isEdit"></el-input></el-col>
					</el-row>
				</el-col>
				<el-col :span="6">
					<el-row>
						<el-col :span="4">L3：</el-col>
						<el-col :span="16"><el-input type="text" size="mini" v-model="rescueParam.epidemicPrevention3" :readonly="isEdit"></el-input></el-col>
					</el-row>
				</el-col>
			</el-row>
			<div class="boxBtn">
				<el-button type="primary" icon="el-icon-edit" size="mini" @click="openEdit">编辑</el-button>
				<el-button type="primary" size="mini" icon="el-icon-refresh" @click="reset">重置</el-button>
				<el-button type="primary" size="mini" icon="el-icon-check" @click="onSubmit">保存</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import '../../../styles/modelNumber.css';
import request from '@/utils/request';
export default {
	data() {
		return {
			rescueParam: {
				force0: null,
				force1: null,
				force2: null,
				force3: null,
				force4: null,
				force5: null,
				force6: null,
				medicalStaff0: null,
				medicalStaff1: null,
				medicalStaff2: null,
				medicalStaff3: null,
				epidemicPrevention0: null,
				epidemicPrevention1: null,
				epidemicPrevention2: null,
				epidemicPrevention3: null,
			},
			//存放修改前的参数对象
			saveOriginData:{},
			//控制输入框是否可编辑
			isEdit:true
			
		}
	},
	mounted(){
		this.getRescueForceParams();
	},
	methods: {
		//开启输入框编辑功能
		openEdit(){
			this.isEdit=false;
		},
		//获取最新救援力量模型参数
		getRescueForceParams(){
			request({
				url:'/getRescueForceParams',
				method:'get'
			}).then(res => {
				let data=res.data.result;
				this.rescueParam.force0=data.force0;
				this.rescueParam.force1=data.force1;
				this.rescueParam.force2=data.force2;
				this.rescueParam.force3=data.force3;
				this.rescueParam.force4=data.force4;
				this.rescueParam.force5=data.force5;
				this.rescueParam.force6=data.force6;
				this.rescueParam.medicalStaff0=data.medicalStaff0;
				this.rescueParam.medicalStaff1=data.medicalStaff1;
				this.rescueParam.medicalStaff2=data.medicalStaff2;
				this.rescueParam.medicalStaff3=data.medicalStaff3;
				this.rescueParam.epidemicPrevention0=data.epidemicPrevention0;
				this.rescueParam.epidemicPrevention1=data.epidemicPrevention1;
				this.rescueParam.epidemicPrevention2=data.epidemicPrevention2;
				this.rescueParam.epidemicPrevention3=data.epidemicPrevention3;
				//存放修改前的参数
				this.saveOriginData=data;
			});
		},
		//保存修改后的模型参数
		onSubmit() {
			var rescueData = this.rescueParam;
			request({
				url: '/addRescueForceModel',
				method: 'post',
				data: rescueData
				// ,medicalData,epWorkerDate
			})
				.then(response => {
					const result = response.data;
					if (result.success == true) {
						this.$message({
							type: 'success',
							message: '保存成功!',
							centerDialogVisible: false,
							created: true
						});
					}
				})
				.catch(response => {
					console.log(response);
				});
		},
		//重置参数
		reset() {
			let data=this.saveOriginData;
			this.rescueParam.force0=data.force0;
			this.rescueParam.force1=data.force1;
			this.rescueParam.force2=data.force2;
			this.rescueParam.force3=data.force3;
			this.rescueParam.force4=data.force4;
			this.rescueParam.force5=data.force5;
			this.rescueParam.force6=data.force6;
			this.rescueParam.medicalStaff0=data.medicalStaff0;
			this.rescueParam.medicalStaff1=data.medicalStaff1;
			this.rescueParam.medicalStaff2=data.medicalStaff2;
			this.rescueParam.medicalStaff3=data.medicalStaff3;
			this.rescueParam.epidemicPrevention0=data.epidemicPrevention0;
			this.rescueParam.epidemicPrevention1=data.epidemicPrevention1;
			this.rescueParam.epidemicPrevention2=data.epidemicPrevention2;
			this.rescueParam.epidemicPrevention3=data.epidemicPrevention3;
		}
	}
};
</script>
