<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-31 22:01:30
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
        <div>
          <p class="tips">{{ $t("app_1023") }}</p>
          <!-- <img
            src="../../../../assets/../assets/home/template.jpg"
            class="img-template"
            alt=""
          /> -->
          <el-input
            disabled="disabled"
            style="width: 500px; heigth: 300px"
            :placeholder="$t('tost_1008')"
            type="textarea"
            :maxlength="500"
            :autosize="{ minRows: 12, maxRows: 50 }"
            v-model="jsonEditorStr"
          ></el-input>
        </div>
        <div class="edit_bg">
          <p class="tips">{{ $t("app_1024") }}</p>

          <!-- <json-editor
            v-model="tempEidtStr"
            style="width: 500px; heigth: 300px"
          /> -->

          <el-input
            style="width: 500px; heigth: 300px"
            :placeholder="$t('tost_1008')"
            type="textarea"
            :maxlength="500"
            :autosize="{ minRows: 12, maxRows: 50 }"
            v-model="tempEidtStr"
          ></el-input>
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
import JsonEditor from "@/components/JsonEditor";
const jsonData = {
  Date: "{'a':'b'}",
  ErrorCode: "OK",
  RequestId: "",
  Message: "0k",
};

export default {
  components: { JsonEditor },
  props: {
    updata: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      sizeForm: {
        timeOut: 10,
        method: "",
        appName: "",
      },
      jsonData: {
        Date: "{'a':'b'}",
        ErrorCode: "OK",
        RequestId: "",
        Message: "0k",
      },
      tempEidtStr: JSON.stringify(jsonData),
      jsonEditorStr: JSON.stringify(jsonData),
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
  height: 300px;
}
.super-edit-bg {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.edit_bg {
  margin-left: 80px;
}
.tips {
  font-size: 14px;
  color: #999;
}
</style>
