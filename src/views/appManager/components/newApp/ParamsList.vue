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
      <el-table-column prop="ip" label="ip"> </el-table-column>
      <el-table-column prop="port" :label="$t('port')"> </el-table-column>
      <el-table-column prop="weight" :label="$t('weight')"> </el-table-column>

      <el-table-column :label="$t('operation')" width="110">
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
      class="btn"
      type="primary"
      icon="el-icon-plus"
      size="small"
      @click="newAdd"
      >{{ $t("addRecord") }}( {{ tableData.length }}/{{ maxNum }} )</el-button
    >

    <div>
      <el-dialog
        :title="$t('tost_1002')"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form ref="form" :model="form" label-width="180px">
          <el-form-item label="ip">
            <el-input v-model="form.ip"></el-input>
          </el-form-item>
          <el-form-item :label="$t('port')">
            <el-input v-model="form.port"></el-input>
          </el-form-item>
          <el-form-item :label="$t('weight')">
            <el-input v-model="form.weight"></el-input>
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
import { removeListItem } from "../../../../utils/index";
export default {
  data() {
    return {
      maxNum: 30,
      tableData: [],
      form: {
        name: "",
        addr: "Header",
        type: "string",
        default: "",
        need: this.$t("need"),
        description: "",
      },
      dialogVisible: false,
    };
  },
  props: {
    updata: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    if (this.updata) {
      this.tableData = this.updata;
    }
  },
  methods: {
    newAdd() {
      let dict = {
        name: "",
        addr: "Header",
        type: "string",
        default: "",
        need: this.$t("need"),
        description: "",
      };
      this.form = dict;
      this.dialogVisible = true;
    },

    handleEdit(dict) {
      this.form = dict;
      this.dialogVisible = true;
    },
    handleDel(dict) {
      this.tableData = removeListItem(this.tableData, dict.id, null);
      this.$emit("updataFun", this.tableData);
    },
    onSubmit() {
      if (!this.form.ip) {
        this.$message.error(this.$t("tost_1005"));
        return;
      }
      if (!this.form.port) {
        this.$message.error(this.$t("tost_1006"));
        return;
      }

      this.dialogVisible = false;
      if (this.form.id) {
        this.tableData = removeListItem(
          this.tableData,
          this.form.id,
          this.form
        );
      } else {
        this.form.id = Math.floor(Math.random() * 100000 + 1);
        this.tableData.push(this.form);
      }
      this.$emit("updataFun", this.tableData);
    },
    handleClose() {
      this.dialogVisible = false;
    },
  },
};
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
