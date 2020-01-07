<template>
	<div class="boxAllOn">
		<div class="boxContent">
			<div class="boxTop">
				<h3>压埋人员-建筑比例</h3>
				<el-row class="heardTitle">
					<el-col :span="12">建筑类型</el-col>
					<el-col :span="12">压埋比例</el-col>
				</el-row>
				<el-row>
					<el-col :span="12"><el-input v-model="jzlx_gcjz.jzlx" readonly></el-input></el-col>
					<el-col :span="12"><el-input v-model="jzlx_gcjz.ymbl" :readonly="isEdit"></el-input></el-col>
					<el-col :span="12"><el-input v-model="jzlx_gjhn.jzlx" readonly></el-input></el-col>
					<el-col :span="12"><el-input v-model="jzlx_gjhn.ymbl" :readonly="isEdit"></el-input></el-col>
					<el-col :span="12"><el-input v-model="jzlx_dcqt.jzlx" readonly></el-input></el-col>
					<el-col :span="12"><el-input v-model="jzlx_dcqt.ymbl" :readonly="isEdit"></el-input></el-col>
					<el-col :span="12"><el-input v-model="jzlx_ljmf.jzlx" readonly></el-input></el-col>
					<el-col :span="12"><el-input v-model="jzlx_ljmf.ymbl" :readonly="isEdit"></el-input></el-col>
					<el-col :span="12"><el-input v-model="jzlx_dccf.jzlx" readonly></el-input></el-col>
					<el-col :span="12"><el-input v-model="jzlx_dccf.ymbl" :readonly="isEdit"></el-input></el-col>
				</el-row>
			</div>

			<div class="boxCenter">
				<h3>压埋人员-城市比例</h3>
				<el-row class="heardTitle">
					<el-col :span="12">城市类型</el-col>
					<el-col :span="12">压埋比例</el-col>
				</el-row>
				<el-row>
					<el-col :span="12"><el-input v-model="cslx_tdcs.cslx" readonly></el-input></el-col>
					<el-col :span="12"><el-input v-model="cslx_tdcs.ymbl" :readonly="isEdit"></el-input></el-col>
					<el-col :span="12"><el-input v-model="cslx_dcs.cslx" readonly></el-input></el-col>
					<el-col :span="12"><el-input v-model="cslx_dcs.ymbl" :readonly="isEdit"></el-input></el-col>
					<el-col :span="12"><el-input v-model="cslx_ybcs.cslx" readonly></el-input></el-col>
					<el-col :span="12"><el-input v-model="cslx_ybcs.ymbl" :readonly="isEdit"></el-input></el-col>
					<el-col :span="12"><el-input v-model="cslx_xc.cslx" readonly></el-input></el-col>
					<el-col :span="12"><el-input v-model="cslx_xc.ymbl" :readonly="isEdit"></el-input></el-col>
					<el-col :span="12"><el-input v-model="cslx_nc.cslx" readonly></el-input></el-col>
					<el-col :span="12"><el-input v-model="cslx_nc.ymbl" :readonly="isEdit"></el-input></el-col>
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
// import '@/views/systemManage/modelSetting/model5.scss'
export default {
	data() {
		return {
			isEdit: true,
			//压埋人员建筑比例

			//建筑类型高层建筑
			jzlx_gcjz: {
				jzlx: '',
				ymbl: 0
			},
			//建筑类型钢筋混凝
			jzlx_gjhn: {
				jzlx: '',
				ymbl: 0
			},
			//建筑类型多层砌体
			jzlx_dcqt: {
				jzlx: '',
				ymbl: 0
			},
			//建筑类型老旧民房
			jzlx_ljmf: {
				jzlx: '',
				ymbl: 0
			},
			//建筑类型单层厂房
			jzlx_dccf: {
				jzlx: '',
				ymbl: 0
			},

			//压埋人员城市比例
			//城市类型特大城市
			cslx_tdcs: {
				cslx: '',
				ymbl: 0
			},
			//城市类型大城市
			cslx_dcs: {
				cslx: '',
				ymbl: 0
			},
			//城市类型一般城市
			cslx_ybcs: {
				cslx: '',
				ymbl: 0
			},
			//城市类型县城
			cslx_xc: {
				cslx: '',
				ymbl: 0
			},
			//城市类型农村
			cslx_nc: {
				cslx: '',
				ymbl: 0
			},
			//存放重置建筑比例数据
			jzbl: [],
			//存放重置城市比例数据
			csbl: []
		};
	},
	methods: {
		//开启编辑功能
		openEdit() {
			this.isEdit = false;
		},
		//重置数据
		resetData() {
			//重置建筑类型数据
			let data = this.jzbl;
			for (let i = 0; i < data.length; i++) {
				if (data[i].category == '高层建筑') {
					this.jzlx_gcjz.jzlx = data[i].category;
					this.jzlx_gcjz.ymbl = data[i].percentBuried;
				} else if (data[i].category == '钢筋混凝') {
					this.jzlx_gjhn.jzlx = data[i].category;
					this.jzlx_gjhn.ymbl = data[i].percentBuried;
				} else if (data[i].category == '多层砌体') {
					this.jzlx_dcqt.jzlx = data[i].category;
					this.jzlx_dcqt.ymbl = data[i].percentBuried;
				} else if (data[i].category == '老旧民房') {
					this.jzlx_ljmf.jzlx = data[i].category;
					this.jzlx_ljmf.ymbl = data[i].percentBuried;
				} else if (data[i].category == '单层厂房') {
					this.jzlx_dccf.jzlx = data[i].category;
					this.jzlx_dccf.ymbl = data[i].percentBuried;
				}
			}
			//重置城市类型数据
			let data1 = this.csbl;
			for (let i = 0; i < data1.length; i++) {
				if (data1[i].category == '特大城市') {
					this.cslx_tdcs.cslx = data1[i].category;
					this.cslx_tdcs.ymbl = data1[i].percentBuried;
				} else if (data1[i].category == '大城市') {
					this.cslx_dcs.cslx = data1[i].category;
					this.cslx_dcs.ymbl = data1[i].percentBuried;
				} else if (data1[i].category == '一般城市') {
					this.cslx_ybcs.cslx = data1[i].category;
					this.cslx_ybcs.ymbl = data1[i].percentBuried;
				} else if (data1[i].category == '县城') {
					this.cslx_xc.cslx = data1[i].category;
					this.cslx_xc.ymbl = data1[i].percentBuried;
				} else if (data1[i].category == '农村') {
					this.cslx_nc.cslx = data1[i].category;
					this.cslx_nc.ymbl = data1[i].percentBuried;
				}
			}
		},
		updateData() {
			alert('更新数据');
			//更新压埋人员建筑比例模型数据
			let ajzblParams = [this.jzlx_gcjz, this.jzlx_gjhn, this.jzlx_dcqt, this.jzlx_ljmf, this.jzlx_dccf];
			request({ url: '/updateBuriedAJZBLdata', method: 'post', data: JSON.stringify(ajzblParams) });
			//更新压埋人员城市比例模型数据
			let acsblParams = [this.cslx_tdcs, this.cslx_dcs, this.cslx_ybcs, this.cslx_xc, this.cslx_nc];
			request({ url: '/updateBuriedACSBLdata', method: 'post', data: JSON.stringify(acsblParams) }).then(res => {
				console.log(res);
				this.$message({ message: '修改成功！', type: 'success' });
			});
		}
	},
	created() {
		//获取压埋人员按建筑比数据
		request({ url: '/getBuridAZJBLdata', method: 'post' }).then(res => {
			let data = res.data.result;
			this.jzbl = data;
			for (let i = 0; i < data.length; i++) {
				if (data[i].category == '高层建筑') {
					this.jzlx_gcjz.jzlx = data[i].category;
					this.jzlx_gcjz.ymbl = data[i].percentBuried;
				} else if (data[i].category == '钢筋混凝') {
					this.jzlx_gjhn.jzlx = data[i].category;
					this.jzlx_gjhn.ymbl = data[i].percentBuried;
				} else if (data[i].category == '多层砌体') {
					this.jzlx_dcqt.jzlx = data[i].category;
					this.jzlx_dcqt.ymbl = data[i].percentBuried;
				} else if (data[i].category == '老旧民房') {
					this.jzlx_ljmf.jzlx = data[i].category;
					this.jzlx_ljmf.ymbl = data[i].percentBuried;
				} else if (data[i].category == '单层厂房') {
					this.jzlx_dccf.jzlx = data[i].category;
					this.jzlx_dccf.ymbl = data[i].percentBuried;
				}
			}
			console.log(data);
		});

		//获取压埋人员按城市比例数据
		request({ url: '/getBuridACSBLdata', method: 'post' }).then(res => {
			let data = res.data.result;
			this.csbl = data;
			for (let i = 0; i < data.length; i++) {
				if (data[i].category == '特大城市') {
					this.cslx_tdcs.cslx = data[i].category;
					this.cslx_tdcs.ymbl = data[i].percentBuried;
				} else if (data[i].category == '大城市') {
					this.cslx_dcs.cslx = data[i].category;
					this.cslx_dcs.ymbl = data[i].percentBuried;
				} else if (data[i].category == '一般城市') {
					this.cslx_ybcs.cslx = data[i].category;
					this.cslx_ybcs.ymbl = data[i].percentBuried;
				} else if (data[i].category == '县城') {
					this.cslx_xc.cslx = data[i].category;
					this.cslx_xc.ymbl = data[i].percentBuried;
				} else if (data[i].category == '农村') {
					this.cslx_nc.cslx = data[i].category;
					this.cslx_nc.ymbl = data[i].percentBuried;
				}
			}
		});
	}
};
</script>
