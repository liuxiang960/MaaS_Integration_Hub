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
            >{{ $t("app_1039") }}</el-button>
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

        <el-table-column :label="$t('app_1013')" width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleEdit(scope.row)"
            >{{ scope.row.name }}</el-button>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="num" :label="$t('app_1040')" /> -->
        <el-table-column prop="description" :label="$t('app_1041')" />

        <el-table-column
          v-if="language == 'en'"
          :label="$t('operation')"
          width="300"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleEdit(scope.row)"
            >{{ $t("edit") }}</el-button>
            <el-button type="text" size="small" @click="goFlow(scope.row)">{{
              $t("app_1042")
            }}</el-button>
            <el-button type="text" size="small" @click="handleDel(scope.row)">{{
              $t("deletd")
            }}</el-button>
          </template>
        </el-table-column>

        <el-table-column v-else :label="$t('operation')" width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleEdit(scope.row)"
            >{{ $t("edit") }}</el-button>
            <el-button type="text" size="small" @click="goFlow(scope.row)">{{
              $t("app_1042")
            }}</el-button>
            <el-button type="text" size="small" @click="handleDel(scope.row)">{{
              $t("deletd")
            }}</el-button>
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
          <el-form-item :label="$t('app_1043')">
            <el-input v-model="ruleForm.code" />
          </el-form-item>
          <el-form-item :label="$t('app_1044')">
            <el-input
              v-model="ruleForm.content"
              type="textarea"
              :maxlength="500"
              :autosize="{ minRows: 5, maxRows: 5 }"
            />
          </el-form-item>

          <el-form-item :label="$t('app_1045')">
            <el-input
              v-model="ruleForm.description"
              type="textarea"
              :maxlength="500"
              :autosize="{ minRows: 5, maxRows: 5 }"
            />
          </el-form-item>

          <el-form-item style="margin-top: 50px">
            <el-button type="primary" @click="onSubmit">
              {{ $t("sure") }}</el-button>
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
import Pagination from "@/components/Pagination/index"
import {
  integrationList,
  integrationNew,
  integrationDeletd
} from "@/api/integration"
export default {
  name: "Index",
  components: { Pagination },
  data() {
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
        content: "",
        description: ""
      },
      loading: false,
      filterInfo: {
        // 搜索字段
        data: {
          name: null,
          age: null,
          count: 1,
          sex: 1,
          date: null,
          dateTime: null,
          range: null
        },
        // 条件配置项
        fieldList: [
          {
            label: this.$t("app_1046"),
            type: "input",
            value: "name"
          }
        ]
      },
      listTypeInfo: {}
    }
  },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  mounted() {
    this.initPage()
  },
  methods: {
    /** 搜索 */
    handleFilter(row) {
      console.log(row)
    },
    /** 重置 */
    handleReset(row) {
      console.log(row)
    },
    /** 焦点失去事件 */
    handleEvent(row) {
      console.log(row)
    },
    // 流程编排
    goFlow(row) {
      this.$router.push({
        path: "/application/process",
        query: row
      })
    },
    onSubmit() {
      if (!this.ruleForm.code) {
        this.$message.error(this.$t("app_1047"))
        return
      }
      this.dialogVisible = false

      integrationNew(this.ruleForm)
        .then((res) => {
          this.loading = false
          this.initPage()
          this.$message.success(this.$t("successfulOperation"))
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },

    initPage() {
      this.loading = true
      integrationList({
        pageNum: this.currentPage,
        pageSize: this.pageSize
      })
        .then((res) => {
          this.loading = false
          this.tableData = res
          this.total = res.length
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    refreshList() {
      this.initPage()
    },
    newAdd() {
      this.$router.push({
        path: "/application/newIntegration"
      })
      return
      this.ruleForm = {
        name: "",
        content: "",
        description: ""
      }
      this.dialogVisible = true
    },

    handleEdit(row) {
      this.$router.push({
        path: "/application/newIntegration",
        query: row
      })
      return
      this.id = row.id
      var { name, account, role } = row
      Object.assign(this.ruleForm, { name, account, role })
      this.ruleForm = row
      this.dialogVisible = true
    },
    handleDel(row) {
      // 删除
      // const content = row.locked === 0 ? '确定要锁定吗?' : '确定要解锁吗?'
      this.$confirm(this.$t("tost_1001"), this.$t("tost_1002"), {
        confirmButtonText: this.$t("sure"),
        cancelButtonText: this.$t("cancel"),
        type: "warning"
      })
        .then(() => {
          integrationDeletd(row)
            .then((res) => {
              this.initPage()
            })
            .catch((err) => {
              this.loading = false
              console.log(err)
            })
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: err
          })
        })
    },

    handleClose() {
      this.resetForm()
      this.dialogVisible = false
    },
    resetForm() {
      this.$refs["ruleForm"].resetFields()
      this.ruleForm = {
        name: "",
        desc: "",
        code: ""
      }
    },
    save() {},

    pagination(val) {
      this.pageSize = val.limit
      this.currentPage = val.page
      this.initPage()
    },
    resetTitle() {
      this.title = ""
      this.initPage()
    }
  }
}
</script>

<style scoped></style>
