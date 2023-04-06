<template>
  <div class="sdm-bg">
    <div class="sdm-bg-sty sdm-bg-data">
      <div class="sdm-bg-title-btn">
        <div>
          <el-col :span="24" :xs="24" style="margin-bottom: 20px">
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
        <el-table-column prop="date" :label="$t('app_1060')" />
        <el-table-column prop="ip" :label="$t('app_1061')" />
        <el-table-column prop="appName" :label="$t('appName')" />
        <el-table-column prop="apiName" :label="$t('app_1014')" />
        <el-table-column prop="apiPath" :label="$t('app_1062')" />
        <el-table-column prop="responseStatus" :label="$t('app_1063')" />
        <el-table-column :label="$t('app_1064')" width="120">
          <template slot-scope="scope">
            <div class="text-ellipsis">{{ scope.row.request }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('app_1065')" width="120">
          <template slot-scope="scope">
            <div class="text-ellipsis">{{ scope.row.response }}</div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('operation')" width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleEdit(scope.row)"
              >{{ $t("app_1066") }}</el-button
            >
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
import { operationDayList } from "@/api/apiManager";
export default {
  name: "Index",
  components: { Pagination },
  data() {
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
          { label: this.$t("appName"), type: "input", value: "workFlag" },
          { label: this.$t("app_1067"), type: "input", value: "logMsg" },
          {
            label: this.$t("app_1068"),
            type: "date",
            value: "range",
          },
        ],
      },
      listTypeInfo: {},

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

      operationDayList({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      })
        .then((res) => {
          this.loading = false;
          const { code, message } = res.data || {};
          this.tableData = res.data.list;
          this.total = res.data.total;
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
      this.$router.push({
        path: "/operation/dayRecorDetail",
        query: row,
      });
    },
    handleDel(row) {
      // 删除
      // const content = row.locked === 0 ? '确定要锁定吗?' : '确定要解锁吗?'
      this.$confirm("确定要下载吗", this.$t("tost_1002"), {
        confirmButtonText: this.$t("sure"),
        cancelButtonText: this.$t("cancel"),
        type: "warning",
      })
        .then(() => {
          this.$message.success("下载成功");
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

<style scoped>
.text-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}
</style>
