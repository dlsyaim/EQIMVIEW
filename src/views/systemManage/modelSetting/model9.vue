<template>
	<div style="width:100%;height:100%;background:#f2f2f2">
		<div style="width:100%;height:100%;padding:20px;">
			<div style="width:100%;height:400px;background:#FFF;">
				<div style="width:100%;height:100%;">
					<div style="font-size:18px;padding: 10px;">救援队伍-按震级</div>
					<div style="width:100%;height:30%;padding:20px;">
						<div>【模型公式】</div>
						<img :src="img" style="margin-left:30px;" />
						<div>【参数说明】</div>
						<div style="padding:4px;">Re--表示救援队伍；M--表示地震震级；</div>
						<div style="padding:4px;">Di--表示受灾人数；</div>
						<div style="">【参数设置】</div>
						<div style="width:100%;line-height:30px;padding:4px;">
							<el-col :span="8">
								<el-col :span="4">L0：</el-col>
								<el-col :span="18"><el-input type="text" size="mini" v-model="rescueParam.l0" :readonly="isEdit"></el-input></el-col>
							</el-col>
							<el-col :span="8">
								<el-col :span="4">L1：</el-col>
								<el-col :span="18"><el-input type="text" size="mini" v-model="rescueParam.l1" :readonly="isEdit"></el-input></el-col>
							</el-col>
							<el-col :span="8">
								<el-col :span="4">L2：</el-col>
								<el-col :span="18"><el-input type="text" size="mini" v-model="rescueParam.l2" :readonly="isEdit"></el-input></el-col>
							</el-col>
						</div>
					</div>
					<el-col style="text-align:center;background: #FFFFFF;margin-top: 20px;">
						<el-button type="primary" icon="el-icon-edit" size="mini" @click="openEdit">编辑</el-button>
						<el-button type="primary" size="mini" icon="el-icon-refresh" @click="rescueReset">重置</el-button>
						<el-button type="primary" size="mini" icon="el-icon-check" @click="rescueSave">保存</el-button>
					</el-col>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
* {
	box-sizing: border-box;
}
</style>
<script>
import Img from './model9Formula.png';
import request from '@/utils/request';
export default {
	data() {
		return {
			//救援队伍参数
			rescueParam: {
				l0: 0,
				l1: 0,
				l2: 0
			},
			img: Img,
			//控制救援队伍参数是否可以编辑
			isEdit: true,
			//存放修改前的参数
			saveOriginData:{}
		};
	},
	created() {},
	mounted() {
		//获取救援队伍模型所有参数
		this.getRescueParams();
	},
	methods: {
		//开启参数编辑功能
		openEdit(){
			this.isEdit=false;
		},
		//获取救援队伍模型所有参数
		getRescueParams(){
			request({
				url:'/getRescueParams',
				method:'get'
			}).then(res => {
					let data=res.data.result;
					this.rescueParam.l0=data.l0;
					this.rescueParam.l1=data.l1;
					this.rescueParam.l2=data.l2;
					//存放修改前的参数
					this.saveOriginData=data;
			});
		},
		rescueReset() {
			let data = this.saveOriginData;
			this.rescueParam.l0=data.l0;
			this.rescueParam.l1=data.l1;
			this.rescueParam.l2=data.l2;
		},
		rescueSave() {
			var rescueData = this.rescueParam;
			request({
				url: '/addRescue',
				method: 'post',
				data: rescueData
			}).then(response => {
					const result = response.data;
					if (result.success == true) {
						this.$message({
							type: 'success',
							message: '保存成功!',
							centerDialogVisible: false,
							created: true
						});
						this.rescueReset();
					}
				});
		}
	}
};
</script>
