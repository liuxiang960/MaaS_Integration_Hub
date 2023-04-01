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
          width="180"
          :index="(i) => (currentPage - 1) * pageSize + i + 1"
        />

        <el-table-column prop="name" :label="$t('app_1027')" width="160">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="goApi(scope.row)">{{
              scope.row.name
            }}</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="description" :label="$t('description')" />
        <el-table-column :label="$t('operation')" width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleEdit(scope.row)"
              >{{ $t("look") }}</el-button
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

    <div>
      <el-dialog
        :title="this.$t('tost_1002')"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form ref="form" :model="ruleForm" label-width="120px">
          <el-form-item :label="$t('app_1027')">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item :label="$t('description')">
            <el-input type="textarea" v-model="ruleForm.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">{{
              ruleForm.id ? "确认修改" : "立即创建"
            }}</el-button>
            <el-button @click="dialogVisible = false">{{
              $t("cancel")
            }}</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index";
import { apiServeNew, apiServeDeletd, apiServeList } from "@/api/apiServer";

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
            label: this.$t("app_1068"),
            type: "date",
            value: "range",
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
      appDataList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      id: -1,
      ruleForm: {
        name: "",
        description: "",
        app: "",
      },
      loading: false,
    };
  },
  mounted() {
    this.initPage();
  },
  methods: {
    newAdd() {
      this.ruleForm = {
        name: "",
        description: "",
        app: "",
      };
      this.dialogVisible = true;
    },
    onSubmit() {
      //创建
      if (!this.ruleForm.name) {
        this.$message.error("请填写API服务名");
        return;
      }

      this.loading = true;
      let dit = this.ruleForm;
      apiServeNew(dit)
        .then((res) => {
          this.$message.success(this.$t("successfulOperation"));
          this.initPage();
          this.dialogVisible = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
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
    handleClose() {
      this.dialogVisible = false;
    },
    initPage() {
      this.loading = true;
      apiServeList({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      })
        .then((res) => {
          this.loading = false;
          const { code } = res || {};
          this.tableData = res;
          this.total = res.length;
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
      debugger;
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
      this.ruleForm = row;
      this.dialogVisible = true;
    },
    handleDel(row) {
      // 删除
      // const content = row.locked === 0 ? '确定要锁定吗?' : '确定要解锁吗?'
      this.$confirm(this.$t("tost_1001"), this.$t("tost_1002"), {
        confirmButtonText: this.$t("sure"),
        cancelButtonText: this.$t("cancel"),
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
      apiServeDeletd(row)
        .then((res) => {
          this.loading = false;
          const { code, message, data, total } = res || {};
          if (code === 20000) {
            this.$message.success(this.$t("successfulOperation"));
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
      this.$confirm(content, this.$t("tost_1002"), {
        confirmButtonText: this.$t("sure"),
        cancelButtonText: this.$t("cancel"),
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
      this.$confirm(content, this.$t("tost_1002"), {
        confirmButtonText: this.$t("sure"),
        cancelButtonText: this.$t("cancel"),
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
