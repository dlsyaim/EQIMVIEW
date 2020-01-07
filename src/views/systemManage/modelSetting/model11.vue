<template>
  <div style="width:100%;height:auto;background:#f2f2f2">
    <div style="width:100%;height:100%;padding:20px;">
      <div style="width:100%;height:250px;background:#FFF; padding-left: 10px">
        <div style="width:100%;height:100%;">
          <div style="font-size:18px;">帐篷</div>
          <div style="margin-top:10px;">【模型公式】</div>
          <div style="margin-top:10px;">
            <img src="@/views/systemManage/modelSetting/model11-1.jpg" />
          </div>
          <div style="margin-top:15px;">【参数说明】</div>
          <br />
          <div>Tent--表示需要帐篷数量;&nbsp;&nbsp;&nbsp;&nbsp;Ho--表示无家可归人员;</div>

          <div style="width:100%;line-height:30px;margin-top:20px;">
            <el-col :span="6">
              <el-col :span="4">L0：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.tents.tent0" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
            <el-col :span="6">
              <el-col :span="4">L1：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.tents.tent1" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
            <el-col :span="6">
              <el-col :span="4">L2：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.tents.tent2" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
            <el-col :span="6">
              <el-col :span="4">L3：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.tents.tent3" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
          </div>
        </div>
      </div>
      <div style="width:100%;height:300px;margin-top:15px;background:#FFF;padding-left: 10px">
        <div style="width:100%;height:100%;">
          <div style="font-size:18px;">灾后粮食补助</div>
          <div style="margin-top:10px;">【模型公式】</div>
          <div style="margin-top:10px;">
            <img src="@/views/systemManage/modelSetting/model11-2.jpg" />
          </div>
          <div style="margin-top:15px;">【参数说明】</div>
          <br />
          <div>Fo--表示灾后粮食补助;&nbsp;&nbsp;&nbsp;&nbsp;Ho--表示无家可归人员;</div>
          <div style="width:100%;line-height:30px;margin-top:20px;">
            <el-col :span="6">
              <el-col :span="4">L0：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.foods.food0" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
            <el-col :span="6">
              <el-col :span="4">L1：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.foods.food1" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
            <el-col :span="6">
              <el-col :span="4">L2：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.foods.food2" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
            <el-col :span="6">
              <el-col :span="4">L3：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.foods.food3" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
            <el-col :span="6">
              <el-col :span="4">L4：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.foods.food4" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
            <el-col :span="6">
              <el-col :span="4">L5：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.foods.food5" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
          </div>
        </div>
      </div>
      <div style="width:100%;height:270px;margin-top:15px;background:#FFF;padding-left: 10px">
        <div style="width:100%;height:100%;">
          <div style="font-size:18px;">棉被</div>
          <div style="margin-top:10px;">【模型公式】</div>
          <div style="margin-top:10px;">
            <img src="@/views/systemManage/modelSetting/model11-3.jpg" />
          </div>
          <div style="margin-top:15px;">【参数说明】</div>
          <br />
          <div>Quilt--表示需要棉被数量;&nbsp;&nbsp;&nbsp;&nbsp;Ho--表示无家可归人员;</div>

          <div style="width:100%;line-height:30px;margin-top:20px;">
            <el-col :span="6">
              <el-col :span="4">L0：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.quilts.quilt0" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
            <el-col :span="6">
              <el-col :span="4">L1：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.quilts.quilt1" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
            <el-col :span="6">
              <el-col :span="4">L2：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.quilts.quilt2" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
          </div>
        </div>
      </div>
      <div style="width:100%;height:210px;margin-top:15px;background:#FFF;padding-left: 10px">
        <div style="width:100%;height:100%;">
          <div style="font-size:18px;">应急清洁饮水</div>
          <div style="margin-top:10px;">【模型公式】</div>
          <div style="margin-top:10px;">
            <img src="@/views/systemManage/modelSetting/model11-4.jpg" />
          </div>
          <div style="margin-top:15px;">【参数说明】</div>
          <br />
          <div>Water--表示应急需要的应急清洁饮水;&nbsp;&nbsp;&nbsp;&nbsp;Ho--表示无家可归人员;</div>
          <div style="width:100%;line-height:30px;margin-top:20px;">
            <el-col :span="6">
              <el-col :span="4">L0：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.waters.water0" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
            <el-col :span="6">
              <el-col :span="4">L1：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.waters.water1" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
          </div>
        </div>
      </div>
      <div style="width:100%;height:200px;margin-top:15px;background:#FFF; padding-left: 10px">
        <div style="width:100%;height:100%;">
          <div style="font-size:18px;">衣服</div>
          <div style="margin-top:10px;">【模型公式】</div>
          <div style="margin-top:10px;">
            <img src="@/views/systemManage/modelSetting/model11-5.jpg" />
          </div>
          <div style="margin-top:15px;">【参数说明】</div>
          <br />
          <div>Clothing--表示需要衣服的数量;&nbsp;&nbsp;&nbsp;&nbsp;Ho--表示无家可归人员;</div>
          <div style="width:100%;line-height:30px;margin-top:20px;">
            <el-col :span="6">
              <el-col :span="4">L0：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.cloths.cloth0" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
          </div>
        </div>
      </div>
      <div style="width:100%;height:270px;margin-top:15px;background:#FFF;padding-left: 10px">
        <div style="width:100%;height:100%;">
          <div style="font-size:18px;">毛毯</div>
          <div style="margin-top:10px;">【模型公式】</div>
          <div style="margin-top:10px;">
            <img src="@/views/systemManage/modelSetting/model11-6.jpg" />
          </div>
          <div style="margin-top:15px;">【参数说明】</div>
          <br />
          <div>Blanket--表示需要毛毯数量;&nbsp;&nbsp;&nbsp;&nbsp;Ho--表示无家可归人员;</div>
          <div style="width:100%;line-height:30px;margin-top:20px;">
            <el-col :span="6">
              <el-col :span="4">L0：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.blankets.blanket0" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
            <el-col :span="6">
              <el-col :span="4">L1：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.blankets.blanket1" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
            <el-col :span="6">
              <el-col :span="4">L2：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.blankets.blanket2" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
          </div>
        </div>
      </div>
      <div style="width:100%;height:210px;margin-top:15px;background:#FFF;padding-left: 10px">
        <div style="width:100%;height:100%;">
          <div style="font-size:18px;">担架</div>
          <div style="margin-top:10px;">【模型公式】</div>
          <div style="margin-top:10px;">
            <img src="@/views/systemManage/modelSetting/model11-7.jpg" />
          </div>
          <div style="margin-top:15px;">【参数说明】</div>
          <br />
          <div>Lit--表示应急需要的担架;&nbsp;&nbsp;&nbsp;&nbsp;Ho--表示无家可归人员;</div>
          <div style="width:100%;line-height:30px;margin-top:20px;">
            <el-col :span="6">
              <el-col :span="4">L0：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.djs.dj0" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
          </div>
        </div>
      </div>
      <div style="width:100%;height:210px;margin-top:15px;background:#FFF; padding-left: 10px">
        <div style="width:100%;height:100%;">
          <div style="font-size:18px;">病床</div>
          <div style="margin-top:10px;">【模型公式】</div>
          <div style="margin-top:10px;">
            <img src="@/views/systemManage/modelSetting/model11-8.jpg" />
          </div>
          <div style="margin-top:15px;">【参数说明】</div>
          <br />
          <div>Ward--表示需要的病床数量;&nbsp;&nbsp;&nbsp;&nbsp;In--表示受伤人数;</div>
          <div style="width:100%;line-height:30px;margin-top:20px;">
            <el-col :span="6">
              <el-col :span="4">L0：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.beds.bed0" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
          </div>
        </div>
      </div>
      <div style="width:100%;height:210px;margin-top:15px;background:#FFF; padding-left: 10px">
        <div style="width:100%;height:100%;">
          <div style="font-size:18px;">应急救灾款</div>
          <div style="margin-top:10px;">【模型公式】</div>
          <div style="margin-top:10px;">
            <img src="@/views/systemManage/modelSetting/model11-9.jpg" />
          </div>
          <div style="margin-top:15px;">【参数说明】</div>
          <br />
          <div>ReMo--表示应急救灾款;&nbsp;&nbsp;&nbsp;&nbsp;RePop--表示受灾人数;</div>
          <div style="width:100%;line-height:30px;margin-top:20px;">
            <el-col :span="6">
              <el-col :span="4">L0：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.yjjzks.yjjzk0" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
            <el-col :span="6">
              <el-col :span="4">L1：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.yjjzks.yjjzk1" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
          </div>
        </div>
      </div>
      <div style="width:100%;height:210px;margin-top:15px;background:#FFF;padding-left: 10px">
        <div style="width:100%;height:100%;">
          <div style="font-size:18px;">临时厕所</div>
          <div style="margin-top:10px;">【模型公式】</div>
          <div style="margin-top:10px;">
            <img src="@/views/systemManage/modelSetting/model11-10.jpg" />
          </div>
          <div style="margin-top:15px;">【参数说明】</div>
          <br />
          <div>Toilet--表示临时厕所数量;&nbsp;&nbsp;&nbsp;&nbsp;Ho--表示无家可归人员;</div>
          <div style="width:100%;line-height:30px;margin-top:20px;">
            <el-col :span="6">
              <el-col :span="4">L0：</el-col>
              <el-col :span="16">
                <el-input type="text" size="mini" v-model="goodsParam.toilets.toilet0" :readonly="isEdit"></el-input>
              </el-col>
            </el-col>
          </div>
        </div>
      </div>
      <el-col style="text-align:center;width:100%;background: #FFFFFF;">
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="openEdit">编辑</el-button>
        <el-button type="primary" size="mini" icon="el-icon-refresh" @click="resetParams">重置</el-button>
        <el-button type="primary" size="mini" icon="el-icon-check" @click="reliefGoodsSave">保存</el-button>
      </el-col>
    </div>
  </div>
