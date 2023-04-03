<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-02 06:30:32
 * @FilePath: /MaaS_Integration_Hub/src/views/apiManager/components/newServeAPi/NewServeAPi1.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-form
    ref="form"
    :model="form"
    size="mini"
    label-width="120px"
    label-position="left"
  >
    <el-form-item :label="$t('app_1173')">
      <el-input v-model="form.name" :placeholder="$t('plaseInput')"></el-input>
    </el-form-item>

    <el-form-item :label="$t('description')">
      <el-input
        type="textarea"
        :maxlength="500"
        :autosize="{ minRows: 5, maxRows: 5 }"
        v-model="form.description"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{
        $t("app_1022")
      }}</el-button>
      <el-button @click="goBack">{{ $t("cancel") }}</el-button>
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
    goBack() {
      this.$router.back();
    },
    onSubmit() {
      if (!this.form.name) {
        this.$message.error(this.$t("app_1174"));
        return;
      }
      if (!this.form.description) {
        this.$message.error(this.$t("tost_1008"));
        return;
      }
      this.$emit("submitStep", this.form);
      console.log("submit!");
    },
  },
};
</script>
