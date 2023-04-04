<template>
  <div class="sdm-bg">
    <el-col :span="6">
      <div class="sdm-bg-sty sdm-bg-data">
        <div class="sdm-bg-title-btn">
          <div>
            <el-col
              :span="24"
              :xs="24"
              style="padding-left: 0px; padding-right: 0px"
            >
              <el-button
                style="width: 100%; padding-left: 0px; padding-right: 0px"
                type="primary"
                icon="el-icon-plus"
                @click="newAdd"
                >{{ $t("new") }}</el-button
              >
            </el-col>
            <el-col
              :span="24"
              :xs="24"
              style="margin-bottom: 20px; padding-left: 0px; padding-right: 0px"
            >
              <div style="margin-top: 15px">
                <el-input
                  :placeholder="$t('plaseInput')"
                  class="input-with-select"
                >
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
            </el-col>
          </div>
        </div>
        <el-table
          v-loading="loading"
          :data="tableData"
          border
          style="width: 100%"
          :row-class-name="tableRowClassName"
          :stripe="false"
          @row-click="rowClick"
          @cell-mouse-enter="cellMouseEnter"
          @cell-mouse-leave="cellMouseLeave"
        >
          <el-table-column
            :label="$t('app_1092')"
            style="padding-top: 5px; padding-bottom: 5px"
          >
            <template slot-scope="scope">
              <el-col :span="24">
                <div>
                  <div class="name_p">{{ scope.row.name }}</div>
                </div>
                <div>
                  <div class="name_p">
                    {{ scope.row.method }}
                    <span class="name_span">{{ scope.row.path }}</span>
                  </div>
                </div>
              </el-col>
            </template>
          </el-table-column>

          <el-table-column :label="$t('app_1091')" width="80">
            <template>
              <el-col>
                <div class="name_p" style="font-size: 11px">•••</div>
              </el-col>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>

    <el-col :span="18">
      <div style="display: flex; justify-content: flex-end; margin-right: 90px">
        <el-button type="primary" size="small" @click="goAplly()">{{
          $t("app_1093")
        }}</el-button>

        <el-button plain @click="goEdit()">{{ $t("edit") }}</el-button>

        <el-button size="small" @click="goBack()">{{ $t("back") }}</el-button>
        <!-- <el-button plain @click="goDeleted()">删 除</el-button> -->
      </div>
      <detail :updata="detailData"></detail>
    </el-col>
  </div>
</template>

<script>
import Cookies from "js-cookie";

import {
  apiManagerDeletd,
  apiServeList,
  apiServeDeletd,
  upDataApiServeList,
} from "@/api/apiManager";

import Detail from "@/views/apiManager/components/apiList/Detail";
export default {
  name: "Index",
  components: { Detail },
  props: {
    updata: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      btnHidde: true,
      detailData: {},
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
      rowIndex: -1,
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
    goAplly() {
      this.$message.success(this.$t("app_1176"));
    },
    goEdit() {
      this.$router.push({
        path: "/application/newApi",
        query: this.detailData,
      });
    },
    goDeleted() {
      this.loading = true;
      apiServeDeletd({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        apiServeMap: this.detailData,
      })
        .then((list) => {
          this.initPage();
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
    goBack() {
      this.$router.back();
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

      apiServeList({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        apiServeMap: this.updata,
      })
        .then((list) => {
          this.loading = false;
          this.tableData = list;
          if (list && list.length) {
            this.detailData = list[0];
            console.log("###########打印api服务列表数据Item:", list[0]);
            let that = this;
            setTimeout(function () {
              that.rowClick(that.tableData[0]);
            }, 50);
          }
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

    rowClick(row, column, event) {
      // console.log('点击行事件', row, column, event)

      // 注意必须是使用两次深拷贝 因为 selectFlag 属性不是tableData原有的 则直接修改无效  所以两次深拷贝重新赋值
      let Arr = JSON.parse(JSON.stringify(this.tableData));
      for (let index = 0; index < Arr.length; index++) {
        const element = Arr[index];
        if (element.id == row.id) {
          element["selectFlag"] = true;
          console.log("找到对应行");
        } else {
          element["selectFlag"] = false;
        }
      }
      this.tableData = JSON.parse(JSON.stringify(Arr));

      this.detailData = row;
      console.log("点击行", row);
    },
    cellMouseEnter(row, column, cell, event) {
      // console.log('移入hover事件', row, column, cell, event)

      // 注意必须是使用两次深拷贝 因为 hoverFlag 属性不是tableData原有的 则直接修改无效  所以两次深拷贝重新赋值
      let Arr = JSON.parse(JSON.stringify(this.tableData));
      for (let index = 0; index < Arr.length; index++) {
        const element = Arr[index];
        if (element.id == row.id) {
          console.log("找到对应行");
          element["hoverFlag"] = true;
        } else {
          element["hoverFlag"] = false;
        }
      }
      this.tableData = JSON.parse(JSON.stringify(Arr));
    },
    cellMouseLeave() {
      // 移除hover的事件
      for (let index = 0; index < this.tableData.length; index++) {
        const element = this.tableData[index];
        element["hoverFlag"] = false;
      }
    },
    tableRowClassName({ row, rowIndex }) {
      // 行的 className 的回调方法，为 Table 中的某一行添加 class，表明该行处于某种状态。
      if (row.selectFlag) {
        return "success-row";
      } else {
        return "";
      }
    },
  },
};
</script>

<style>
/* 首先去除默认的hover效果 */
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(0, 0, 0, 0) !important;
}

/* 设置点击行的效果 */
.el-table .success-row {
  background: #eee;
  /* background: #f5f7fa; */
}
.el-table .success-yellow {
  background: #eee;
}
.name_p {
  font-size: 14px;
  font-weight: 500;
  color: #000;
}
.name_span {
  font-size: 14px;
  color: #333;
}
</style>
