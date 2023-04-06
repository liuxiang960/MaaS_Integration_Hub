<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-04 18:24:08
 * @FilePath: /MaaS_Integration_Hub/src/views/dashboard/admin/components/HeaderView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-row class="header-content-bg">
      <el-col :xs="24" :sm="24" :lg="24" class="card-panel-col">
        <el-filter
          :data="filterInfo.data"
          :field-list="filterInfo.fieldList"
          :list-type-info="listTypeInfo"
          :fold-btn-hidden="false"
          @handleFilter="handleFilter"
          @handleReset="handleReset"
          @handleEvent="handleEvent"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="header-item-bg">
          <div class="input-bg" style="margin-top: 20px">
            <div class="input-label">{{ $t("app_1159") }}：</div>

            <div class="point-bg">
              <div class="point green-color" />
              <div class="point-label">{{ $t("app_1114") }}</div>
            </div>

            <div class="point-bg">
              <div class="point red-color" />
              <div class="point-label">{{ $t("app_1115") }}</div>
            </div>

            <div class="point-bg">
              <div class="point yellow-color" />
              <div class="point-label">{{ $t("app_1125") }}</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getDays } from "@/utils/index";
export default {
  data() {
    return {
      appName: "",
      inputApi: "",
      valueDate: [new Date(), new Date(2000, 10, 11, 10, 10)],
      filterInfo: {
        // 搜索字段
        data: {
          name: null,
          age: null,
          count: 1,
          sex: 1,
          date: null,
          dateTime: null,
          range: null,
          appName: "",
        },
        // 条件配置项
        fieldList: [
          { label: this.$t("appName"), type: "input", value: "appName" },
          { label: this.$t("app_1068"), type: "date", value: "name" },
        ],
      },
      listTypeInfo: {},
    };
  },
  mounted() {
    const day = getDays(30)[0];
    this.valueDate = [new Date(), new Date(day)];
  },
  methods: {
    /** 搜索 */
    handleFilter(row) {
      console.log(row);
    },
    /** 重置 */
    handleReset(row) {
      console.log(row);
    },
    /** 焦点失去事件 */
    handleEvent(row) {
      console.log(row);
    },
  },
};
</script>
<style lang="scss">
@import "./index.scss";
</style>
