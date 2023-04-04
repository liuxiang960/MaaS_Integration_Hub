<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-04 13:49:22
 * @FilePath: /MaaS_Integration_Hub/src/views/dashboard/admin/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="dashboard-editor-container">
    <header-view></header-view>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <div class="unfold-view" @click="didClick(DataHealth)">
            <div class="unfold"></div>
          </div>
          <div class="common-p">{{ $t("app_1108") }}</div>

          <line-chart :chart-data="DataHealth" />
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <div class="unfold-view" @click="didClick(DataNetwork)">
            <div class="unfold"></div>
          </div>
          <div class="common-p">{{ $t("app_1109") }}</div>

          <line-chart :chart-data="DataNetwork" />
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <div class="unfold-view" @click="didClick(DataRequestNum)">
            <div class="unfold"></div>
          </div>
          <div class="common-p">{{ $t("app_1110") }}</div>

          <line-chart :chart-data="DataRequestNum" />
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <div class="unfold-view" @click="didClick(DataconCurrence)">
            <div class="unfold"></div>
          </div>
          <div class="common-p">{{ $t("app_1111") }}</div>

          <line-chart :chart-data="DataconCurrence" />
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <div class="unfold-view" @click="didClick(ResponseStauts)">
            <div class="unfold"></div>
          </div>
          <div class="common-p">{{ $t("app_1112") }}</div>

          <line-chart :chart-data="ResponseStauts" />
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <div class="unfold-view" @click="didClick(ResponseTime)">
            <div class="unfold"></div>
          </div>
          <div class="common-p">{{ $t("app_1113") }}</div>

          <line-chart :chart-data="ResponseTime" />
        </div>
      </el-col>
    </el-row>

    <el-dialog
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <div class="chart-wrapper">
        <line-chart :chart-data="alertData" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import HeaderView from "./admin/components/HeaderView.vue";
import LineChart from "./admin/components/LineChart";
import { getChartData as DataHealth } from "./admin/components/data/health";
import { getChartData as DataNetwork } from "./admin/components/data/network";
import { getChartData as DataRequestNum } from "./admin/components/data/requestNum";
import { getChartData as DataconCurrence } from "./admin/components/data/concurrence";
import { getChartData as ResponseStauts } from "./admin/components/data/responseStauts";
import { getChartData as ResponseTime } from "./admin/components/data/responseTime";

export default {
  name: "chart",
  components: {
    HeaderView,
    LineChart,
  },
  data() {
    return {
      DataHealth: [],
      DataNetwork: [],

      DataRequestNum: [],

      DataconCurrence: [],

      ResponseStauts: [],

      ResponseTime: [],

      alertData: [],
      dialogVisible: false,
    };
  },
  created() {
    this.DataHealth = DataHealth();
    this.DataNetwork = DataNetwork();
    this.DataRequestNum = DataRequestNum();
    this.DataconCurrence = DataconCurrence();

    this.ResponseStauts = ResponseStauts();

    this.ResponseTime = ResponseTime();
  },
  methods: {
    didClick(data) {
      // alertData
      this.alertData = data;
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 20px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
    position: relative;
  }

  .unfold-view {
    position: absolute;
    right: 15px;
    top: 15px;
    .unfold {
      width: 25px;
      height: 25px;
      background: url("../../assets/common/open.png") 0/100% no-repeat;
    }
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
