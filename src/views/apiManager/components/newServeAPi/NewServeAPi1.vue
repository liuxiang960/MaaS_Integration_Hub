<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-27 18:09:41
 * @FilePath: /MaaS_Integration_Hub/src/views/apiManager/components/newServeAPi/NewServeAPi1.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="服务名称">
      <el-input v-model="form.name" placeholder="请输入API服务名称"></el-input>
    </el-form-item>

    <el-form-item label="协议">
      <el-select v-model="form.region">
        <el-option label="HTTP" value="HTTP"></el-option>
        <el-option label="HTTPS" value="HTTPS"></el-option>
        <el-option label="HTTPS&HTTP" value="HTTPS&HTTP"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item :label="$t('description')">
      <el-input type="textarea" v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">下一步</el-button>
    </el-form-item>
  </el-form>
</template>
>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "HTTP",
        description: "",
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
    if (this.updata) {
      this.form = this.updata;
    }
  },
  methods: {
    onSubmit() {
      if (!this.form.name) {
        this.$message.error("请输入服务名称");
        return;
      }
      if (!this.form.description) {
        this.$message.error("请输入服务描述信息");
        return;
      }
      this.$emit("submitStep", this.form);
      console.log("submit!");
    },
  },
};
</script>
