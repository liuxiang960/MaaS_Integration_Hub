<template>
  <div class="sdm-bg">
    <div class="sdm-bg-sty sdm-bg-data">
      <div class="sdm-bg-title-btn">
        <div>
          <el-col :span="4" :xs="24">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="small"
              @click="newAdd"
              >创建API服务</el-button
            >
          </el-col>
          <el-col :span="20" :xs="24" style="margin-bottom: 20px">
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

        <el-table-column prop="name" label="API服务名称" width="160">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="goApi(scope.row)">{{
              scope.row.name
            }}</el-button>

            <!-- <el-button type="text" size="small" @click="handleDisabled(scope.row)">{{ scope.row.disabled === 0 ? '关闭' : '开启' }}</el-button>
            <el-button type="text" size="small" @click="handlelock(scope.row)">{{ scope.row.locked === 0 ? '锁定' : '解锁' }} </el-button> -->
          </template>
        </el-table-column>
        <el-table-column prop="status" :label="$t('stauts')" />

        <el-table-column prop="domain" label="服务域名" />
        <!-- <el-table-column prop="version" label="分组" /> -->
        <el-table-column prop="description" :label="$t('description')" />
        <el-table-column :label="$t('operation')" width="160">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)"
              >查看</el-button
            >
            <el-button type="text" size="small" @click="newApi(scope.row)"
              >新建API</el-button
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
import Cookies from "js-cookie";

import Pagination from "@/components/Pagination/index";
import { apiManagerList, apiManagerDeletd } from "@/api/apiManager";

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
            label: "时间段",
            type: "date",
            value: "range",
            dateType: "daterange",
          },
        ],
      },
      listTypeInfo: {
        appList: [
          {
            id: 1,
            name: "test",
          },
          {
            id: 2,
            name: "test1",
          },
        ],
        appVersionList: [
          {
            id: 1,
            name: "1.0.0",
          },
          {
            id: 2,
            name: "1.0.1",
          },
        ],
        envList: [],
        liuList: [],
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
    newAdd() {
      this.$router.push({
        path: "/application/newApiServe",
      });
    },
    goApi(item) {
      this.$router.push({
        path: "/application/newApiList",
        query: item,
      });
    },
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

      apiManagerList({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      })
        .then((res) => {
          this.loading = false;
          const { code } = res || {};
          if (code === 20000) {
            if (Cookies.get("apiManager")) {
              let list = JSON.parse(Cookies.get("apiManager")) || [];
              this.tableData = list;
              this.total = list.length;
            }
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
    newApi(row) {
      this.$router.push({
        path: "/application/newApi",
        query: row,
      });
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
      this.$router.push({
        path: "/application/newApiServe",
        query: row,
      });
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
          this.deleteRow(row);
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: err,
          });
        });
    },
    deleteRow(row) {
      apiManagerDeletd(row)
        .then((res) => {
          this.loading = false;
          const { code, message, data, total } = res || {};
          if (code === 20000) {
            this.$message.success("操作成功");
            this.initPage();
          } else {
            this.$message.error(message);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
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
