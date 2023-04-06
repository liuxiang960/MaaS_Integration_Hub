<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-31 23:18:59
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
    <el-form-item :label="$t('app_1094')">
      <params-list-vue
        :updata="paramsList"
        :is-preview="false"
        @updataFun="paramsUpdata"
      />
    </el-form-item>

    <el-form-item style="margin-top: 50px" :label="$t('app_1095')">
      <params-list-user-vue
        :updata="paramsUserList"
        :is-preview="false"
        @updataFun="paramsUserUpdata"
      />
    </el-form-item>

    <el-form-item style="margin-top: 50px">
      <el-button
        v-if="this.updata && this.updata.id"
        type="primary"
        @click="onSubmit"
      >{{ $t("app_1036") }}</el-button>
      <el-button v-else type="primary" @click="onSubmit">{{
        $t("app_1035")
      }}</el-button>
      <el-button @click="goBack">{{ $t("back") }}</el-button>
    </el-form-item>
  </el-form>
</template>
>

<script>
import ParamsListVue from "./ParamsList.vue"
import ParamsListUserVue from "./ParamsProjectList.vue"

export default {

  components: {
    ParamsListVue,
    ParamsListUserVue
  },
  props: {
    updata: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      paramsList: [],
      paramsUserList: [],
      sizeForm: {
        frequency: 100,
        isFlow: true,
        nameType: "",
        isIp: true,
        paramsList: [],
        paramsUserList: []
      }
    }
  },
  created() {
    if (this.updata) {
      this.sizeForm = this.updata
      this.paramsList = this.updata.paramsList
      this.paramsUserList = this.updata.paramsUserList
    }
  },

  mounted() {
    this.sizeForm = this.updata
  },
  methods: {
    paramsUpdata(list) {
      this.sizeForm.paramsList = list || []
    },
    paramsUserUpdata(list) {
      this.sizeForm.paramsUserList = list || []
    },
    onSubmit() {
      this.$emit("submitStep", this.sizeForm)
      console.log("submit!")
    },
    goBack() {
      this.$emit("goBack")
    }
  }
}
</script>
