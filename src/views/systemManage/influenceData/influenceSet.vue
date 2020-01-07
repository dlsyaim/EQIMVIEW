<template>
<div style="width:100%;height:100%;background:#f2f2f2;">
  <div style="width:100%;height:100%;padding:20px;padding-top:5px;padding-buttom:5px;">
    <!-- 衰减公式设置页面 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="衰减公式设置" name="first">
        <div style="width:100%;height:90%;">
          <el-form
            style="height:100%;border-radius:5px;"
            label-width="150px"
            :inline="true"
            size="mini"
          >
            <div style="width:100%;height:110px;background:#FFF;">
              <el-col :span="24" style="margin-top:15px;">
                <el-col :span="5">模型名称：</el-col>
                <el-col :span="12">
                  <el-select size="mini" v-model="formulaParam.modelName" :readonly="isEdit">
                    <el-option label="上海(中国地震第19卷第4期(石树中，沈建文2013年3月))" value="上海(中国地震第19卷第4期(石树中，沈建文2013年3月))"></el-option>
                  </el-select>
                </el-col>
              </el-col>
              <el-col :span="24" style="margin-top:20px;">
                <el-col :span="5">公式来源：</el-col>
                <el-col :span="6">
                  <el-input type="text" size="mini" v-model="formulaParam.formulaFrom" :readonly="isEdit"></el-input>
                </el-col>
              </el-col>
            </div>
            <div style="width:100%;height:240px;background:#FFF;margin-top:10px;">
              <div style="width:100%;height:100%;">
                <div style="width:100%;height:10px;"></div>
                <div style="font-size:18px;margin-top:5px;">衰减模型</div>             
                <el-col :span="24" style="margin-top:10px;">
                  <el-col :span="5">长轴：</el-col>
                  <el-col :span="6">
                    <el-input type="text" size="mini" v-model="longAxis" readonly="true"></el-input>
                  </el-col>
                </el-col>
                <el-col :span="24" style="margin-top:20px;">
                  <el-col :span="6">
                    <el-col :span="4">L1：</el-col>
                    <el-col :span="20">
                      <el-input type="text" size="mini" v-model="formulaParam.l1" :readonly="isEdit"></el-input>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-col :span="4">L2：</el-col>
                    <el-col :span="20">
                      <el-input type="text" size="mini" v-model="formulaParam.l2" :readonly="isEdit"></el-input>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-col :span="4">L3：</el-col>
                    <el-col :span="20">
                      <el-input type="text" size="mini" v-model="formulaParam.l3" :readonly="isEdit"></el-input>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-col :span="4">L4：</el-col>
                    <el-col :span="20">
                      <el-input type="text" size="mini" v-model="formulaParam.l4" :readonly="isEdit"></el-input>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col :span="24" style="margin-top:20px;">
                  <el-col :span="5">短轴：</el-col>
                  <el-col :span="6">
                    <el-input type="text" size="mini" v-model="minorAxis" readonly="true"></el-input>
                  </el-col>
                </el-col>
                <el-col :span="24" style="margin-top:20px;">
                  <el-col :span="6">
                    <el-col :span="4">S1：</el-col>
                    <el-col :span="20">
                      <el-input type="text" size="mini" v-model="formulaParam.s1" :readonly="isEdit"></el-input>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-col :span="4">S2：</el-col>
                    <el-col :span="20">
                      <el-input type="text" size="mini" v-model="formulaParam.s2" :readonly="isEdit"></el-input>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-col :span="4">S3：</el-col>
                    <el-col :span="20">
                      <el-input type="text" size="mini" v-model="formulaParam.s3" :readonly="isEdit"></el-input>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-col :span="4">S4：</el-col>
                    <el-col :span="20">
                      <el-input type="text" size="mini" v-model="formulaParam.s4" :readonly="isEdit"></el-input>
                    </el-col>
                  </el-col>
                </el-col>
              </div>
            </div>
            <div style="width:100%;height:190px;margin-top:10px;background:#FFF;">
              <div style="width:100%;height:100%;">
                <div style="width:100%;height:10px;"></div>
                <div style="font-size:18px;margin-top:5px;">圆模型</div>
                <el-col :span="24" style="margin-top:10px;">
                  <el-col :span="5">启动圆模型最大烈度：</el-col>
                  <el-col :span="12">
                    <el-select v-model="formulaParam.maxIntensityCircular" size="mini" :readonly="isEdit">
                      <el-option label="III" value="3"></el-option>
                      <el-option label="IV" value="4"></el-option>
                      <el-option label="V" value="5"></el-option>
                      <el-option label="VI" value="6"></el-option>
                      <el-option label="VII" value="7"></el-option>
                      <el-option label="VIII" value="8"></el-option>
                    </el-select>
                  </el-col>
                </el-col>
                <el-col :span="24" style="margin-top:20px;">
                  <el-col :span="5">圆模型公式：</el-col>
                  <el-col :span="6">
                    <el-input type="text" size="mini" v-model="circleModel" readonly="true"></el-input>
                  </el-col>
                </el-col>
                <el-col :span="24" style="margin-top:20px;">
                  <el-col :span="12">
                    <el-col :span="6">L：</el-col>
                    <el-col :span="12">
                      <el-input type="text" size="mini" v-model="formulaParam.l" :readonly="isEdit"></el-input>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col :span="6">V：</el-col>
                    <el-col :span="12">
                      <el-input type="text" size="mini" v-model="formulaParam.v" :readonly="isEdit"></el-input>
                    </el-col>
                  </el-col>
                </el-col>
              </div>
            </div>
            <!-- <div style="width:100%;margin-top:10px;">
              <el-col style="text-align:center;">
                <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
                <el-button type="primary" icon="el-icon-check" size="mini" @click="onSubmit">保存</el-button>
              </el-col>
            </div> -->
          </el-form>
        </div>
      </el-tab-pane>
      <!-- 其他设置页面 -->
      <el-tab-pane label="其他设置" name="second">
        <div style="width:100%;height:90%;">
          <el-form style="height:100%" label-width="150px" :inline="true" size="mini">
            <div style="width:100%;height:400px;background:#FFF;">
              <div style="width:100%;height:100%;">
                <div style="width:100%;height:10px;"></div>
                <div style="font-size:18px;margin-top:5px;">基本参数设置</div>
                <el-col style="margin-top:30px;">
                  <el-form-item label="影响场最小烈度圈：">
                    <el-select v-model="formulaParam.minIntensityEffect" :readonly="isEdit">
                      <el-option label="III" value="3"></el-option>
                      <el-option label="IV" value="4"></el-option>
                      <el-option label="V" value="5"></el-option>
                      <el-option label="VI" value="6"></el-option>
                      <el-option label="VII" value="7"></el-option>
                      <el-option label="VIII" value="8"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col style="margin-top:50px;">
                  <el-checkbox v-model="formulaParam.ifLineSourceFields" true-label="1" false-label="0" :readonly="isEdit">是否生成线源影响场</el-checkbox>
                </el-col>
                <el-col style="margin-top:20px;margin-left:50px;">
                  <el-form-item label="线源地震震级阀值：">
                    <el-input v-model="dzdj" style="width:200px;"></el-input>级地震
                  </el-form-item>
                </el-col>
                <el-col style="margin-top:50px;">
                  <el-checkbox v-model="formulaParam.ifOffset" true-label="1" false-label="0" :readonly="isEdit">是否生成上移、下移宏观影响场</el-checkbox>
                </el-col>
              </div>
            </div>
            
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>

    <div style="width:100%;margin-top:10px;">
              <el-col style="text-align:center;">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="openEdit">编辑</el-button>
                <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
                <el-button type="primary" icon="el-icon-check" size="mini" @click="onSubmit">保存</el-button>
              </el-col>
    </div>
  </div>
  </div>
