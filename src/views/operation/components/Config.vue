<template>
  <div>
    <el-row :gutter="24">
      <template slot="extra">
        <el-button type="primary" size="small">{{ $t("app_1090") }}</el-button>
      </template>
      <el-col :span="22" :xs="24">
        <el-card>
          <el-descriptions
            class="margin-top"
            :title="$t('app_1051')"
            :column="1"
            :size="size"
          >
            <el-descriptions-item :label="$t('app_1052')">{{
              updata.domain
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('app_1009')">{{
              updata.path
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('app_1015')">{{
              updata.method
            }}</el-descriptions-item>
          </el-descriptions>

          <div class="params_content">
            <div>
              <el-radio-group v-model="radio">
                <el-radio :label="1">Header</el-radio>
                <el-radio :label="2">Body</el-radio>
                <el-radio :label="3">Query</el-radio>
              </el-radio-group>
            </div>

            <div class="params_bg" v-for="item in paramsGrop" :key="item.name">
              <template v-if="nameEqId(item.keyName, radio)">
                <div
                  class="params_item"
                  v-for="itemY in item.list"
                  :key="itemY.id"
                >
                  <div class="params_item_p">{{ itemY.name }}</div>
                  <el-input
                    v-if="itemY.type == 'int'"
                    style="display: inline-block; width: 200px"
                    v-model="itemY.default"
                    :placeholder="$t('plaseInput')"
                    :type="itemY.type == 'int' ? 'number' : 'text'"
                    οnkeyup="this.value=this.value.replace(/\D/g,‘’)"
                  ></el-input>
                  <el-input
                    v-else
                    style="display: inline-block; width: 200px"
                    v-model="itemY.default"
                    :placeholder="$t('plaseInput')"
                  ></el-input>
                </div>
              </template>
              <div v-else>
                <div class="el-table__empty-block">
                  <span class="el-table__empty-text">{{ $t("app_1053") }}</span>
                </div>
              </div>
            </div>
          </div>

          <el-button
            style="margin-top: 20px"
            type="primary"
            size="small"
            @click="sendRequst"
            :loading="loading"
            >{{ $t("app_1054") }}</el-button
          >
          <div class="params_bg">
            <div>
              <div
                class="params_item_p"
                style="
                  text-align: left;
                  margin-top: 20px;
                  font-size: 16px;
                  font-weight: bold;
                  color: #303133;
                "
              >
                {{ $t("app_1055") }}
              </div>
            </div>
          </div>
          <div class="error_bg" v-if="isShow">
            <div class="error_item_bg">
              <div class="error_item_title">Response Headers:</div>
              <div class="error_item_p">stuats:200</div>
              <div class="error_item_p">
                X-lpaas-Api-Traceid:"8b4385a4-5f5a 4eb5-9a3f-eb63cc360bb8
              </div>

              <div class="error_item_p">Date: "Fri 04 Nov 2023 11:45:35</div>

              <div class="error_item_p">Content-Type: "application/json"</div>
              <div class="error_item_p">Connection: "keep-alive"</div>
              <div class="error_item_p">Server: "nginx/1.19.10"</div>
              <div class="error_item_p">X-Mock-Bv:"APISIX/2.14.1"</div>
            </div>

            <div class="error_item">
              <div class="error_item_title">Response Body:</div>
              <div class="error_item_p">
                Access-Control-Allow-Credentials: true
              </div>

              <div class="error_item_p">Connection: keep-alive</div>

              <div class="error_item_p">
                ontent-Security-Policy: default-src ;script-src
                'self';frame-ancestors 'self'
              </div>
              <div class="error_item_p">
                Content-Type: application/json;charset=UTF-8
              </div>
              <div class="error_item_p">Server: "nginx/1.19.10"</div>
              <div class="error_item_p">X-Mock-Bv:"APISIX/2.14.1"</div>
              <div class="error_item_p">Server: nginx</div>
              <div class="error_item_p">
                Strict-Transport-Security: max-age=63072000; includeSubdomains;
                preload
              </div>

              <div class="error_item_p">X-Content-Type-Options: nosniff</div>
              <div class="error_item_p">X-XSS-Protection: 1; mode=block</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Axios from "axios";
import ParamsListVue from "./ParamsList.vue";
import Config from "./Config.vue";
import { groupByList } from "@/utils/index";
export default {
  data() {
    return {
      size: "",
      activeTab: "opt1",
      response: {},
      radio: 1,
      paramsGrop: [],
      activeNames: ["1"],
      isShow: false,
      loading: false,
    };
  },
  components: {
    ParamsListVue,
    Config,
  },
  watch: {
    updata(newV, oldV) {
      let list = newV.paramsList;
      console.log(list);
      this.paramsGrop = groupByList(newV.paramsList, "addr");
    },
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
        path: "/",

        timeOut: 10,
        methodApi: "GET",
        appName: "",
        contentType: "application/json",
        authentication: "NoAuth",
        apiPath: "/",
      }),
    },
  },
  methods: {
    handleEdit(e) {
      return e.replace(/[^d.]/g, ""); // 只能输入数字和.
    },
    nameEqId(name, id) {
      if (name == "Header" && id == 1) {
        return true;
      } else if (name == "Body" && id == 2) {
        return true;
      }
      if (name == "Query" && id == 3) {
        return true;
      }

      return false;
    },
    sendRequst() {
      this.isShow = false;
      let that = this;
      that.loading = true;

      setTimeout(function () {
        that.isShow = true;
        that.loading = false;
        that.$message.success("请求发送成功");
      }, 1000);
    },
    handleChange() {},
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
.params_content {
  background-color: #eee;
  padding: 20px;
  border-radius: 10px;
}

.params_bg {
  padding-top: 20px;
  padding-bottom: 20px;
}
.params_item {
  margin-top: 15px;
}

.params_bg input {
  width: 250px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
}

.params_item_p {
  color: rgb(96, 98, 102);
  margin-right: 20px;
  display: inline-block;
  min-width: 90px;
  text-align: right;
}
.error_bg {
  background-color: #eee;
  padding: 20px;
  border-radius: 10px;
  padding: 20px 20px;
  height: 700px;
}
.error_item_bg {
  margin-top: 15px;
}
.error_item_title {
  line-height: 40px;
  height: 40px;
  font-size: 14px;
  font-weight: 500;
}
.error_item_p {
  color: rgb(96, 98, 102);
  margin-right: 20px;
  min-width: 90px;
  line-height: 30px;
  padding-left: 15px;
  height: 30px;
}
</style>
