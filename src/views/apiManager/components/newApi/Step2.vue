<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-28 01:52:47
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
    <el-form-item :label="$t('appName')">
      <el-select v-model="sizeForm.appName">
        <el-option
          v-for="items in applicationList"
          :label="items.name"
          :value="items.name"
          :key="items.id"
          >{{ items.name }}</el-option
        >
      </el-select>

      <div class="tips">请选择由HTTP Listener 触发的处于“运行中”的集成流</div>
    </el-form-item>

    <el-form-item label="请求方法">
      <el-select v-model="sizeForm.method">
        <el-option label="GET" value="GET"></el-option>
        <el-option label="POST" value="GET"></el-option>
        <el-option label="PATCH" value="PATCH"></el-option>
        <el-option label="PUT" value="PUT"></el-option>
        <el-option label="DELETE" value="DELETE"></el-option>
        <el-option label="HEAD" value="HEAD"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="后台超时时间">
      <el-input-number
        v-model="sizeForm.timeOut"
        :precision="0"
        :step="1"
        :max="1000"
        type="number"
        >{{ sizeForm.timeOut }}</el-input-number
      >
      &nbsp;&nbsp;秒
    </el-form-item>

    <el-form-item label="参数定义">
      <label>无需配置</label>
    </el-form-item>

    <el-form-item size="large" style="margin-top: 50px">
      <el-button @click="goBack">返回</el-button>

      <el-button type="primary" @click="onNext">下一步</el-button>
      <!-- <el-button type="primary" @click="onSubmit">完成</el-button> -->
    </el-form-item>
  </el-form>
</template>
>

<script>
import jsCookie from "js-cookie";
export default {
  data() {
    return {
      sizeForm: {
        timeOut: 10,
        method: "GET",
        appName: "",
      },
      applicationList: [],
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
      this.sizeForm = this.updata;
    }

    if (jsCookie.get("application")) {
      this.applicationList = JSON.parse(jsCookie.get("application"));
    }
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
    onNext() {
      this.$emit("goNext", this.sizeForm);
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
</style>
