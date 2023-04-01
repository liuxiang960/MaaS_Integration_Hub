<template>
  <div>
    <el-row :gutter="24">
      <template slot="extra">
        <el-button type="primary" size="small">{{ $t("app_1090") }}</el-button>
      </template>

      <el-col :span="22" :xs="24">
        <el-descriptions
          class="margin-top"
          title="API访问日志"
          :column="3"
          :size="size"
        >
          <el-descriptions-item :label="$t('app_1060')">{{
            updata.date
          }}</el-descriptions-item>
          <el-descriptions-item :label="$t('app_1061')">{{
            updata.ip
          }}</el-descriptions-item>
          <el-descriptions-item label="API服务">{{
            updata.apiServerName
          }}</el-descriptions-item>
          <el-descriptions-item :label="$t('app_1014')">{{
            updata.apiName
          }}</el-descriptions-item>
          <el-descriptions-item :label="$t('app_1009')">{{
            updata.path
          }}</el-descriptions-item>
          <el-descriptions-item :label="$t('app_1015')">{{
            updata.method
          }}</el-descriptions-item>
          <el-descriptions-item :label="$t('app_1063')">{{
            updata.responseStatus
          }}</el-descriptions-item>
          <el-descriptions-item label="响应时间">{{
            updata.responseDate
          }}</el-descriptions-item>
        </el-descriptions>

        <el-descriptions class="margin-top" title="" :column="1" :size="size">
          <el-descriptions-item :label="$t('app_1064')">{{
            updata.requestContent
          }}</el-descriptions-item>
        </el-descriptions>

        <el-descriptions class="margin-top" title="" :column="1" :size="size">
          <el-descriptions-item :label="$t('app_1065')">{{
            updata.responseContent
          }}</el-descriptions-item>
        </el-descriptions>

        <el-descriptions
          class="margin-top"
          :title="$t('app_1082')"
          :column="3"
          :size="size"
          style="margin-top: 50px"
        >
          <el-descriptions-item label="建连时间">{{
            updata.connectionDate
          }}</el-descriptions-item>
          <el-descriptions-item :label="$t('appName')">{{
            updata.appName
          }}</el-descriptions-item>
          <el-descriptions-item :label="$t('app_1017')">{{
            updata.apiPath
          }}</el-descriptions-item>
          <el-descriptions-item :label="$t('app_1019')">{{
            updata.authentication
          }}</el-descriptions-item>
          <el-descriptions-item :label="$t('app_1020')">{{
            updata.contentType
          }}</el-descriptions-item>
          <el-descriptions-item label="协议类型">{{
            updata.apiRegion
          }}</el-descriptions-item>
          <el-descriptions-item :label="$t('app_1063')">{{
            updata.responseStatus
          }}</el-descriptions-item>
          <el-descriptions-item label="响应时间">{{
            updata.apiResponseDate
          }}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions>
          <el-descriptions-item :label="$t('app_1064')">{{
            updata.apiRequestContent
          }}</el-descriptions-item>
        </el-descriptions>

        <el-descriptions>
          <el-descriptions-item :label="$t('app_1065')">{{
            updata.apiResponseContent
          }}</el-descriptions-item>
        </el-descriptions>
      </el-col>

      <el-col :span="15" :xs="24">
        <el-button
          style="margin-left: 50%; width: 200px"
          type="primary"
          @click="goBack"
          >返 回</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ParamsListVue from "./ParamsList.vue";
import Config from "./Config.vue";

export default {
  data() {
    return {
      size: "",
      activeTab: "opt1",
    };
  },
  components: {
    ParamsListVue,
    Config,
  },
  props: {
    updata: {
      type: Object,
      default: () => ({
        name: "",
        method: "GET",
        description: "",
        paramsList: [],
        isIp: true,
        path: "",

        timeOut: 10,
        methodApi: "GET",
        appName: "",
        contentType: "application/json",
        authentication: "NoAuth",
        apiPath: "",
      }),
    },
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>
<style>
.el-descriptions :not(.is-bordered) th,
.el-descriptions :not(.is-bordered) td {
  padding-bottom: 20px;
}

.el-descriptions-item__label:not(.is-bordered-label) {
  margin-right: 20px;
}
</style>
