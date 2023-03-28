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
      <el-table-column prop="name" label="参数名"> </el-table-column>
      <el-table-column prop="addr" label="位置"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column prop="default" label="默认值"> </el-table-column>
      <el-table-column prop="need" label="必填"> </el-table-column>
      <el-table-column prop="description" :label="$t('description')">
      </el-table-column>
      <el-table-column :label="$t('operation')" width="110">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)"
            >查看</el-button
          >

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
      >添加一条( {{ tableData.length }}/{{ maxNum }} )</el-button
    >

    <div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="参数名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="位置">
            <el-select v-model="form.addr" placeholder="请选择位置">
              <el-option label="Header" value="Header"></el-option>
              <el-option label="Body" value="Body"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="参数类型">
            <el-select v-model="form.type" placeholder="参数类型">
              <el-option label="string" value="string"></el-option>
              <el-option label="int" value="int"></el-option>
              <el-option label="float" value="float"></el-option>
              <el-option label="char" value="char"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="默认值">
            <el-input
              v-model="form.default"
              :type="form.type == 'int' ? 'number' : 'text'"
            ></el-input>
          </el-form-item>

          <el-form-item label="设为必填">
            <el-radio-group v-model="form.need">
              <el-radio label="是">必填</el-radio>
              <el-radio label="否">非必填</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('description')">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item style="margin-top: 50px">
            <el-button type="primary" @click="onSubmit"> 确定</el-button>
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
        addr: "Heard",
        type: "string",
        default: "",
        need: "是",
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
        addr: "Heard",
        type: "string",
        default: "",
        need: "是",
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
      if (!this.form.name) {
        this.$message.error("请输入参数名称");
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
