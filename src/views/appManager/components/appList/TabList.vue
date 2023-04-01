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

        <el-table-column prop="name" :label="$t('appName')" width="160">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">{{
              scope.row.name
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column :label="$t('instancesNumber')" width="180">
          <template slot-scope="scope">
            <div type="text">{{ scope.row.paramsList.length }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="serveType" :label="$t('applicationType')" />

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
              @click="handleDel(scope.row, false)"
              >{{ $t("deletd") }}</el-button
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
import { appList, appDeletd } from "@/api/app";
import { apiServeNew } from "@/api/apiServer";

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
            label: this.$t("appName"),
            type: "input",
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
        path: "/application/newApp",
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

      appList({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        apiServeMap: this.updata,
      })
        .then((list) => {
          this.loading = false;
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
        path: "/application/newApp",
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
      appDeletd(row)
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
