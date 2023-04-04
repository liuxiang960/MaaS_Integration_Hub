<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-31 22:11:04
 * @FilePath: /MaaS_Integration_Hub/src/views/apiManager/components/newServeAPi/NewServeAPi2.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-form
    ref="form"
    :model="sizeForm"
    label-width="120px"
    size="mini"
    label-position="left"
  >
    <el-form-item :label="$t('app_1029')">
      <el-switch v-model="sizeForm.isIp"> </el-switch>
    </el-form-item>

    <el-form-item :label="$t('app_1030')" v-if="sizeForm.isIp">
      <el-radio-group v-model="sizeForm.nameType" size="medium">
        <el-radio border :label="$t('app_1031')"></el-radio>
        <el-radio border :label="$t('app_1032')"></el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item :label="$t('app_1033')" v-if="sizeForm.isIp">
      <el-input
        type="textarea"
        :maxlength="500"
        :autosize="{ minRows: 5, maxRows: 5 }"
        v-model="sizeForm.ipdesc"
        :placeholder="$t('app_1034')"
      ></el-input>
    </el-form-item>

    <el-form-item style="margin-top: 50px">
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
      if (this.sizeForm.isIp) {
        if (!this.sizeForm.nameType) {
          this.$message.error(this.$t("app_1037"));
          return;
        }

        if (!this.sizeForm.ipdesc) {
          this.$message.error(this.$t("app_1038"));
          return;
        }
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
