<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-04 17:28:58
 * @FilePath: /MaaS_Integration_Hub/src/views/apiManager/components/newServeAPi/NewServeAPi1.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-form ref="form" :model="form" label-width="160px">
    <el-form-item :label="$t('appName')">
      <el-input v-model="form.name" :placeholder="$t('app_1001')" />
    </el-form-item>
    <el-form-item :label="$t('app_1002')">
      <el-radio-group v-model="form.serveType" size="medium">
        <el-radio border label="MOCK" />
        <el-radio border :label="$t('app_1156')" />
        <el-radio border :label="$t('app_1157')" />
        <el-radio border :label="$t('app_1158')" />
      </el-radio-group>
    </el-form-item>

    <el-form-item label="SecretId">
      <el-input v-model="form.SecretId" placeholder="SecretId" />
    </el-form-item>
    <el-form-item label="SecretKey">
      <el-input v-model="form.SecretKey" placeholder="SecretKey" />
    </el-form-item>

    <!-- <el-form-item label="健康检查接口">
      <el-input v-model="form.path" :placeholder="$t('app_1010')"></el-input>
      <div class="tips">
        {{$t('app_1011')}}/：param
      </div>
    </el-form-item> -->

    <el-form-item :label="$t('description')">
      <el-input
        v-model="form.description"
        type="textarea"
        :maxlength="500"
        :autosize="{ minRows: 5, maxRows: 5 }"
      />
    </el-form-item>

    <el-form-item :label="$t('app_1003')">
      <params-list :updata="paramsList" @updataFun="paramsUpdata" />
    </el-form-item>

    <!-- <el-form-item :label="$t('app_1029')">
      <el-switch v-model="form.isIp"> </el-switch>
    </el-form-item> -->

    <el-form-item>
      <el-button @click="goBack">{{ $t("cancel") }}</el-button>

      <el-button type="primary" @click="onSubmit">{{ $t("sure") }}</el-button>
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
  props: {
    updata: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {
        name: "",
        method: "GET",
        region: "HTTP",
        description: "",
        serveType: this.$t("app_1158"),
        authentication: "NoAuth",
        path: "/",
        paramsList: [],
        isIp: false,
        paramsList: [],
      },
    };
  },
  created() {
    debugger;
    if (this.updata && this.updata.name) {
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
        this.$message.error(this.$t("app_1001"));
        return;
      }
      if (!this.form.description) {
        this.$message.error(this.$t("tost_1003"));
        return;
      }

      if (!this.form.paramsList) {
        this.$message.error(this.$t("tost_1004"));
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
