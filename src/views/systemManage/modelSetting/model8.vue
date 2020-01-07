<template>
	<div style="width:100%;height:100%;background:#f2f2f2">
		<div style="width:100%;height:480px;padding:20px;">
			<div style="width:95%;height:480px;padding:10px;background:#FFF;">
				<div style="width:100%;height:100%;">
					<div style="font-size:18px;">应急响应</div>
					
					<img :src="model8" style="width:100%;"/>
					
					<!-- <el-row style="width:100%;height:40px;">
						<el-col :span="12" style="text-align:center;">地震发生在省市内</el-col>
						<el-col :span="12" style="text-align:center;">地震发生在省外或海域且涉及到本省</el-col>
					</el-row>
					<el-row style="width:100%;line-height:40px;" :gutter="20">
						<el-col :span="12" style="line-height:40px;padding:4px;">
							<el-col :span="7" style="line-height:40px;">特别重大地震：</el-col>
							<el-col :span="5" style="line-height:40px;padding-top:10px;"><img :src="model8L0" /></el-col>
							<el-col :span="2" style="line-height:40px;">L0：</el-col>
							<el-col :span="10" style="line-height:40px;"><el-input type="text" size="mini" v-model="value"></el-input></el-col>
						</el-col>
						<el-col :span="12" style="line-height:40px;padding:4px;">
							<el-col :span="12" style="line-height:40px;padding-top:10px;text-align:center;"><img :src="model8S0" /></el-col>
							<el-col :span="2" style="line-height:40px;">S0：</el-col>
							<el-col :span="10" style="line-height:40px;"><el-input type="text" size="mini" v-model="value"></el-input></el-col>
						</el-col>
					</el-row>
					<el-row style="width:100%;line-height:40px;" :gutter="20">
						<el-col :span="12" style="line-height:40px;padding:4px;">
							<el-col :span="7" style="line-height:40px;">重大地震：</el-col>
							<el-col :span="5" style="line-height:40px;padding-top:10px;"><img :src="model8L1_L2" /></el-col>
							<el-col :span="12" style="line-height:40px;margin:0;padding:0;">
								<div style="line-height:20px;">
									<el-col :span="4">L1：</el-col>
									<el-col :span="20"><el-input type="text" size="mini" v-model="value"></el-input></el-col>
								</div>
								<div style="line-height:20px;">
									<el-col :span="4">L2：</el-col>
									<el-col :span="20"><el-input type="text" size="mini" v-model="value"></el-input></el-col>
								</div>
							</el-col>
						</el-col>
						<el-col :span="12" style="line-height:40px;padding:4px;">
							<el-col :span="12" style="line-height:40px;padding-top:10px;text-align:center;"><img :src="model8S0" /></el-col>
							<el-col :span="12" style="line-height:40px;margin:0;padding:0;">
								<div style="line-height:20px;">
									<el-col :span="4">S1：</el-col>
									<el-col :span="20"><el-input type="text" size="mini" v-model="value"></el-input></el-col>
								</div>
								<div style="line-height:20px;">
									<el-col :span="4">S2：</el-col>
									<el-col :span="20"><el-input type="text" size="mini" v-model="value"></el-input></el-col>
								</div>
							</el-col>
						</el-col>
					</el-row>
					<el-row style="width:100%;line-height:40px;" :gutter="20">
						<el-col :span="12" style="line-height:40px;padding:4px;">
							<el-col :span="7" style="line-height:40px;">较大地震：</el-col>
							<el-col :span="5" style="line-height:40px;padding-top:10px;"><img :src="model8L3_L4" /></el-col>
							<el-col :span="12" style="line-height:40px;margin:0;padding:0;">
								<div style="line-height:20px;">
									<el-col :span="4">L3：</el-col>
									<el-col :span="20"><el-input type="text" size="mini" v-model="value"></el-input></el-col>
								</div>
								<div style="line-height:20px;">
									<el-col :span="4">L4：</el-col>
									<el-col :span="20"><el-input type="text" size="mini" v-model="value"></el-input></el-col>
								</div>
							</el-col>
						</el-col>
						<el-col :span="12" style="line-height:40px;padding:4px;">
							<el-col :span="12" style="line-height:40px;padding-top:10px;text-align:center;"><img :src="model8S3_S4" /></el-col>
							<el-col :span="12" style="line-height:40px;margin:0;padding:0;">
								<div style="line-height:20px;">
									<el-col :span="4">S3：</el-col>
									<el-col :span="20"><el-input type="text" size="mini" v-model="value"></el-input></el-col>
								</div>
								<div style="line-height:20px;">
									<el-col :span="4">S4：</el-col>
									<el-col :span="20"><el-input type="text" size="mini" v-model="value"></el-input></el-col>
								</div>
							</el-col>
						</el-col>
					</el-row>
					<el-row style="width:100%;line-height:40px;" :gutter="20">
						<el-col :span="12" style="line-height:40px;padding:4px;">
							<el-col :span="7" style="line-height:40px;">一般地震：</el-col>
							<el-col :span="5" style="line-height:40px;padding-top:10px;"><img :src="model8L5_L6" /></el-col>
							<el-col :span="12" style="line-height:40px;margin:0;padding:0;">
								<div style="line-height:20px;">
									<el-col :span="4">L5：</el-col>
									<el-col :span="20"><el-input type="text" size="mini" v-model="value"></el-input></el-col>
								</div>
								<div style="line-height:20px;">
									<el-col :span="4">L6：</el-col>
									<el-col :span="20"><el-input type="text" size="mini" v-model="value"></el-input></el-col>
								</div>
							</el-col>
						</el-col>
						<el-col :span="12" style="line-height:40px;padding:4px;">
							<el-col :span="12" style="line-height:40px;padding-top:10px;text-align:center;"><img :src="model8S5_S6" /></el-col>
							<el-col :span="12" style="line-height:40px;margin:0;padding:0;">
								<div style="line-height:20px;">
									<el-col :span="4">S5：</el-col>
									<el-col :span="20"><el-input type="text" size="mini" v-model="value"></el-input></el-col>
								</div>
								<div style="line-height:20px;">
									<el-col :span="4">S6：</el-col>
									<el-col :span="20"><el-input type="text" size="mini" v-model="value"></el-input></el-col>
								</div>
							</el-col>
						</el-col>
					</el-row>
					<el-col style="text-align:center;margin-top: 20px;mabackground: #FFFFFF;">
						<el-button type="primary" size="mini" icon="el-icon-refresh">重置</el-button>
						<el-button type="primary" size="mini" icon="el-icon-check">保存</el-button>
					</el-col> -->
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import '@/views/systemManage/modelSetting/model8.scss';
import model8 from './model8.png';
// import model8L0 from './model8L0.png';
// import model8L1_L2 from './model8L1_L2.png';
// import model8L3_L4 from './model8L3_L4.png';
// import model8L5_L6 from './model8L5_L6.png';
// import model8S0 from './model8S0.png';
// import model8S1_S2 from './model8S1_S2.png';
// import model8S3_S4 from './model8S3_S4.png';
// import model8S5_S6 from './model8S5_S6.png';
export default {
	data() {
		return {
			model8: model8,
			// model8L1_L2: model8L1_L2,
			// model8L3_L4: model8L3_L4,
			// model8L5_L6: model8L5_L6,
			// model8S0: model8S0,
			// model8S1_S2: model8S1_S2,
			// model8S3_S4: model8S3_S4,
			// model8S5_S6: model8S5_S6,
			// value: 10
		};
	}
};
</script>
