<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-28 10:17:00
 * @FilePath: /MaaS_Integration_Hub/src/views/apiManager/components/newServeAPi/NewServeAPi1.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="API名称">
      <el-input v-model="form.name" placeholder="请输入API名称"></el-input>
    </el-form-item>
    <el-form-item :label="$t('description')">
      <el-input type="textarea" v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item label="请求路径">
      <el-input v-model="form.path" placeholder="请输入请求路径"></el-input>
      <div class="tips">
        所有Path位置参数的入参必须在：之后，放置在请求路径中如/：param
      </div>
    </el-form-item>
    <el-form-item label="请求方法">
      <el-select v-model="form.method">
        <el-option label="GET" value="GET"></el-option>
        <el-option label="POST" value="GET"></el-option>
        <el-option label="PATCH" value="PATCH"></el-option>
        <el-option label="PUT" value="PUT"></el-option>
        <el-option label="DELETE" value="DELETE"></el-option>
        <el-option label="HEAD" value="HEAD"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="鉴权策略">
      <el-select v-model="form.authentication">
        <el-option label="NoAuth" value="NoAuth"></el-option>
        <el-option label="BasicAuth" value="BasicAuth"></el-option>
        <el-option label="OAuth2.0" value="OAuth2.0"></el-option>
        <el-option label="HMAC-1" value="HMAC-1"></el-option>
        <el-option label="HMAC-256" value="HMAC-256"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="后台服务类型">
      <el-radio-group v-model="form.serveType" size="medium">
        <el-radio border label="集成流"></el-radio>
        <el-radio border label="第三方服务"></el-radio>
        <el-radio border label="数据库"></el-radio>
        <el-radio border label="mock"></el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="参数设置">
      <params-list @updataFun="paramsUpdata" :updata="paramsList" />
    </el-form-item>

    <el-form-item label="IP访问限制">
      <el-switch v-model="form.isIp"> </el-switch>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">下一步</el-button>
    </el-form-item>
  </el-form>
</template>
>
<script>
import ParamsList from "./ParamsList";
export default {
  components: {
    ParamsList,
  },
  data() {
    return {
      form: {
        name: "",
        method: "GET",
        region: "HTTP",
        description: "",
        serveType: "集成流",
        authentication: "NoAuth",
        path: "/",
        paramsList: [],
        isIp: false,
        paramsList: [],
      },
    };
  },
  props: {
    updata: {
      type: Object,
      default: () => ({}),
    },
  },
  created() {
    if (this.updata) {
      this.form = this.updata;
      this.paramsList = this.updata.paramsList;
    }
  },
  mounted() {},
  methods: {
    paramsUpdata(list) {
      this.form.paramsList = list || [];
    },
    onSubmit() {
      if (!this.form.name) {
        this.$message.error("请输入服务名称");
        return;
      }
      if (!this.form.description) {
        this.$message.error("请输入服务描述信息");
        return;
      }
      if (!this.form.path) {
        this.$message.error("请输入路径");
        return;
      }
      if (!this.form.paramsList) {
        this.$message.error("请输入参数设置信息");
        return;
      }
      this.$emit("submitStep", this.form);
      console.log("submit!");
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
