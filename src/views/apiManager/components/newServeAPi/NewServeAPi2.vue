<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-27 18:09:47
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
    <el-form-item label="IP访问限制">
      <el-switch v-model="sizeForm.isIp"> </el-switch>
    </el-form-item>

    <el-form-item label="类型">
      <el-radio-group v-model="sizeForm.nameType" size="medium">
        <el-radio border label="黑名单"></el-radio>
        <el-radio border label="白名单"></el-radio>
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
      &nbsp;&nbsp;次/秒
    </el-form-item>

    <el-form-item size="large" style="margin-top: 50px">
      <el-button
        type="primary"
        v-if="this.updata && this.updata.id"
        @click="onSubmit"
        >修改</el-button
      >
      <el-button type="primary" v-else @click="onSubmit">立即创建</el-button>
      <el-button @click="goBack">返回</el-button>
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
