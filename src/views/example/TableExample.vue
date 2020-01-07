<template>
  <div style="height:100%">
    <el-container style="height:100%">
      <el-header style="height:120px;margin-top: 10px;">
        <el-form
          :inline="true"
          :model="listQuery"
          :label-width="formLabelWidth"
          class="form-inline"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="姓名" size="small" >
                <el-input size="small" v-model="listQuery.name" placeholder="姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别" size="small"   >
                <el-select size="small" v-model="listQuery.sex" placeholder="性别">
                  <el-option label="男" value="0"></el-option>
                  <el-option label="女" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="日期范围" size="small">
                <el-date-picker
                  size="small"
                  value-format="yyyy-MM-dd"
                  v-model="listQuery.range"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始范围"
                  end-placeholder="结束范围"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" :offset="10">
              <el-form-item>
                <el-button type="primary" @click="getList">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-header>
      <el-main ref="mainContant" style="padding: 0px;width: 100%;">
        <el-row style="margin-bottom: 2px; margin-left: 2px;">
          <el-tooltip class="item" effect="dark" content="新增员工" placement="top">
            <el-button plain size="mini" icon="el-icon-circle-plus" @click="addData">新增</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="批量删除" placement="top">
            <el-button plain size="mini" icon="el-icon-delete" @click="deleteData">删除</el-button>
          </el-tooltip>
        </el-row>
        <g-table
          style="width: 99%;"
          :columns="columns"
          :height="tableHeight"
          :options="options"
          :data="list"
          :listLoading="listLoading"
          @selection-change="options.selectionChange"
        />
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
        />
      </el-main>
    </el-container>

    <el-dialog title="企业员工" :visible.sync="dialogFormVisible">
      <el-form :model="temp" ref="ruleForm" label-width="100px" :rules="formRules" size="mini">
        <el-input v-model="temp.id" type="hidden"></el-input>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="temp.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别"  prop="sex" :rules="[{ required: true, trigger: 'blur', message: '性别不能为空'}]">
              <el-select v-model="temp.sex" placeholder="性别">
                <el-option label="男" value="0"></el-option>
                <el-option label="女" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="年龄" prop="age"  :rules="[  { required: true,  trigger: 'blur',message: '年龄不能为空'}]">
              <el-input-number :min="18" :max="60" v-model="temp.age" autocomplete="off"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期" prop="birthday" >
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="temp.birthday"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门" prop="department" :rules="[{ required: true,  trigger: 'blur', message: '部门不能为空'}]">
              <el-input v-model="temp.department" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工号" prop="num"  :rules="[  { required: true,  trigger: 'blur', message: '工号不能为空'}]">
              <el-input v-model="temp.num" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeDialog">取 消</el-button>
        <el-button size="mini" @click="saveNewData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import GTable from "@/components/Table";
import CommonRender from "./CommonRender";
import TimestampRender from "./TimestampRender";
import OperatorRender from "./OperatorRender";
import Pagination from "@/components/Pagination";
import { fetchList, saveDate, deleteData } from "@/api/example";
import { clearEmptyProperty } from "@/utils";
import Vue from "vue";
import "./form.scss";

const fixHeight = 360;

//将空的组件当作消息总线进行事件监听
const bus = new Vue();

export default {
  components: { GTable, Pagination },
  data() {
    return {
      formLabelWidth: "70px",   // 表单label 宽度
      tabeCheckList: [],        // 表格被选中的列表
      dialogFormVisible: false, // dialog是否显示
      tableHeight: window.innerHeight - fixHeight,  //表格高度
      formRules: {
        name: [{ required: true, trigger: "blur", message: "请输入姓名" }]
      },
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined,
        age: undefined,
        range: undefined,
        sex: undefined,
        department: undefined,
        num: undefined,
        importance: undefined,
        title: undefined,
        type: undefined
      },
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
        },
        {
          label: "年龄",
          prop: "age",
          align: "center",
          render: CommonRender
        },
        {
          label: "出生日期",
          prop: "birthday",
          align: "center",
          render: TimestampRender
        },
        {
          label: "性别",
          prop: "sex",
          align: "center",
          formatter: (row, column, cellValue) => {
            if ("0" == cellValue) return "男";
            else if ("1" == cellValue) return "女";
            else return cellValue;
          }
        },
        {
          label: "部门",
          prop: "department",
          align: "center",
          render: CommonRender
        },
        {
          label: "工号",
          prop: "num",
          align: "center",
          render: CommonRender
        },
        {
          label: "操作",
          fixed: "right",
          width: 100,
          render: OperatorRender
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
      list: null,
      temp: {
        id: undefined,
        name: undefined,
        age: undefined,
        range: undefined,
        sex: undefined,
        department: undefined,
        num: undefined
      }
    };
  },
  provide: {
    bus: bus
  },
  created() {
    this.getList();
    const _self = this;
    bus.$on("edit-person", function(event) {
      _self.editPerson(event);
    });
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        that.tableHeight = window.innerHeight - fixHeight;
      })();
    };
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
  methods: {
    getList() {
      this.listLoading = true;
      clearEmptyProperty(this.listQuery);
      fetchList(this.listQuery)
        .then(reposne => {
          const result = reposne.data.result;
          if (result.current > result.pages) {
            this.listQuery.page = result.pages;
            if (result.pages > 0) this.getList();
            else {
              this.renderDataGrid(result);
            }
          } else this.renderDataGrid(result);
          setTimeout(() => {
            this.listLoading = false;
          }, 500);
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    renderDataGrid(result) {
      this.list = result.records;
      this.total = result.total;
    },
    addData() {
      this.resetTemp();
      this.dialogFormVisible = true;
    },
    deleteData() {
      if (this.tabeCheckList.length > 0) {
        this.$confirm("此操作将永久删除记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            deleteData(this.tabeCheckList).then(response => {
              const result = response.data;
              if (result.success == true) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else
                this.$message({
                  type: "info",
                  message: result.message
                });
              this.getList();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    closeDialog() {
      this.resetTemp();
      this.dialogFormVisible = false;
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: undefined,
        age: undefined,
        range: undefined,
        sex: undefined,
        department: undefined,
        num: undefined
      };
    },
    saveNewData() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          saveDate(this.temp).then(() => {
            this.getList();
            this.dialogFormVisible = false;
            this.resetTemp();
            this.$notify({
              title: "成功",
              message: "新增成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    editPerson(event) {
      this.temp = event.row;
      this.dialogFormVisible = true;
    }
  }
};
</script>