</template>
<style scoped="scoped">
* {
	box-sizing: border-box;
}
.boxAll {
	width: 100%;
	height: 100%;
	background: rgb(242, 242, 242);
	border-top: 1px solid #ffffff;
	overflow: initial;
}
.boxAll .content {
	width: 97%;
	margin: 10px auto;
	padding: 10px;
	background: #ffffff;
}
.boxAll .content .mainBox100,
.boxAll .content .mainBox220,
.boxAll .content .mainBox180 {
	width: 100%;
	height: 100px;
	border-bottom: 1px solid #d5d5d5;
	margin: 10px;
}
.boxAll .content .mainBox220 {
	height: 220px;
}
.boxAll .content .mainBox180 {
	height: 180px;
}
.boxAll .content .el-form .el-col {
	line-height: 40px;
}
.boxAll .content h3 {
	font-size: 16px;
	line-height: 25px;
	font-weight: normal;
}
.boxAll .boxBtn {
	margin-top: 20px;
	text-align: center;
}
</style>
<script>
import request from '@/utils/request';
export default {
  data() {
    return {
      activeName: "first",
      dzdj: "",
      longAxis: "Math.Pow(Math.E),(L1 + L2 * Mag - I) / L3) - L4",
      minorAxis: "Math.Pow(Math.E),(S1 + S2 * Mag - I) / S3) - S4",
      circleModel:"(Mag * L) / V",
      formulaParam:{
        modelName:"",
        formulaFrom:"",       
        l1: "",
        l2: "",
        l3: "",
        l4: "",
        s1: "",
        s2: "",
        s3: "",
        s4: "",
        maxIntensityCircular: "",
        l: "",
        v: "",
        minIntensityEffect:"",
        ifLineSourceFields:"",
        ifOffset:"",
      },

      saveOriginData:{},
      isEdit: true,
      
    };
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },

    //开启参数编辑功能
		openEdit(){
			this.isEdit=false;
		},
		//获取救援队伍模型所有参数
		getEarthquakeParams(){
			request({
				url:'/influence/getEarthquakeParams',
				method:'get'
			}).then(res => {
          let data=res.data.result;
          this.formulaParam=data;
					//存放修改前的参数
					this.saveOriginData=data;
			});
		},
    onSubmit() {
      var formulaData = this.formulaParam;
        request({
          url: '/influence/addEarthquake',
          method: 'post',
          data: formulaData
        }).then(response => {
            const result = response.data;
            if (result.success == true) {
              this.$message({
                type: 'success',
                message: '保存成功!',
                centerDialogVisible: false,
                created: true
              });
              this.reset();
            }
          })
          .catch(response => {
            alert(response);
          });
    },
    
    reset() {
      this.formulaParam=this.saveOriginData;
      // this.longAxis="";
      // this.minorAxis="";
      // this.circleModel="";
      this.dzdj="";
    },
   
    // resets() {
    //   this.modelNum = "";
    //   this.dzdj = "";
    //   this.checked = false;
    // }
  },
  mounted() {
		//获取救援队伍模型所有参数
		this.getEarthquakeParams();
	},
};
</script>
