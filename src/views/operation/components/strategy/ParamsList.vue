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
      <el-table-column prop="name" :label="$t('app_1097')"> </el-table-column>
      <el-table-column prop="period" :label="$t('app_1096')"> </el-table-column>
      <el-table-column prop="condition" :label="$t('app_1098')">
      </el-table-column>
      <el-table-column prop="params" :label="$t('app_1087')"> </el-table-column>
      <el-table-column :label="$t('operation')" width="110" v-if="!isPreview">
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
      >{{ $t("addRecord") }}( {{ tableData.length }}/{{ maxNum }} )</el-button
    >
    <div>
      <el-dialog
        :title="this.$t('tost_1002')"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form ref="form" :model="form" label-width="180px">
          <el-form-item :label="$t('app_1097')">
            <el-select v-model="form.name" :placeholder="$t('app_1131')">
              <el-option
                :label="$t('app_1133')"
                :value="$t('app_1133')"
              ></el-option>
              <el-option
                :label="$t('app_1134')"
                :value="$t('app_1134')"
              ></el-option>
              <el-option
                :label="$t('app_1135')"
                :value="$t('app_1135')"
              ></el-option>
              <el-option
                :label="$t('app_1136')"
                :value="$t('app_1136')"
              ></el-option>
              <el-option
                :label="$t('app_1137')"
                :value="$t('app_1137')"
              ></el-option>
              <el-option
                :label="$t('app_1138')"
                :value="$t('app_1138')"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('app_1096')">
            <el-select v-model="form.period" :placeholder="$t('app_1139')">
              <el-option
                :label="$t('app_1140')"
                :value="$t('app_1140')"
              ></el-option>
              <el-option
                :label="$t('app_1141')"
                :value="$t('app_1141')"
              ></el-option>
              <el-option
                :label="$t('app_1142')"
                :value="$t('app_1142')"
              ></el-option>
              <el-option
                :label="$t('app_1143')"
                :value="$t('app_1143')"
              ></el-option>
              <el-option
                :label="$t('app_1144')"
                :value="$t('app_1144')"
              ></el-option>
              <el-option
                :label="$t('app_1145')"
                :value="$t('app_1145')"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('app_1098')">
            <el-select v-model="form.condition" :placeholder="$t('app_1146')">
              <el-option label=">" value=">"></el-option>
              <el-option label="<" value="<"></el-option>
              <el-option label="≥" value="≥"></el-option>
              <el-option label="≤" value="≤"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('app_1087')">
            <el-input-number
              v-model="form.params"
              :min="1"
              :max="10"
              οnkeyup="this.value=this.value.replace(/\D/g,‘’)"
              >{{ form.params }}</el-input-number
            >
            &nbsp;&nbsp; {{ $t("app_1149") }}/{{ $t("app_1150") }}
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
        period: this.$t("app_1132"),
        condition: ">",
        params: "1",
      },
      dialogVisible: false,
    };
  },
  props: {
    updata: {
      type: Array,
      default: () => [],
    },
    isPreview: {
      type: Boolean,
      default: () => false,
    },
  },
  watch: {
    updata(newV, oldV) {
      this.tableData = this.updata;
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
        period: this.$t("app_1132"),
        condition: ">",
        params: "1",
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
        this.$message.error(this.$t("app_1131"));
        return;
      }

      if (!this.form.period) {
        this.$message.error(this.$t("app_1139"));
        return;
      }

      if (!this.form.condition) {
        this.$message.error(this.$t("app_1147"));
        return;
      }

      if (!this.form.params) {
        this.$message.error(this.$t("app_1148"));
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
