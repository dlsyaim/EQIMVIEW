<template>
  <div class="boxAll">
    <div class="boxTabs">
      <b>地理信息</b>
      &nbsp;&nbsp;&nbsp;|&nbsp;
      <span>
        <router-link to="/queryGeographyInfo/geographyData/historicalEarthquake">历史强震</router-link>
        <router-link to="/queryGeographyInfo/geographyData/from1970ToCurrentEQ">1970以来小震</router-link>
      </span>
    </div>
    <div class="boxCenter">
      <div class="search">
        <el-form ref="form" :model="form" label-width="100px" :inline="false">
          <h3>条件查询</h3>
          <el-col :span="12">
            <el-form-item label="地点：">
              <el-input v-model="form.placeName" size="mini" style="width: 60%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="震级：">
              <el-input v-model="form.minMangitude" size="mini" style="width: 40%;"></el-input>~
              <el-input v-model="form.maxMangitude" size="mini" style="width: 40%;"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div class="btnCenter">
          <el-button type="primary" size="mini" @click="doSearch" icon="el-icon-search">查询</el-button>
          <el-button type="primary" size="mini" icon="el-icon-refresh" @click="resetData">重置</el-button>
        </div>
      </div>
      <div class="tableBox">
        <h3>查询结果</h3>
        <el-table
          :data="tableData"
          v-loading="isLoad"
          @cell-mouse-enter="getRowDatas"
          height="calc(100% - 100px)"
          width="100%"
          border
        >
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop label="定位" width="100" align="center">
            <a href="javascript:void(0);" @click="getCoorginate">
              <img :src="mapImages" />
            </a>         
          </el-table-column>
          <el-table-column prop="date" label="日期" align="center"></el-table-column>
          <el-table-column prop="location" label="地名" align="center"></el-table-column>
          <el-table-column prop="longitude" label="经度" align="center"></el-table-column>
          <el-table-column prop="latitude" label="纬度" align="center"></el-table-column>
          <el-table-column prop="magnitude" label="震级" align="center"></el-table-column>
          <el-table-column prop="depth" label="震源深度" align="center"></el-table-column>
          <el-table-column width="180" prop="epicenter" align="center" label="宏观震中烈度（极震区）"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNo"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import "../../../styles/comment.css";
import request from "@/utils/request";
import { getLocatorXY } from "@/utils/gmap";
export default {
  data() {
    return {
       mapImages: require('../../../images/map_true.png'),
      //表单参数
      form: {
        //地名
        placeName: "",
        //最小震级
        minMangitude: "",
        //最大震级
        maxMangitude: ""
      },
      isLoad: true,
      tableData: null,
      pageNo: 1,
      pageSize: 10,
      count: 0,
      x: null,
      y: null
    };
  },
  methods: {
    commonPart() {
      //获取历史强震的数据列表及总记录数
      let params = {
        placeName: this.form.placeName,
        minMangitude: this.form.minMangitude,
        maxMangitude: this.form.maxMangitude,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      request({
        url: "/getHistoricalEQlist",
        method: "post",
        data: params
      }).then(res => {
        let data = res.data.result;
        console.log(data);
        this.tableData = data.list;
        this.count = data.count;
        this.isLoad = false;
      });
    },

    getCoorginate() {
     var x = this.x;
     var y = this.y;
      getLocatorXY(x, y, 10, true);
    },
  
    getRowDatas(row) {         
      this.x = row.longitude;
      this.y = row.latitude;

    },
    //重置数据
    resetData() {
      this.form.placeName = null;
      this.form.minMangitude = null;
      this.form.maxMangitude = null;
    },
    //查询
    doSearch() {
      this.pageNo = 1;
      this.pageSize = 10;
      this.commonPart();
    },
    //改变pageSize时做翻页操作
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.commonPart();
    },
    //改变pageNo时做翻页操作
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      this.commonPart();
    }
  },
  created() {
    this.commonPart();
  }
};
</script>
