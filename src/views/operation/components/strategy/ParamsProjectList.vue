<template>
  <div class="content-bg">
    <el-table
      :data="tableData"
      height="250"
      max-height="250"
      border
      style="width: 100%"
      :header-cell-style="{
        height: '30px',
        paddingTop: '0px',
        paddingBottom: '0px',
        backgroundColor: ' #eee',
      }"
      :row-style="{ height: '30px' }"
      :cell-style="{ padding: '0px' }"
    >
      <el-table-column prop="name" :label="$t('app_1099')" />
      <el-table-column prop="role" :label="$t('app_1100')" />
      <el-table-column prop="mobile" :label="$t('app_1101')" />
      <el-table-column prop="email" :label="$t('app_1102')" />
      <el-table-column v-if="!isPreview" :label="$t('operation')" width="110">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">{{
            $t("look")
          }}</el-button>

          <el-button type="text" size="small" @click="handleDel(scope.row)">{{
            $t("deletd")
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      v-if="!isPreview"
      class="btn"
      type="primary"
      icon="el-icon-plus"
      size="small"
      @click="newAdd"
    >{{ $t("addRecord") }}( {{ tableData.length }}/{{ maxNum }} )</el-button>
    <div>
      <el-dialog
        :title="this.$t('tost_1002')"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form ref="form" :model="form" label-width="180px">
          <el-form-item :label="$t('app_1099')">
            <el-input
              v-model="form.name"
              :placeholder="$t('plaseInput')"
            />
          </el-form-item>
          <el-form-item :label="$t('app_1100')">
            <el-input
              v-model="form.role"
              :placeholder="$t('plaseInput')"
            />
          </el-form-item>
          <el-form-item :label="$t('app_1101')">
            <el-input
              v-model="form.mobile"
              :placeholder="$t('plaseInput')"
            />
          </el-form-item>
          <el-form-item :label="$t('app_1168')">
            <el-input
              v-model="form.email"
              :placeholder="$t('plaseInput')"
            />
          </el-form-item>

          <el-form-item style="margin-top: 50px">
            <el-button type="primary" @click="onSubmit">{{
              $t("sure")
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
import { removeListItem } from "../../../../utils/index"
export default {
  props: {
    updata: {
      type: Array,
      default: () => []
    },
    isPreview: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      maxNum: 30,
      tableData: [],
      form: {
        name: "",
        period: this.$t("app_1132"),
        condition: ">",
        params: "个"
      },
      dialogVisible: false
    }
  },
  watch: {
    updata(newV, oldV) {
      this.tableData = this.updata
    }
  },
  mounted() {
    if (this.updata) {
      this.tableData = this.updata
    }
  },
  methods: {
    newAdd() {
      const dict = {
        name: "",
        role: "",
        mobile: "",
        email: ""
      }
      this.form = dict
      this.dialogVisible = true
    },

    handleEdit(dict) {
      this.form = dict
      this.dialogVisible = true
    },
    handleDel(dict) {
      this.tableData = removeListItem(this.tableData, dict.id, null)
      this.$emit("updataFun", this.tableData)
    },
    onSubmit() {
      if (!this.form.name) {
        this.$message.error(this.$t("app_1169"))
        return
      }
      this.dialogVisible = false
      if (this.form.id) {
        this.tableData = removeListItem(
          this.tableData,
          this.form.id,
          this.form
        )
      } else {
        this.form.id = Math.floor(Math.random() * 100000 + 1)
        this.tableData.push(this.form)
      }
      this.$emit("updataFun", this.tableData)
    },
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss">
.content-bg {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  .btn {
    margin-top: 20px;
    width: 180px;
  }
}
.el-form-item .el-form-item {
  margin-bottom: 10px !important;
}
</style>
