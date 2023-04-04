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
              >{{ $t("new") }}</el-button
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
        <!-- index 第二页的序号累计在第一页的基础上-->
        <el-table-column prop="name" :label="$t('name')" width="160">
        </el-table-column>

        <el-table-column prop="method" :label="$t('method')" />
        <el-table-column prop="path" :label="$t('app_1009')" />

        <el-table-column prop="description" :label="$t('description')" />
        <el-table-column :label="$t('operation')" width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleEdit(scope.row)"
              >{{ $t("edit") }}</el-button
            >
            <el-button
              type="text"
              size="small"
              v-show="scope.row.status != 'success'"
              @click="releaseApi(scope.row)"
              >{{ $t("app_1093") }}</el-button
            >
            <el-button
              v-if="!scope.row.isUp"
              type="text"
              size="small"
              @click="shelfDel(scope.row, true)"
              >上架</el-button
            >
            <el-button
              v-else
              type="text"
              size="small"
              @click="shelfDel(scope.row, false)"
              >下架</el-button
            >
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
import {
  apiManagerList,
  apiManagerDeletd,
  apiServeList,
  upDataApiServeList,
} from "@/api/apiManager";

export default {
  name: "Index",
  components: { Pagination },
  props: {
    updata: {
      type: Object,
      default: () => ({}),
    },
  },
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
        path: "/application/newApi",
        query: this.updata,
      });
    },
    goApi(item) {
      this.$router.push({
        path: "/application/newApiList",
        query: item,
      });
    },
    /** 搜索 */
    handleFilter(row) {},
    /** 重置 */
    handleReset(row) {},
    /** 焦点失去事件 */
    handleEvent(row) {},
    initPage() {
      this.loading = true;

      apiServeList({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        apiServeMap: this.updata,
      })
        .then((list) => {
          this.loading = false;

          console.log("###########打印api列表数据", JSON.stringify(list));
          this.tableData = list;
          this.total = list.length;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    refreshList() {
      this.initPage();
    },
    releaseApi(row) {
      //发布
      row.status = this.$t("published");
      upDataApiServeList(row).then((res) => {
        this.$message.success(this.$t("successfulOperation"));
      });
    },
    shelfDel(row, isUp) {
      row.isUp = isUp;
      upDataApiServeList(row).then((res) => {
        this.$message.success(this.$t("successfulOperation"));
      });
    },
    handleEdit(row) {
      this.$router.push({
        path: "/application/newApi",
        query: row,
      });
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
      apiManagerDeletd(row)
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
            .catch((err) => {});
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
