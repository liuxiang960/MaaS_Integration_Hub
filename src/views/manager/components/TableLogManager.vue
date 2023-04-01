<template>
  <div class="sdm-bg">
    <div class="sdm-bg-sty sdm-bg-data">
      <div class="sdm-bg-title-btn">
        <div>
          <!-- <el-col :span="4" :xs="24">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="small"
              @click="newAdd"
             >{{$t('app_1069')}}</el-button
            >
          </el-col> -->
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
        <el-table-column prop="date" :label="$t('app_1072')" />

        <el-table-column prop="name" label="操作用户" />

        <el-table-column prop="result" :label="$t('app_1073')" />
        <el-table-column prop="module" :label="$t('app_1074')" />

        <el-table-column :label="$t('app_1075')" width="200">
          <template slot-scope="scope">
            <div class="text-ellipsis">{{ scope.row.event }}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="160">
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

    <div>
      <el-dialog
        :title="this.$t('tost_1002')"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
          <el-form-item :label="$t('app_1071')">
            <el-input disabled="disabled" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('app_1072')">
            <el-input disabled="disabled" v-model="ruleForm.date"></el-input>
          </el-form-item>

          <el-form-item :label="$t('app_1073')">
            <el-input disabled="disabled" v-model="ruleForm.result"></el-input>
          </el-form-item>
          <el-form-item :label="$t('app_1074')">
            <el-input disabled="disabled" v-model="ruleForm.module"></el-input>
          </el-form-item>
          <el-form-item :label="$t('app_1075')">
            <el-input
              disabled="disabled"
              :autosize="{ minRows: 4, maxRows: 6 }"
              type="textarea"
              v-model="ruleForm.event"
            ></el-input>
          </el-form-item>

          <!-- <el-form-item style="margin-top: 50px">
            <el-button type="primary" @click="onSubmit">
              {{ $t("sure") }}</el-button
            >
            <el-button @click="dialogVisible = false">{{
              $t("cancel")
            }}</el-button>
          </el-form-item> -->
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index";
import { DateToStr } from "@/utils/index";
import { logList, logNew, logDeletd } from "@/api/log";
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
      btnHidde: false,

      title: "",
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      id: -1,
      ruleForm: {
        name: "",
        date: "",
        result: "",
        module: "",
        event: "",
      },
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
            label: this.$t("app_1074"),
            type: "input",
            value: "name",
          },
          {
            label: this.$t("app_1075"),
            type: "input",
            value: "name",
          },
          {
            label: this.$t("app_1068"),
            type: "date",
            value: "date",
          },
        ],
      },
      listTypeInfo: {
        //  alarmStautList: [
        //   {
        //     id: 1,
        //     name: "全部告警",
        //   },
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
    onSubmit() {
      if (!this.ruleForm.name) {
        this.$message.error(this.$t("app_1076"));
        return;
      }
      this.dialogVisible = false;
      let data = this.ruleForm;
      data.date = DateToStr(this.ruleForm.date);
      logNew(data)
        .then((res) => {
          this.loading = false;
          this.initPage();
          this.$message.success(this.$t("successfulOperation"));
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    initPage() {
      this.loading = true;

      logList({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      })
        .then((res) => {
          this.loading = false;
          const { code, message, data, total } = res || {};
          this.tableData = data.data;
          this.total = total;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    refreshList() {
      this.initPage();
    },
    newAdd() {
      this.ruleForm = {
        name: "",
        date: "",
        result: "",
        module: "",
        event: "",
      };
      this.dialogVisible = true;
    },

    handleEdit(row) {
      this.id = row.id;
      var { name, account, role } = row;
      this.ruleForm = row;
      Object.assign(this.ruleForm, { name, account, role });
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
          logDeletd(row)
            .then((res) => {
              this.initPage();
            })
            .catch((err) => {
              this.loading = false;
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

<style scoped>
.text-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}
</style>
