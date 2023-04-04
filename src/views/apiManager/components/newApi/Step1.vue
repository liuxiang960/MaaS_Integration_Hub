<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-31 21:52:56
 * @FilePath: /MaaS_Integration_Hub/src/views/apiManager/components/newServeAPi/NewServeAPi1.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item :label="$t('app_1014')">
      <el-input
        maxlength="10"
        v-model="form.name"
        :placeholder="$t('tost_1009')"
      ></el-input>
    </el-form-item>

    <el-form-item :label="$t('app_1015')">
      <el-select v-model="form.method">
        <el-option label="GET" value="GET"></el-option>
        <el-option label="POST" value="POST"></el-option>
        <el-option label="PATCH" value="PATCH"></el-option>
        <el-option label="PUT" value="PUT"></el-option>
        <el-option label="DELETE" value="DELETE"></el-option>
        <el-option label="HEAD" value="HEAD"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('app_1009')">
      <el-input v-model="form.path" :placeholder="$t('app_1010')"></el-input>
      <div class="tips">{{ $t("app_1011") }}/：param</div>
    </el-form-item>
    <el-form-item :label="$t('description')">
      <el-input
        :placeholder="$t('tost_1008')"
        type="textarea"
        :maxlength="500"
        :autosize="{ minRows: 5, maxRows: 5 }"
        v-model="form.description"
      ></el-input>
    </el-form-item>

    <el-form-item :label="$t('app_1012')">
      <params-list @updataFun="paramsUpdata" :updata="paramsList" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{
        $t("app_1022")
      }}</el-button>
      <el-button @click="goBack">{{ $t("cancel") }}</el-button>
    </el-form-item>
  </el-form>
</template>
>
<script>
import ParamsList from "./ParamsList";
export default {
  components: {
    ParamsList,
  },
  data() {
    return {
      form: {
        name: "",
        method: "GET",
        description: "",
        paramsList: [],
        isIp: true,
        paramsList: [],
        path: "/",
      },
    };
  },
  props: {
    updata: {
      type: Object,
      default: () => ({}),
    },
  },
  created() {
    if (this.updata) {
      this.form = this.updata;
      this.paramsList = this.updata.paramsList;
    }
  },
  mounted() {},
  methods: {
    goBack() {
      this.$router.back();
    },
    paramsUpdata(list) {
      this.form.paramsList = list || [];
    },
    onSubmit() {
      if (!this.form.name) {
        this.$message.error(this.$t("tost_1009"));
        return;
      }
      if (!this.form.description) {
        this.$message.error(this.$t("tost_1010"));
        return;
      }
      if (!this.form.path) {
        this.$message.error(this.$t("app_1010"));
        return;
      }
      if (!this.form.paramsList) {
        this.$message.error(this.$t("tost_1011"));
        return;
      }
      this.$emit("submitStep", this.form);
      console.log("submit!");
    },
  },
};
</script>
<style>
.tips {
  font-size: 12px;
  color: #999;
}
</style>
