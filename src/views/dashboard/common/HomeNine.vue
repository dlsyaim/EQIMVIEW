<template>
  <div id="HomeNine">
    <h3>{{ Title }}</h3>
    <el-table
      :data="rightsDate"
      @cell-mouse-enter="getRowDatas"
      :show-overflow-tooltip="true"
      @row-click="getAidDesision"
      class="my-class"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        v-for="info in rightHeader"
        :key="info.key"
        align="center"
        :show-overflow-tooltip="true"
        :property="info.key"
        :label="info.label"
        :width="info.width"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
import request from "@/utils/request";
export default {
  inject: ["reload"],
  data() {
    return {
      Title: "地震触发列表",
      rightHeader: [
        {
          label: "震级",
          key: "earthquakeLevel",
          width: "70"
        },
        {
          label: "发震时刻(UTC+8)",
          key: "earthquakeTime",
          width: "120"
        },
        {
          label: "纬度(.)",
          key: "latitude",
          width: "70"
        },
        {
          label: "经度(.)",
          key: "longitude",
          width: "70"
        },
        {
          label: "深度(KM)",
          key: "focalDepth",
          width: "80"
        },
        {
          label: "参考位置",
          key: "earthquakeLocation",
          width: ""
        }
      ],
      rightsDate: [],
      aid: null,
      aidDecisionData: null,
      batchNum: null,
      x: null,
      y: null
    };
  },
  components: {},
  methods: {
    commonPart() {
      request({ url: "/getTEarthquakeInfoCountAndList", method: "post" }).then(
        res => {
          console.log();
          let data = res.data.result;
          if(this.rightsDate){
              this.rightsDate=[];
          }
          for(let i=0;i<10;i++){
              this.rightsDate.push(data.list[i]);
          }
        }
      );
    },
    tableRowClassName({ row }) {
      console.log("row", row);
      if (row.earthquakeLevel >= 4 && row.earthquakeLevel < 6) {
        return "success-row";
      } else if (row.earthquakeLevel >= 6) {
        return "warning-row";
      } else {
        return "defult-row";
      }
    },
    getRowDatas(row) {
      this.aid = row.featid;
      this.batchNum = row.batchNumber;
      this.x = row.longitude;
      this.y = row.latitude;
    },

    getMapShow() {
      var id = this.aid;
      var batch = this.batchNum;
      var x = this.x;
      var y = this.y;     
      var mainMap = window.frames["mapFrameOne"].window;
      if (id != null && batch != null && batch != 0) {
        mainMap.getMainViewer().showEarthquakeIntensityGeo(
			{
				id: id,
				batch: batch,
				x: x,
				y: y
			});
      } else {
        this.reload();
      }
    },

    getAidDesision() {
      this.getMapShow();
      this.$router.push({
        path: "/home/dashboard",
        query: {
          featId: this.aid
          // rescueStaffDemand:this.aidDecisionData.rescueStaffDemand,
          // medicalStaffDemand:this.aidDecisionData.medicalStaffDemand,
          // tentDemand:this.aidDecisionData.tentDemand,
          // emergencyWaterDemand:this.aidDecisionData.emergencyWaterDemand
        }
      });
      //this.reload();
    }
  },
  created() {
    this.commonPart();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped="scoped">
.my-class {
  width: 100%;
  height: 80%;
  overflow-y: scroll;
}
/deep/ .el-table .warning-row {
  color: red !important;
}
/deep/ .el-table .defult-row {
  color: #d3d9df;
}
/deep/ .el-table .success-row {
  font-weight: bold;
  color: #d3d9df;
}
/deep/ .el-table {
  position: initial !important;
}
/deep/ .el-table th {
  background: transparent;
  font-size: 0.8125rem;
  padding: 4px 0;
  font-weight: normal;
  color: #d3d9df;
}
/deep/ .el-table,
/deep/ .el-table th,
/deep/ .el-table td,
/deep/ .el-table tr {
  background: transparent;
  font-size: 0.8125rem;
  padding: 4px 0;
}
/deep/ .el-table tr:hover > td {
  background: transparent;
}

/deep/ .el-table tr.current-row > td {
  background: transparent;
}
/deep/ .el-table td,
/deep/ .el-table th.is-leaf {
  border-bottom: none;
}
/deep/ .el-table .cell {
  line-height: 15px;
}

/*滚动条样式*/

/deep/ .my-class::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: transparent;
}

/*定义滚动条轨道 内阴影+圆角*/
/deep/ .my-class::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: transparent;
}

/*定义滑块 内阴影+圆角*/
/deep/ .my-class::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #067086;
}

@media screen and (max-width: 1700px) and (min-width: 1500px) {
  /deep/ .el-table .cell {
    font-size: 14px;
    height: 25px;
    line-height: 25px;
  }
}
@media screen and (max-width: 1980px) and (min-width: 1701px) {
  /deep/ .el-table .cell {
    font-size: 17px;
    height: 30px;
    line-height: 30px;
  }
}
</style>
