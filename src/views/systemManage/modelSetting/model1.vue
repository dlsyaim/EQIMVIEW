<template>
	<div class="boxAll">
		<div class="boxCenter">
			<h3>条件查询</h3>
			<el-form style="margin-top:15px;" label-width="150px" inline size="medium">
				<el-col :span="12">
					<el-form-item label="建筑破坏评估模型：">
						<el-select v-model="evaluationModel.jzphpgmxValue" size="mini">
							<el-option v-for="item in evaluationModel.jzphpgmxSelect" :key="item.value" :label="item.value" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="死亡人员评估模型：">
						<el-select v-model="evaluationModel.swrypgmxValue" size="mini">
							<el-option v-for="item in evaluationModel.swrypgmxSelect" :key="item.value" :label="item.value" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="受伤人员评估模型：">
						<el-select v-model="evaluationModel.ssrypgmxValue" size="mini">
							<el-option v-for="item in evaluationModel.ssrypgmxSelect" :key="item.value" :label="item.value" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="紧急安置评估模型：">
						<el-select v-model="evaluationModel.jjazpgmxValue" size="mini">
							<el-option v-for="item in evaluationModel.jjazpgmxSelect" :key="item.value" :label="item.value" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="压埋人员评估模型：">
						<el-select v-model="evaluationModel.ymrypgmxValue" size="mini">
							<el-option v-for="item in evaluationModel.ymrypgmxSelect" :key="item.value" :label="item.value" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="经济损失评估模型：">
						<el-select v-model="evaluationModel.jjsspgmxValue" size="mini">
							<el-option v-for="item in evaluationModel.jjsspgmxSelect" :key="item.value" :label="item.value" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-form>
			<div class="btnCenter">
				<el-button type="primary" size="mini" icon="el-icon-refresh" @click="resetField">重置</el-button>
				<el-button type="primary" size="mini" icon="el-icon-check" @click="saveData()">保存</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import request from '@/utils/request';
export default {
	data() {
		return {
			evaluationModel: {
				//建筑破坏评估模型
				jzphpgmxValue:'',
				jzphpgmxSelect:[],
				//死亡人员评估模型
				swrypgmxValue:'',
				swrypgmxSelect:[],
				//受伤人员评估模型
				ssrypgmxValue:'',
				ssrypgmxSelect:[],
				//紧急安置评估模型
				jjazpgmxValue:'',
				jjazpgmxSelect:[],
				//压埋人员评估模型
				ymrypgmxValue:'',
				ymrypgmxSelect:[],
				//经济损失评估模型
				jjsspgmxValue:'',
				jjsspgmxSelect:[],
			},
			
		}
	},
	methods:{
		//获取模型类型数据
		getModelMappingData(){
			request({url:'/getModelMappingData',method:'get'}).then(res =>{
				let data = res.data.result;
				console.log(data);
				data.forEach(item => {
					let selectColumn = {};
					if(item.description == '建筑破坏评估模型'){
						selectColumn = {
							label:item.modelOption,
							value:item.modelOption
						};
						this.evaluationModel.jzphpgmxSelect.push(selectColumn);
					}else if(item.description == '死亡人员评估模型'){
						selectColumn = {
							label:item.modelOption,
							value:item.modelOption
						};
						this.evaluationModel.swrypgmxSelect.push(selectColumn);
					}else if(item.description == '受伤人员评估模型'){
						selectColumn = {
							label:item.modelOption,
							value:item.modelOption
						};
						this.evaluationModel.ssrypgmxSelect.push(selectColumn);
					}else if(item.description == '紧急安置评估模型'){
						selectColumn = {
							label:item.modelOption,
							value:item.modelOption
						};
						this.evaluationModel.jjazpgmxSelect.push(selectColumn);
					}else if(item.description == '压埋人员评估模型'){
						selectColumn = {
							label:item.modelOption,
							value:item.modelOption
						};
						this.evaluationModel.ymrypgmxSelect.push(selectColumn);
					}else if(item.description == '经济损失评估模型'){
						selectColumn = {
							label:item.modelOption,
							value:item.modelOption
						};
						this.evaluationModel.jjsspgmxSelect.push(selectColumn);
					}
				});
			});
		},
		//获取设置的默认参数
		getDefaultModelParams(){
			request({url:'/getDefaultModelParams',method:'get'}).then(res =>{
				let data = res.data.result;
				data.forEach(item =>{
					if(item.description == '建筑破坏评估模型'){
						this.evaluationModel.jzphpgmxValue = item.modelOption;
					}else if(item.description == '死亡人员评估模型'){
						this.evaluationModel.swrypgmxValue = item.modelOption;
					}else if(item.description == '受伤人员评估模型'){
						this.evaluationModel.ssrypgmxValue = item.modelOption;
					}else if(item.description == '紧急安置评估模型'){
						this.evaluationModel.jjazpgmxValue = item.modelOption;
					}else if(item.description == '压埋人员评估模型'){
						this.evaluationModel.ymrypgmxValue = item.modelOption;
					}else if(item.description == '经济损失评估模型'){
						this.evaluationModel.jjsspgmxValue = item.modelOption;
					}
				});
			});
		},
		//添加或修改模型默认参数
		addOrUpdateModelSettingData(){
			//建筑破坏评估模型
			let jzphpgmx={description:'建筑破坏评估模型',modelOption:this.evaluationModel.jzphpgmxValue};
			//死亡人员评估模型
			let swrypgmx={description:'死亡人员评估模型',modelOption:this.evaluationModel.swrypgmxValue};
			//受伤人员评估模型
			let ssrypgmx={description:'受伤人员评估模型',modelOption:this.evaluationModel.ssrypgmxValue};
			//紧急安置评估模型
			let jjazpgmx={description:'紧急安置评估模型',modelOption:this.evaluationModel.jjazpgmxValue};
			//压埋人员评估模型
			let ymrypgmx={description:'压埋人员评估模型',modelOption:this.evaluationModel.ymrypgmxValue};
			//经济损失评估模型
			let jjsspgmx={description:'经济损失评估模型',modelOption:this.evaluationModel.jjsspgmxValue};
			let params=[jzphpgmx,swrypgmx,ssrypgmx,jjazpgmx,ymrypgmx,jjsspgmx];
			request({url:'/addOrupdateModelSettingData',method:'post',data:JSON.stringify(params)}).then(res =>{
				res.data;
				this.$message({ message: '保存成功！', type: 'success' });
			});
		},
		//重置参数
		resetField(){
			this.evaluationModel.jzphpgmxValue='';
			this.evaluationModel.ssrypgmxValue='';
			this.evaluationModel.swrypgmxValue='';
			this.evaluationModel.ymrypgmxValue='';
			this.evaluationModel.jjazpgmxValue='';
			this.evaluationModel.jjsspgmxValue='';
		},
		//保存修改后的参数
		saveData(){
			this.addOrUpdateModelSettingData();
		}
	},
	mounted(){
		//获取模型下拉内容
		this.getModelMappingData();
		//获取设置的默认模型参数
		this.getDefaultModelParams();
	}
};
</script>
<style>
* {
	box-sizing: border-box !important;
}
.boxAll {
	width: 100%;
	height: 100%;
	background: rgb(242, 242, 242);
	overflow: hidden;
}
.boxAll .boxCenter{
	width: 98%;
	margin: 10px auto;
	padding: 15px;
	background: #FFFFFF;
}
.boxAll .boxCenter h3 {
	font-size: 18px;
	font-weight: normal;
}
.boxAll .boxCenter  .btnCenter {
	text-align: center;
}
</style>
