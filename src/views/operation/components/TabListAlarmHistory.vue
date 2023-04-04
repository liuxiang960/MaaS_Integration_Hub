<template>
  <div class="sdm-bg">
    <div class="sdm-bg-sty sdm-bg-data">
      <div class="sdm-bg-title-btn">
        <div>
          <el-col :span="0" :xs="24" />
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
        <el-table-column prop="startTime" label="触发时间" />
        <el-table-column prop="status" label="告警状态" />
        <el-table-column prop="type" label="告警类型" />
        <el-table-column prop="leve" :label="$t('app_1070')" />

        <el-table-column prop="content" label="告警内容" />
        <el-table-column prop="duration" label="持续时长" />
        <el-table-column prop="endTime" label="结束时间" />
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
import { operationHistory } from "@/api/apiManager";
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
          {
            label: "告警状态",
            type: "select",
            value: "appName",
            list: "alarmStautList",
          },

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
        ],
      },
      listTypeInfo: {
        alarmStautList: [
          {
            id: 1,
            name: "全部告警",
          },
          {
            id: 2,
            name: "持续中",
          },
          {
            id: 3,
            name: "已恢复",
          },
          {
            id: 4,
            name: "已失效",
          },
        ],
        policyList: [
          {
            id: 1,
            name: "全部告警策略",
          },
        ],
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

      operationHistory({
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

    handleEdit(row) {
      this.id = row.id;
      var { name, desc, code } = row;
      Object.assign(this.ruleForm, { name, desc, code });
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
    save() {},

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
