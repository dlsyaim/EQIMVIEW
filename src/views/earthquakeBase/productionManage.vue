<template>
  <div class="boxAll">
    <div class="boxCenter">
      <div class="search">
        <el-form label-width="130px" :inline="false" ref="queryCondition" :model="queryCondition">
          <h3>条件查询</h3>
          <el-col :span="12">
            <el-form-item label="地震名称：" prop="earthquakeName">
              <el-input
                style="width:60%;"
                placeholder="模糊查询"
                size="mini"
                type="text"
                v-model="queryCondition.earthquakeName"              
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div class="btnCenter">
          <el-button
            type="primary"
            @click="onSubmit"
            size="mini"
            icon="el-icon-search"       
          >查询</el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-refresh"
            @click="clearFields"
          >重置</el-button>
        </div>
      </div>
      <div class="tableBox">
        <h3>查询结果</h3>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- 文档Tab筛选页 -->
          <el-tab-pane label="文档" name="first" :key="'first'">
            <el-table
              :data="docTableData"
              v-if="isChildUpdate1"
              v-loading="isLoad"
              @cell-mouse-enter="getRowDatas"
              border
              height="33vh"
            >
              <el-table-column label="序号" type="index" width="80"></el-table-column>
              <el-table-column prop="featId" label="主键" v-if="(show = false)"></el-table-column>
              <el-table-column label="操作" align="center" width="80">
                <el-button @click="getProductDetail" size="mini">下载</el-button>
              </el-table-column>
              <el-table-column prop="earthquakeName" label="所属地震事件"></el-table-column>
              <el-table-column prop="fileType" label="文档格式"></el-table-column>
              <el-table-column prop="name" label="产品名称"></el-table-column>
              <el-table-column prop="productVersion" label="产品版本"></el-table-column>
              <el-table-column prop="productType" label="产品类型"></el-table-column>
            </el-table>
            <div class="block" align="right">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                :current-page="pageNo"
                layout="total, sizes, prev, pager, next, jumper"
                :background="true"
                :total="count1"
              ></el-pagination>
            </div>
          </el-tab-pane>
          <!-- 专题图附件筛选页 -->
          <el-tab-pane label="专题图" name="second" :key="'second'">
            <el-table
              :data="jpgTableData"
              v-if="isChildUpdate2"
              v-loading="isLoad"
              border
              height="33vh"
            >
              <el-table-column label="序号" type="index" width="80px"></el-table-column>
              <el-table-column prop="featId" label="主键" v-if="(show = false)"></el-table-column>
              <el-table-column label="操作" align="center" width="80px">
                <el-button @click="getProductDetail" size="mini">下载</el-button>
              </el-table-column>
              <el-table-column prop="earthquakeName" label="所属地震事件"></el-table-column>
              <el-table-column prop="fileType" label="文档格式"></el-table-column>
              <el-table-column prop="name" label="产品名称"></el-table-column>
              <el-table-column prop="productVersion" label="产品版本"></el-table-column>
              <el-table-column prop="productType" label="产品类型"></el-table-column>
            </el-table>
            <div class="block" align="right">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                :current-page="pageNo"
                layout="total, sizes, prev, pager, next, jumper"
                :background="true"
                :total="count2"
              ></el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import "../../styles/comment.css";
import request from "@/utils/request";
export default {
  data() {
    return {
      activeName: "first",
      isChildUpdate1: true,
      isChildUpdate2: false,
      queryCondition: {
        earthquakeName: null
        //fileType: null
      },
      pageNo: 1,
      pageSize: 10,
      count1: null,
      count2: null,
      isLoad: false,
      docTableData: null,
      jpgTableData: null,
      PK: null,
      names: null,
      urls: null,
      filename: null
    };
  },
  methods: {
    // 模糊查询方法
    onSubmit() {
      let pageCondition = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        earthquakeName: this.queryCondition.earthquakeName
      };
      request({
        url: "/productsPs/getListData",
        method: "post",
        data: pageCondition
      })
        .then(res => {
          this.docTableData = res.data.result.docList;
          this.count1 = res.data.result.docCount;
          this.jpgTableData = res.data.result.jpgList;
          this.count2 = res.data.result.jpgCount;
        })
        .catch(function(res) {
          alert(res);
          this.isLoad = false;
        });
    },
    //处理分页大小页面数据加载方法
    handleSizeChange(val) {
      this.pageSize = val;
      this.onSubmit();
    },
    //搜索框重置方法
    clearFields() {
     this.queryCondition.earthquakeName ="";
    },
    //处理分页当前页面展示方法
    handleCurrentChange(val) {
      this.pageNo = val;
      this.onSubmit();
    },
    //获取每一行数据对应的Id方法
    getRowDatas(row) {
      this.PK = row.featId;
      this.names = row.name;
      this.urls = row.path;
      this.filename = row.fileType;
    },
    getProductDetail() {
      var fType = this.filename;
      var name = this.names;
      var fName = name + "." + fType;
      var url = this.urls;
      window.location.href =
        "http://192.168.0.46:8083/EQIM_Bis/productsPs/fileDownload?fileName=" +
        fName +
        "&filePath=" +
        url;
    },
    //处理Tab页点击触发切换页面效果方法
    handleClick(tab) {
      if (tab.name == "first") {
        this.isChildUpdate1 = true;
        this.isChildUpdate2 = false;
        this.selectDoc();
      } else if (tab.name == "second") {
        this.isChildUpdate1 = false;
        this.isChildUpdate2 = true;
        this.selectJpg();
      }
    },
    //文档筛选方法
    selectDoc() {
      request({
        url: "/productsPs/getListData",
        method: "post",
        data: {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          earthquakeName: this.queryCondition.earthquakeName
        }
      })
        .then(res => {
          this.docTableData = res.data.result.docList;
          this.count1 = res.data.result.docCount;
        })
        .catch(function(res) {
          alert(res);
          this.isLoad = false;
        });
    },
    //专题图筛选方法
    selectJpg() {
      request({
        url: "/productsPs/getListData",
        method: "post",
        data: {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          earthquakeName: this.queryCondition.earthquakeName
        }
      })
        .then(res => {
          this.jpgTableData = res.data.result.jpgList;
          this.count2 = res.data.result.jpgCount;
        })
        .catch(function(res) {
          alert(res);
          this.isLoad = false;
        });
    }
  },
  //页面最初数据加载请求函数
  created: function() {
    request({
      url: "/productsPs/getListData",
      method: "post",
      data: {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        earthquakeName: this.queryCondition.earthquakeName
      }
    })
      .then(res => {
        this.docTableData = res.data.result.docList;
        this.count1 = res.data.result.docCount;
        this.jpgTableData = res.data.result.jpgList;
        this.count2 = res.data.result.jpgCount;
      })
      .catch(function(res) {
        alert(res);
        this.isLoad = false;
      });
  }
};
</script>