</template>
<style>
* {
  box-sizing: border-box;
}
</style>
<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      //控制参数是否可以编辑，默认不能编辑
      isEdit:true,
      //存放参数修改前的数据对象
      savaNoEidtData:[],
      //参数变量
      goodsParam: {
        //帐篷
        tents:{
          wzlx:'帐篷',
          tent0: null,
          tent1: null,
          tent2: null,
          tent3: null,
        },
        //灾后粮食补助
        foods:{
          wzlx:'灾后粮食补助',
          food0: null,
          food1: null,
          food2: null,
          food3: null,
          food4: null,
          food5: null,        
        },
        //棉被
        quilts:{
          wzlx:'棉被',
          quilt0: null,
          quilt1: null,
          quilt2: null,
        },
        //应急清洁饮水
        waters:{
          wzlx:'应急清洁饮水',
          water0: null,
          water1: null,
        },
        //衣服
        cloths:{
          wzlx:'衣服',
          cloth0: null,
        },
        //毛毯
        blankets:{
          wzlx:'毛毯',
          blanket0: null,
          blanket1: null,
          blanket2: null,
        },
        //担架
        djs:{
          wzlx:'担架',
          dj0:null
        },
        //病床
        beds:{
          wzlx:'病床',
          bed0:null
        },
        //应急救灾款
        yjjzks:{
          wzlx:'应急救灾款',
          yjjzk0:null,
          yjjzk1:null
        },
        //临时厕所
        toilets:{
          wzlx:'临时厕所',
          toilet0:null
        },
      }
    }
  },
  mounted(){
    this.getReliefGoodsParams();
  },
  methods: {
    //打开参数编辑功能
    openEdit(){
      this.isEdit=false;
    },
    //展示和重置的参数公共方法
    commonMethod(data){
        data.forEach(element => {
          if(element.formula == '帐篷'){
              this.goodsParam.tents.tent0 = element.l0;
              this.goodsParam.tents.tent1 = element.l1;
              this.goodsParam.tents.tent2 = element.l2;
              this.goodsParam.tents.tent3 = element.l3;
          }else if(element.formula == '灾后粮食补助'){
              this.goodsParam.foods.food0 = element.l0;
              this.goodsParam.foods.food1 = element.l1;
              this.goodsParam.foods.food2 = element.l2;
              this.goodsParam.foods.food3 = element.l3;
              this.goodsParam.foods.food4 = element.l4;
              this.goodsParam.foods.food5 = element.l5;
          }else if(element.formula == '棉被'){
              this.goodsParam.quilts.quilt0 = element.l0;
              this.goodsParam.quilts.quilt1 = element.l1;
              this.goodsParam.quilts.quilt2 = element.l2;
          }else if(element.formula == '应急清洁饮水'){
              this.goodsParam.waters.water0 = element.l0;
              this.goodsParam.waters.water1 = element.l1;
          }else if(element.formula == '衣服'){
              this.goodsParam.cloths.cloth0 = element.l0;
          }else if(element.formula == '毛毯'){
              this.goodsParam.blankets.blanket0 = element.l0;
              this.goodsParam.blankets.blanket1 = element.l1;
              this.goodsParam.blankets.blanket2 = element.l2;
          }else if(element.formula == '担架'){
              this.goodsParam.djs.dj0 = element.l0;
          }else if(element.formula == '病床'){
              this.goodsParam.beds.bed0 = element.l0;
          }else if(element.formula == '应急救灾款'){
              this.goodsParam.yjjzks.yjjzk0 = element.l0;
              this.goodsParam.yjjzks.yjjzk1 = element.l1;
          }else if(element.formula == '临时厕所'){
              this.goodsParam.toilets.toilet0 = element.l0;
          }
        });
    },
    //查询最新的模型参数
    getReliefGoodsParams(){
      request({url:'/getReliefGoddsParams',method:'get'}).then(res =>{
          let data = res.data.result;
          this.commonMethod(data);
          this.savaNoEidtData=data;
          console.log(res.data.result);
      });
    },

    //保存修改后的模型参数
    reliefGoodsSave() {
      let data=[this.goodsParam.tents,this.goodsParam.foods,this.goodsParam.quilts,
      this.goodsParam.waters,this.goodsParam.cloths,this.goodsParam.blankets,this.goodsParam.djs,
      this.goodsParam.beds,this.goodsParam.yjjzks,this.goodsParam.toilets];

      request({
        url: "/addReliefGoods",
        method: "post",
        data: JSON.stringify(data)
      }).then(res => {
          console.log(res);
            this.$message({
              type: "success",
              message: "保存成功!",
              centerDialogVisible: false,
              created: true
            });
        });
    },
    resetParams() {
      let data = this.savaNoEidtData;
      this.commonMethod(data);
    }
  }
};
</script>