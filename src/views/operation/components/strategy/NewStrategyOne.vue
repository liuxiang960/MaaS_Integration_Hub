<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-01 01:42:23
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
    <el-form-item :label="$t('strategyName')">
      <el-input v-model="form.name" :placeholder="$t('app_1164')" />
    </el-form-item>
    <el-form-item :label="$t('app_1070')">
      <el-select v-model="form.level" :placeholder="$t('app_1165')">
        <el-option :label="$t('app_1160')" :value="$t('app_1160')" />
        <el-option :label="$t('app_1161')" :value="$t('app_1161')" />
        <el-option :label="$t('app_1162')" :value="$t('app_1162')" />
        <el-option :label="$t('app_1163')" :value="$t('app_1163')" />
      </el-select>
    </el-form-item>

    <el-form-item :label="$t('appName')">
      <el-select v-model="form.appName" :placeholder="$t('app_1166')">
        <el-option
          v-for="item in appDataList"
          :key="item"
          :label="item.name"
          :value="item.name"
        />
      </el-select>
    </el-form-item>

    <el-form-item :label="$t('description')">
      <el-input
        v-model="form.description"
        type="textarea"
        :maxlength="500"
        :autosize="{ minRows: 5, maxRows: 5 }"
      />
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
import { appList } from "@/api/app"

export default {
  props: {
    updata: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      form: {
        name: "",
        level: this.$t("app_1160"),
        description: "",
        appName: ""
      },
      appDataList: []
    }
  },
  mounted() {
    this.getAppList()

    if (this.updata) {
      this.form = this.updata
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    onSubmit() {
      if (!this.form.name) {
        this.$message.error(this.$t("app_1167"))
        return
      }
      if (!this.form.appName) {
        this.$message.error(this.$t("app_1001"))
        return
      }

      this.$emit("submitStep", this.form)
      console.log("submit!")
    },
    getAppList() {
      this.loading = true

      appList({})
        .then((list) => {
          this.loading = false
          this.appDataList = list
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    }
  }
}
</script>
