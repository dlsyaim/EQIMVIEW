<template>
  <div style="height:100%">
    <el-container style="height:100%">
      <el-header style="height:100px">
        <el-form :inline="true" :model="query">
          <el-form-item label="姓名">
            <el-input v-model="query.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="primary" :loading="isQuery" @click="queryList">查询</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <g-table
          style="width: 99%;"
          :columns="columns"
          :height="tableHeight"
          :options="options"
          :data="list"
          :listLoading="isQuery"
          @selection-change="options.selectionChange"
        />
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="query.page"
          :limit.sync="query.limit"
          @pagination="queryList"
        />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import GTable from "@/components/Table";
import Pagination from "@/components/Pagination";
import CommonRender from "../example/CommonRender"

import { fetchList } from "@/api/example";
import { clearEmptyProperty } from "@/utils";

const fixHeight = 360;
export default {
  components: { GTable, Pagination },
  data() {
    return {
      isQuery: false,
      tableHeight: window.innerHeight - fixHeight,  //表格高度
      total: 0,
      query: {
        page: 0,
        limit: 10,
        name: null
      },
      list:null,
      tabeCheckList:[],
        //字段属性配置
      columns: [
        {
          type: "selection",
          width: 55
        },
        {
          label: "姓名",
          prop: "name",
          align: "center",
          render: CommonRender
        }
      ],
      //表头属性配置
      options: {
        vLoading: false,
        key: "grid" + new Date().getTime(),
        data: null,
        border: true,
        fit: true,
        highlightCurrentRow: true,
        selectionChange: selection => {
          this.tabeCheckList = selection;
        }
      },
    };
  },
  methods: {
    queryList() {
        this.isQuery = true;

      clearEmptyProperty(this.query);
      fetchList(this.query)
        .then(reposne => {
          const result = reposne.data.result;
          if (result.current > result.pages) {
            this.query.page = result.pages;
            if (result.pages > 0) this.fetchList();
            else {
              this.renderDataGrid(result);
            }
          } else this.renderDataGrid(result);
          setTimeout(() => {
            this.isQuery = false;
          }, 500);
        })
        .catch(() => {
          this.isQuery = false;
        });
    },
     renderDataGrid(result) {
      this.list = result.records;
      this.total = result.total;
    }
  },
   mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        that.tableHeight = window.innerHeight - fixHeight;
      })();
    };
  },
    created(){
        this.queryList();
    },
  watch: {
    tableHeight(val) {
      if (!this.timer) {
        this.tableHeight = val;
        this.timer = true;
        const that = this;
        setTimeout(function() {
          that.timer = false;
        }, 400);
      }
    }
  },
};
</script>