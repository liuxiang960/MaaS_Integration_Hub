<template>
  <div>
    <el-row :gutter="24">
      <template slot="extra">
        <el-button type="primary" size="small">{{ $t("app_1090") }}</el-button>
      </template>
      <el-col :span="22" :xs="24">
        <el-tabs v-model="activeTab">
          <el-tab-pane :label="$t('app_1089')" name="opt1">
            <el-card>
              <el-descriptions
                class="margin-top"
                :title="$t('app_1081')"
                :column="1"
                :size="size"
              >
                <el-descriptions-item :label="$t('app_1014')">{{
                  updata.name
                }}</el-descriptions-item>
                <el-descriptions-item :label="$t('app_1009')">{{
                  updata.path
                }}</el-descriptions-item>
                <el-descriptions-item :label="$t('app_1015')">{{
                  updata.method
                }}</el-descriptions-item>

                <el-descriptions-item :label="$t('app_1086')">{{
                  updata.description
                }}</el-descriptions-item>
              </el-descriptions>

              <div
                style="
                  display: flex;
                  justify-content: flex-start;
                  margin-top: 30px;
                "
              >
                <div style="color: #606266; width: 100px">{{$t('app_1087')}}:</div>
                <ParamsListVue
                  style="width: 100%"
                  :is-preview="true"
                  :updata="updata.paramsList"
                />
              </div>

              <el-descriptions
                class="margin-top"
                :title="$t('app_1082')"
                :column="1"
                :size="size"
                style="margin-top: 50px"
              >
                <el-descriptions-item :label="$t('app_1084')">{{
                  updata.appName
                }}</el-descriptions-item>
                <el-descriptions-item :label="$t('app_1085')">{{
                  updata.methodApi
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
              </el-descriptions>
            </el-card>
          </el-tab-pane>

          <el-tab-pane :label="$t('app_1088')" name="opt2">
            <el-card>
              <Config :updata="updata" />
            </el-card>
          </el-tab-pane>
        </el-tabs>

        
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ParamsListVue from "../newApi/ParamsList.vue";
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
