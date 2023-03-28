<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-28 00:05:06
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
    <el-form-item label="参数定义">
      <img
        class="img-template"
        src="../../../../assets/home/template.jpg"
        alt=""
      />
    </el-form-item>

    <el-form-item size="large" style="margin-top: 50px">
      <el-button @click="goBack">上一步</el-button>
      <el-button type="primary" @click="onSubmit">完成</el-button>
    </el-form-item>
  </el-form>
</template>
>

<script>
export default {
  data() {
    return {
      sizeForm: {
        timeOut: 10,
        method: "",
        appName: "",
      },
    };
  },
  props: {
    updata: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {},
  methods: {
    onSubmit() {
      this.$emit("subMitComplte", 1);
      console.log("submi22t!");
    },

    goBack() {
      this.$emit("goBack");
    },
  },
};
</script>
<style>
.tips {
  font-size: 12px;
  color: #999;
}

.img-template {
  width: 500px;
}
</style>
