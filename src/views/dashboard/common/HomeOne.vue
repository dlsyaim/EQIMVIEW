<template>
  <div id="HomeOne">
    <h3>{{ Title }}</h3>
    <div class="box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="内存" name="first">
          <ul>
            <li>
              <span>总内存:</span>
              {{ memory[0] }}GB
            </li>
            <li>
              <span>已用:</span>
              {{ memory[1] }}GB
            </li>
            <li>
              <span>未用:</span>
              {{ memory[2] }}GB
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="CPU" name="second">
          <ul>
            <li>
              <span>CPU总量:</span>
              {{ cpu[0] }}%
            </li>
            <li>
              <span>已用:</span>
              {{ cpu[1] }}%
            </li>
            <li>
              <span>未用:</span>
              {{ cpu[2] }}%
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="磁盘" name="third">
          <ul>
            <li>
              <span>总内存:</span>
              {{ disk[0] }}GB
            </li>
            <li>
              <span>已用:</span>
              {{ disk[1] }}GB
            </li>
            <li>
              <span>未用:</span>
              {{ disk[2] }}GB
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="用户连接数" name="fourth">
          <div class="boxImg">{{fourNumber}}</div>
        </el-tab-pane>
        <el-tab-pane label="提供服务次数" name="fiver">
          <div class="boxImg">{{fiveNumber}}</div>
        </el-tab-pane>
      </el-tabs>
      <div ref="myChart1" id="myChart1"></div>
    </div>
  </div>
</template>
<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      Title: "服务器资源",
      activeName: "first",
      memory: {},
      cpu: {},
      disk: {},
      three: {
        allNumber: 12,
        alreadyNumber: 6,
        notUsed: 4
      },
      values: [
        [{ value: 3.6, name: "未用" }, { value: 6.2, name: "已用" }],
        [{ value: 33, name: "未用" }, { value: 67, name: "已用" }],
        [{ value: 56, name: "未用" }, { value: 69, name: "已用" }]
      ],
      fourNumber: "50",
      fiveNumber: "60"
    };
  },
  components: {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      this.oneEcharts(this.values[tab.index]);
    },
    queryFileCount(){
       request({
        url: "/getFileCount",
        method: "post"
      }).then(res => {
        let data = res.data.result;
         console.log(data);
        this.fiveNumber=data;
        });
    },
    querySystemInfo() {
      request({
        url: "/getSystemInfo",
        method: "get"
      }).then(res => {
        let data = res.data.result;
        // alert(data);
        // console.log(data);
        this.memory = data.memory;
        this.cpu = data.cpu;
        this.disk = data.disk;
        var value1 = data.memory[2];
        var value2 = data.memory[1];
        var value3 = data.cpu[2];
        var value4 = data.cpu[1];
        var value5 = data.disk[2];
        var value6 = data.disk[1];
        var name1 = "未用";
        var name2 = "已用";
        //var arr=[];
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        arr1.push({ value: value1, name: name1 });
        arr1.push({ value: value2, name: name2 });
        arr2.push({ value: value3, name: name1 });
        arr2.push({ value: value4, name: name2 });
        arr3.push({ value: value5, name: name1 });
        arr3.push({ value: value6, name: name2 });
        this.values = [arr1, arr2, arr3];
      });
    },
    //内存饼图
    oneEcharts(values) {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(this.$refs.myChart1);
      // 绘制图表
      myChart1.setOption({
        // 基于准备好的dom，初始化echarts实例
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },

        legend: {
          orient: "horizontal",
          x: "right",
          data: ["未用", "已用"],
          itemWidth: 13,
          itemHeight: 8,
          textStyle: {
            color: "#ffffff",
            fontSize: 10
          }
        },
        visualMap: {
          show: false,
          min: 500,
          max: 600,
          inRange: {
            //colorLightness: [0, 1]
          }
        },
        series: [
          {
            type: "pie",
            radius: "45%",
            clockwise: true,
            center: ["40%", "60%"],
            color: ["#37a252", "#cbb444"],
            data: values,
            roseType: "radius",
            label: {
              normal: {
                formatter: ["{b|{b}{d}%}"].join("\n"),
                rich: {
                  b: {
                    fontSize: 10,
                    height: 10
                  },
                  c: {
                    fontSize: 10,
                    lineHeight: 0
                  }
                }
              }
            },
            itemStyle: {
              normal: {
                borderWidth: "5",
                borderColor: "rgba(17,43,66,1)"
              }
            },
            labelLine: {
              normal: {
                length: 1
              }
            }
          }
        ]
      });
      //});
    }
  },

  created() {
    this.$nextTick(function() {
      this.querySystemInfo();
      this.queryFileCount();
      this.oneEcharts(this.values[0]);
    });
  }
};
</script>

<style lang="scss" scoped="scoped">
#HomeOne .box {
  width: 100%;
  height: 100%;
  margin-top: -15px;
  position: relative;
  #myChart1 {
    width: 100%;
    height: 80%;
  }
}
#HomeOne .box {
	width: 100%;
	height: 100%;
	.boxImg {
		width: 50%;
		height: 120px;
		margin: 0 auto;
		margin-top: 20px;
		background-image: url(../../../assets/home/icon_radius.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;
		text-align: center;
		line-height: 120px;
		color: #ffffff;
		font-size: 25px;
		font-weight: bold;
	}
}
#HomeOne /deep/ .el-tabs__content,
#HomeOne /deep/ .el-tabs__header {
  position: initial !important;
}
#HomeOne .el-tabs__content ul {
	position: absolute;
	top: 30%;
	right: 4%;
	color: #ffffff;
	li {
		font-size: 12px;
		span {
			font-size: 12px;
		}
	}
}

/deep/ .el-tabs__nav-wrap::after {
  background-color: transparent;
}
/deep/ .el-tabs__item {
	color: #67798d;
	font-size: 13px;
	padding: 0 5px;
	font-family: Arial;
	font-weight: bold;
}
/deep/ .el-tabs--top .el-tabs__item.is-top:last-child {
	padding-right: 10px;
}
/deep/ .is-active {
  color: #00c2f9;
  font-family: Arial;
  font-weight: bold;
}
/deep/ .el-tabs__active-bar {
  background-color: transparent;
}
/deep/ .el-tabs__header {
  margin: 0;
}
/deep/ .el-tabs__nav {
  width: 100%;
  text-align: right;
}
</style>
