<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-01 01:49:22
 * @FilePath: /MaaS_Integration_Hub/src/views/apiManager/components/newServeAPi/NewServeAPi1.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item :label="$t('app_1014')">
      <el-input v-model="form.name" :placeholder="$t('tost_1009')"></el-input>
    </el-form-item>
    <el-form-item :label="$t('app_1171')">
      <el-select v-model="form.app" :placeholder="$t('app_1128')">
        <el-option
          v-for="itemData in appDataList"
          :key="itemData.name"
          :label="itemData.name"
          :value="itemData.name"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item :label="$t('description')">
      <el-input type="textarea" v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item :label="$t('app_1009')">
      <el-input v-model="form.path" :placeholder="$t('app_1010')"></el-input>
      <div class="tips">{{ $t("app_1011") }}/：param</div>
    </el-form-item>
    <el-form-item :label="$t('app_1015')">
      <el-select v-model="form.method">
        <el-option label="GET" value="GET"></el-option>
        <el-option label="POST" value="GET"></el-option>
        <el-option label="PATCH" value="PATCH"></el-option>
        <el-option label="PUT" value="PUT"></el-option>
        <el-option label="DELETE" value="DELETE"></el-option>
        <el-option label="HEAD" value="HEAD"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item :label="$t('app_1019')">
      <el-select v-model="form.authentication">
        <el-option label="NoAuth" value="NoAuth"></el-option>
        <el-option label="BasicAuth" value="BasicAuth"></el-option>
        <el-option label="OAuth2.0" value="OAuth2.0"></el-option>
        <el-option label="HMAC-1" value="HMAC-1"></el-option>
        <el-option label="HMAC-256" value="HMAC-256"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item :label="$t('app_1012')">
      <params-list @updataFun="paramsUpdata" :updata="paramsList" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{
        $t("app_1035")
      }}</el-button>
    </el-form-item>
  </el-form>
</template>
>
<script>
import ParamsList from "./ParamsList";
import { appList } from "@/api/app";

export default {
  components: {
    ParamsList,
  },
  data() {
    return {
      form: {
        name: "",
        method: "GET",
        region: "HTTP",
        description: "",
        serveType: this.$t("app_1039"),
        authentication: "NoAuth",
        path: "/",
        paramsList: [],
        isIp: false,
        paramsList: [],
        app: "",
      },
      appDataList: [],
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
  mounted() {
    this.getAppList();
  },
  methods: {
    paramsUpdata(list) {
      this.form.paramsList = list || [];
    },
    getAppList() {
      this.loading = true;

      appList({})
        .then((list) => {
          this.loading = false;
          this.appDataList = list;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    onSubmit() {
      if (!this.form.name) {
        this.$message.error(this.$t("app_1170"));
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
      if (!this.form.app) {
        this.$message.error("请选择应用");
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
