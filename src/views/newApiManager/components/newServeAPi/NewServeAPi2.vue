<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-01 03:39:15
 * @FilePath: /MaaS_Integration_Hub/src/views/apiManager/components/newServeAPi/NewServeAPi2.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-form
    ref="form"
    :model="sizeForm"
    label-width="110px"
    size="mini"
    label-position="left"
  >
    <el-form-item :label="$t('app_1029')">
      <el-switch v-model="sizeForm.isIp"> </el-switch>
    </el-form-item>

    <el-form-item :label="$t('app_1030')">
      <el-radio-group v-model="sizeForm.nameType" size="medium">
        <el-radio border :label="$t('app_1031')"></el-radio>
        <el-radio border :label="$t('app_1032')"></el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="基础流量控制">
      <el-switch v-model="sizeForm.isFlow"> </el-switch>
    </el-form-item>

    <el-form-item label="频率">
      <el-input-number
        v-model="sizeForm.frequency"
        :precision="0"
        :step="1"
        :max="100"
      ></el-input-number>
      &nbsp;&nbsp;{{ $t("app_1172") }}/{{ $t("app_1150") }}
    </el-form-item>

    <el-form-item size="large" style="margin-top: 50px">
      <el-button
        type="primary"
        v-if="this.updata && this.updata.id"
        @click="onSubmit"
        >{{ $t("app_1036") }}</el-button
      >
      <el-button type="primary" v-else @click="onSubmit">{{
        $t("app_1035")
      }}</el-button>
      <el-button @click="goBack">{{ $t("back") }}</el-button>
    </el-form-item>
  </el-form>
</template>
>

<script>
export default {
  data() {
    return {
      sizeForm: {
        frequency: 100,
        isFlow: true,
        nameType: "",
        isIp: true,
      },
    };
  },
  props: {
    updata: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    this.sizeForm = this.updata;
  },
  methods: {
    onSubmit() {
      if (!this.sizeForm.nameType) {
        this.$message.error("请先选择类型");
        return;
      }
      this.$emit("submitStep", this.sizeForm);
      console.log("submit!");
    },
    goBack() {
      this.$emit("goBack");
    },
  },
};
</script>
