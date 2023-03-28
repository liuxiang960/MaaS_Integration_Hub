<template>
  <div class="sdm-bg">
    <div class="sdm-bg-sty sdm-bg-data">
      <div class="sdm-bg-title-btn">
        <div>
          <el-col :span="3" :xs="24">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="small"
              @click="dialogVisible = true"
              >{{ $t("new") }}</el-button
            >
          </el-col>
          <el-col :span="21" :xs="24" style="margin-bottom: 20px">
            <el-filter
              :data="filterInfo.data"
              :field-list="filterInfo.fieldList"
              :list-type-info="listTypeInfo"
              :fold-btn-hidden="btnHidde"
              @handleFilter="handleFilter"
              @handleReset="handleReset"
              @handleEvent="handleEvent"
            />
          </el-col>
        </div>
      </div>
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column
          :label="$t('number')"
          type="index"
          width="100"
          :index="(i) => (currentPage - 1) * pageSize + i + 1"
        />
        <!-- index 第二页的序号累计在第一页的基础上-->
        <el-table-column prop="startTime" label="策略名称" />
        <el-table-column prop="leve" label="告警级别" />
        <el-table-column prop="type" label="告警类型" />
        <el-table-column prop="num" label="告警对象个数" />
        <el-table-column prop="frequency" label="告警频率" />
        <el-table-column prop="template" label="通知模板" />
        <el-table-column prop="status" label="运行状态" />
        <el-table-column prop="endTime" label="结束时间" />

        <el-table-column :label="$t('operation')" width="160">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleEdit(scope.row)"
              >{{ $t("edit") }}</el-button
            >
            <el-button type="text" size="small" @click="handleDel(scope.row)">{{
              $t("deletd")
            }}</el-button>
            <!-- <el-button type="text" size="small" @click="handleDisabled(scope.row)">{{ scope.row.disabled === 0 ? '关闭' : '开启' }}</el-button>
            <el-button type="text" size="small" @click="handlelock(scope.row)">{{ scope.row.locked === 0 ? '锁定' : '解锁' }} </el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :page="currentPage"
        :limit="pageSize"
        :total="total"
        @pagination="pagination"
      />
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index";
import { applcationList } from "@/api/application";
export default {
  name: "Index",
  components: { Pagination },
  data() {
    var validator = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(rule.message2));
      } else if (value.toString().trim() === "") {
        callback("不能全为空格");
      } else {
        callback();
      }
    };
    return {
      btnHidde: true,
      filterInfo: {
        // 搜索字段
        data: {
          name: null,
          age: null,
          count: 1,
          sex: 1,
          date: null,
          dateTime: null,
          range: null,
        },
        // 条件配置项
        fieldList: [
          {
            label: "告警类型",
            type: "select",
            value: "policyType",
            list: "policyTypeList",
          },

          {
            label: "告警级别",
            type: "select",
            value: "policyLeve",
            list: "policyLeveList",
          },
          {
            label: "告警对象",
            type: "select",
            value: "policyWho",
            list: "policyWhoList",
          },
          { label: "策略名称", type: "input", value: "name" },
        ],
      },
      listTypeInfo: {
        policyTypeList: [
          {
            id: 1,
            name: "应用告警",
          },
          {
            id: 2,
            name: "集成流告警",
          },
          {
            id: 3,
            name: "API服务告警",
          },
          {
            id: 4,
            name: "API告警",
          },
          {
            id: 5,
            name: "环境告警",
          },
        ],
        policyLeveList: [
          {
            id: 0,
            name: "全部",
          },
          {
            id: 1,
            name: "一般",
          },
          {
            id: 2,
            name: "重要",
          },
          {
            id: 4,
            name: "紧急",
          },
        ],

        policyWhoList: [
          {
            id: 0,
            name: "全部",
          },
          {
            id: 1,
            name: "默认项目",
          },
        ],
      },

      title: "",
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      id: -1,
      ruleForm: {
        name: "",
        desc: "",
        code: "",
      },
      loading: false,
    };
  },
  mounted() {
    this.initPage();
  },
  methods: {
    /** 搜索 */
    handleFilter(row) {
      console.log(row);
    },
    /** 重置 */
    handleReset(row) {
      console.log(row);
    },
    /** 焦点失去事件 */
    handleEvent(row) {
      console.log(row);
    },
    initPage() {
      this.loading = true;

      applcationList({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      })
        .then((res) => {
          this.loading = false;
          const { code, message, data, total } = res || {};
          if (code === 20000) {
            this.tableData = data.list;
            this.total = data.list.length;
          } else {
            this.$message.error(message);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    refreshList() {
      this.initPage();
    },
    add() {
      this.$api.DS.addDataSetType(this.ruleForm)
        .then((res) => {
          if (res.status === 200) {
            this.$message.success(res.message);
            this.handleClose();
            this.currentPage = 1;
            this.initPage();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          // this.$message.error(err.message)
          console.log(err);
        });
    },
    update() {
      this.$api.DS.editDataSetType({
        id: this.id,
        ...this.ruleForm,
      })
        .then((res) => {
          if (res.status === 200) {
            this.$message.success(res.message);
            this.handleClose();
            // this.currentPage = 1
            this.initPage();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          // this.$message.error(err.message)
          console.log(err);
        });
    },
    handleEdit(row) {
      this.id = row.id;
      var { name, desc, code } = row;
      Object.assign(this.ruleForm, { name, desc, code });
      this.dialogVisible = true;
    },
    handleDel(row) {
      // 删除
      // const content = row.locked === 0 ? '确定要锁定吗?' : '确定要解锁吗?'
      this.$confirm("确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .delete(`web/dataSetType/delete?id=${row.id}`)
            .then((res) => {
              const { status, message } = res.data || {};
              if (status === 200) {
                this.initPage();
                this.$message({
                  type: "success",
                  message: message,
                });
              } else {
                this.$message.error(message);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: err,
          });
        });
    },
    handlelock(row) {
      const content = row.locked === 0 ? "确定要锁定吗?" : "确定要解锁吗?";
      this.$confirm(content, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .get(`web/tenant/${row.locked == 0 ? "lock" : "unlock"}/${row.id}`)
            .then((res) => {
              const { status, message } = res.data || {};
              if (status === 200) {
                this.initPage();
                this.$message({
                  type: "success",
                  message: message,
                });
              } else {
                this.$message.error(message);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: err,
          });
        });
    },
    handleClose() {
      this.resetForm();
      this.dialogVisible = false;
    },
    resetForm() {
      this.$refs["ruleForm"].resetFields();
      this.ruleForm = {
        name: "",
        desc: "",
        code: "",
      };
    },
    save() {
      // 提交
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          if (this.id === -1) {
            this.add();
          } else {
            this.update();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleDisabled(row) {
      const content = row.disabled === 0 ? "确定要关闭吗?" : "确定要开启吗?";
      this.$confirm(content, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .get(`web/tenant/${row.disabled == 0 ? "close" : "open"}/${row.id}`)
            .then((res) => {
              const { status, message } = res.data || {};
              if (status === 200) {
                this.initPage();
                this.$message({
                  type: "success",
                  message: message,
                });
              } else {
                this.$message.error(message);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: err,
          });
        });
    },
    pagination(val) {
      this.pageSize = val.limit;
      this.currentPage = val.page;
      this.initPage();
    },
    resetTitle() {
      this.title = "";
      this.initPage();
    },
  },
};
</script>

<style scoped></style>
