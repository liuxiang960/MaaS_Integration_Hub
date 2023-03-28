<template>
  <div class="sdm-bg">
    <div class="sdm-bg-sty sdm-bg-data">
      <div class="sdm-bg-title-btn">
        <!-- <h3>集成应用</h3> -->
        <div>
          <el-col :span="4" :xs="24">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="small"
              @click="dialogVisible = true"
              >{{ $t("addApp") }}</el-button
            >
          </el-col>

          <el-col :span="20" :xs="24" style="margin-bottom: 20px">
            <el-filter
              :data="filterInfo.data"
              :field-list="filterInfo.fieldList"
              :list-type-info="listTypeInfo"
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

        <el-table-column prop="desc" :label="$t('description')" />
        <el-table-column prop="name" :label="$t('appName')" />
        <el-table-column prop="status" :label="$t('stauts')" />
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

    <!-- 编辑/新增 弹窗 start -->
    <el-dialog
      :title="id == -1 ? '添加应用' : '修改应用'"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="128px"
        class="demo-ruleForm"
      >
        <el-form-item :label="$t('appName')" prop="name">
          <el-input v-model="ruleForm.name" :placeholder="$t('plaseInput')" />
        </el-form-item>
        <!-- <el-form-item label="数据集类型编码" prop="code">
          <el-input v-model="ruleForm.code":placeholder="$t('plaseInput')" />
        </el-form-item> -->
        <el-form-item label="应用描述" prop="desc">
          <el-input v-model="ruleForm.desc" :placeholder="$t('plaseInput')" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $t("cancel") }}</el-button>
        <el-button type="primary" @click="save">{{ $t("sure") }}</el-button>
      </span>
    </el-dialog>
    <!-- 编辑/新增 弹窗 end -->
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
        fieldList: [{ label: "应用名", type: "input", value: "name" }],
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
      rules: {
        name: [
          {
            required: true,
            message2: "请输入名称",
            trigger: "blur",
            validator,
          },
        ],
        desc: [
          {
            required: true,
            message2: "请输入描述",
            trigger: "blur",
            validator,
          },
        ],
        code: [
          {
            required: true,
            message2: "请输入编码",
            trigger: "blur",
            validator,
          },
        ],
      },
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
