<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-04 15:46:40
 * @FilePath: /MaaS_Integration_Hub/src/views/apiManager/components/newServeAPi/NewServeAPi2.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-form
    ref="form"
    :model="sizeForm"
    label-width=""
    size="mini"
    label-position="left"
  >
    <el-form-item label="">
      <div class="super-edit-bg">
        <div class="edit_bg" style="margin-left: 0px">
          <p class="tips">{{ $t("app_1023") }}</p>
          <!-- <img
            src="../../../../assets/../assets/home/template.jpg"
            class="img-template"
            alt=""
          /> -->
          <el-input
            v-model="jsonEditorStr"
            disabled="disabled"
            style="width: 100%; heigth: 300px"
            :placeholder="$t('tost_1008')"
            type="textarea"
            :maxlength="500"
            :autosize="{ minRows: 12, maxRows: 50 }"
          />
        </div>
        <div class="edit_bg">
          <p class="tips">{{ $t("app_1024") }}</p>

          <!-- <json-editor
            v-model="tempEidtStr"
            style="width: 500px; heigth: 300px"
          /> -->

          <el-input
            v-model="tempEidtStr"
            style="width: 100%; heigth: 300px"
            :placeholder="$t('tost_1008')"
            type="textarea"
            :maxlength="500"
            :autosize="{ minRows: 12, maxRows: 50 }"
          />
        </div>
      </div>
    </el-form-item>

    <el-form-item size="large" style="margin-top: 50px">
      <el-button @click="goBack">{{ $t("app_1025") }}</el-button>
      <el-button type="primary" @click="onSubmit">{{
        $t("app_1026")
      }}</el-button>
    </el-form-item>
  </el-form>
</template>
>

<script>
const jsonData = {
  Date: "{'a':'b'}",
  ErrorCode: "OK",
  RequestId: "",
  Message: "0k"
}

export default {
  components: {},
  props: {
    updata: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      sizeForm: {
        timeOut: 10,
        method: "",
        appName: ""
      },
      jsonData: {
        Date: "{'a':'b'}",
        ErrorCode: "OK",
        RequestId: "",
        Message: "0k"
      },
      tempEidtStr: JSON.stringify(jsonData),
      jsonEditorStr: JSON.stringify(jsonData)
    }
  },
  watch: {
    updata(newV, oldV) {
      debugger
    }
  },
  mounted() {
    if (this.updata && this.updata.mockResponse) {
      this.tempEidtStr = this.updata.mockResponse
    }
  },
  methods: {
    onSubmit() {
      this.$emit("subMitComplte", this.tempEidtStr)
      console.log("submi22t!")
    },

    goBack() {
      this.$emit("goBack")
    }
  }
}
</script>
<style>
.tips {
  font-size: 12px;
  color: #999;
}

.img-template {
  width: 500px;
  height: 300px;
}
.super-edit-bg {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
}

.edit_bg {
  margin-left: 80px;
  width: 40%;
}
.tips {
  font-size: 14px;
  color: #999;
}
</style>
