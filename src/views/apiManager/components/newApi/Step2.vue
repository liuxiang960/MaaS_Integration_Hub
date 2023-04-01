<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-31 21:58:40
 * @FilePath: /MaaS_Integration_Hub/src/views/apiManager/components/newServeAPi/NewServeAPi2.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-form ref="form" :model="sizeForm" label-width="120px">
    <el-form-item :label="$t('app_1016')">
      <el-select v-model="sizeForm.appName">
        <el-option
          v-for="items in applicationList"
          :label="items.name"
          :value="items.name"
          :key="items.id"
          >{{ items.name }}</el-option
        >
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('app_1017')">
      <el-input
        v-model="sizeForm.apiPath"
        :placeholder="$t('app_1018')"
      ></el-input>
      <div class="tips">{{ $t("app_1011") }}/：param</div>
    </el-form-item>

    <el-form-item :label="$t('app_1015')">
      <el-select v-model="sizeForm.methodApi">
        <el-option label="GET" value="GET"></el-option>
        <el-option label="POST" value="POST"></el-option>
        <el-option label="PATCH" value="PATCH"></el-option>
        <el-option label="PUT" value="PUT"></el-option>
        <el-option label="DELETE" value="DELETE"></el-option>
        <el-option label="HEAD" value="HEAD"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('app_1019')">
      <el-select v-model="sizeForm.authentication">
        <el-option label="NoAuth" value="NoAuth"></el-option>
        <el-option label="BasicAuth" value="BasicAuth"></el-option>
        <el-option label="OAuth2.0" value="OAuth2.0"></el-option>
        <el-option label="HMAC-1" value="HMAC-1"></el-option>
        <el-option label="HMAC-256" value="HMAC-256"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item :label="$t('app_1020')">
      <el-select v-model="sizeForm.contentType">
        <el-option
          label="application/json"
          value="application/json"
        ></el-option>
        <el-option label="text/xml" value="text/xml"></el-option>
        <el-option
          label="multipart/form-data"
          value="multipart/form-data"
        ></el-option>
        <el-option
          label="application/x-www-form-urlencoded"
          value="application/x-www-form-urlencoded"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item :label="$t('app_1021')">
      <el-input-number
        v-model="sizeForm.timeOut"
        :precision="0"
        :step="1"
        :max="1000"
        type="number"
        >{{ sizeForm.timeOut }}</el-input-number
      >
      &nbsp;&nbsp;{{$t('app_1150')}}
    </el-form-item>

    <el-form-item style="margin-top: 50px">
      <el-button type="primary" @click="onNext">{{ $t("app_1022") }}</el-button>
      <el-button @click="goBack">{{ $t("back") }}</el-button>

      <!-- <el-button type="primary" @click="onSubmit">{{$t('app_1026')}}</el-button> -->
    </el-form-item>
  </el-form>
</template>
>

<script>
import jsCookie from "js-cookie";
import { appList, appDeletd } from "@/api/app";

export default {
  data() {
    return {
      sizeForm: {
        timeOut: 10,
        methodApi: "GET",
        appName: "",
        contentType: "application/json",
        authentication: "NoAuth",
        apiPath: "",
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
    if (this.updata && this.updata.id) {
      this.sizeForm = this.updata;
    }
    this.getApplist();
  },
  methods: {
    getApplist() {
      appList({
        pageNum: 1,
        pageSize: 20,
      })
        .then((list) => {
          this.loading = false;
          this.applicationList = list;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    onSubmit() {
      if (!this.sizeForm.appName) {
        this.$message.error("请选择后台应用");
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
