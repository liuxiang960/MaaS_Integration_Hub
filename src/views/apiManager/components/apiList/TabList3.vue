<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-28 04:55:19
 * @FilePath: /MaaS_Integration_Hub/src/views/apiManager/components/apiList/TabList3.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-select v-model="optionValue" placeholder="请选择">
        <el-option
          style="padding-top: 0px; padding-bottom: 0px"
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <el-row>
      <el-col :span="10">
        <json-editor style="height: 400px" ref="jsonEditor" v-model="value" />
      </el-col>

      <el-col :span="10" style="margin-left: 20px">
        <div>
          <el-form
            ref="apiServeMap"
            :model="apiServeMap.select"
            label-width="100px"
          >
            <el-form-item label="api服务名">
              <div>{{ apiServeMap.name }}</div>
            </el-form-item>
            <el-form-item label="服务域名">
              <div>{{ apiServeMap.domain }}</div>
            </el-form-item>

            <el-form-item label="API">
              <el-select v-model="apiServeMap.regionName">
                <el-option
                  v-for="item in tableData"
                  :label="item.name + ' ' + item.method"
                  :key="item.method"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import JsonEditor from "@/components/JsonEditor";
const jsonData =
  '[{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"CORN"}],"name":""},{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"XAGUSD"},{"market_type":"forexdata","symbol":"AUTD"},{"market_type":"forexdata","symbol":"AGTD"}],"name":"贵金属"},{"items":[{"market_type":"forexdata","symbol":"CORN"},{"market_type":"forexdata","symbol":"WHEAT"},{"market_type":"forexdata","symbol":"SOYBEAN"},{"market_type":"forexdata","symbol":"SUGAR"}],"name":"农产品"},{"items":[{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"USOIL"},{"market_type":"forexdata","symbol":"NGAS"}],"name":"能源化工"}]';

import { apiServeList } from "@/api/apiManager";
import {
  apiCertificateList,
  apiCertificateNew,
  apiCertificateDeletd,
} from "@/api/apiManager";
export default {
  name: "Index",
  components: { JsonEditor },
  data() {
    return {
      value: JSON.parse(jsonData),
      loading: false,
      apiServeMap: {},
      options: [
        {
          value: "JSON",
          label: "JSON",
        },
        {
          value: "String",
          label: "String",
        },
      ],

      optionValue: "JSON",
      tableData: [],
      total: 0,
    };
  },
  props: {
    updata: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    if (this.updata) {
      this.apiServeMap = this.updata;
    }
    this.initPage();
  },
  methods: {
    initPage() {
      this.loading = true;

      apiServeList({
        pageNum: 1,
        pageSize: 10,
        apiServeMap: this.updata,
      })
        .then((list) => {
          this.loading = false;
          this.tableData = list;
          this.total = list.length;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
