<template>
  <div>
    <div class="sdm-bg">
      <div class="sdm-bg-sty sdm-bg-data">
        <div class="sdm-bg-title-btn">
          <div>
            <el-col :span="3" :xs="24">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="small"
                @click="addNew"
                >新建凭证</el-button
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
          <el-table-column prop="name" label="凭证名称" />
          <el-table-column prop="id" label="凭证ID" />
          <el-table-column prop="authentication" label="BasicAuth账号" />
          <el-table-column prop="description" :label="$t('description')" />
          <el-table-column prop="status" label="运行状态" />
          <el-table-column label="启/禁用" width="160">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.value" />
            </template>
          </el-table-column>

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
                @click="handleDel(scope.row)"
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

    <div>
      <el-dialog
        title="添加凭证"
        :visible.sync="dialogVisible"
        width="31%"
        :before-close="handleClose"
      >
        <el-form ref="form" :model="form" label-width="110px">
          <el-form-item label="凭证名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="BasicAuth密码">
            <el-input type="password" v-model="form.authentication"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="联系邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>

          <el-form-item label="所属企业">
            <el-input v-model="form.company"></el-input>
          </el-form-item>

          <el-form-item :label="$t('description')">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item style="margin-top: 50px">
            <el-button type="primary" @click="save">{{ $t("sure") }}</el-button>
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
import {
  apiCertificateList,
  apiCertificateNew,
  apiCertificateDeletd,
} from "@/api/apiManager";
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
      dialogVisible: false,
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
        fieldList: [{ label: "订阅账号UIN", type: "input", value: "name" }],
      },
      listTypeInfo: {},

      title: "",
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      id: -1,
      form: {
        name: "",
        desc: "",
        code: "",
      },
      loading: false,
      apiServeMap: {},
    };
  },
  props: {
    updata: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    if (this.updata) {
      this.apiServeMap = this.updata;
    }
    this.initPage();
  },
  methods: {
    addNew() {
      this.handleClose();
      this.dialogVisible = true;
    },
    save() {
      let data = this.form;
      data.apiServeMap = this.apiServeMap;
      apiCertificateNew(data)
        .then((res) => {
          this.loading = false;
          this.dialogVisible = false;

          this.$message.success(this.$t("app_1059"));
          this.initPage();
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
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
      let data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      };
      data.apiServeMap = this.apiServeMap;
      apiCertificateList(data)
        .then((res) => {
          this.loading = false;
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

    handleEdit(row) {
      this.form = row;
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
          apiCertificateDeletd(row).then(() => {
            this.initPage();
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
      this.form = {
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
