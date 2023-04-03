<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-02 22:07:49
 * @FilePath: /MaaS_Integration_Hub/src/views/home/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-card>
          <!-- <tab-list /> -->
          <div
            style="
              display: flex;
              justify-content: flex-end;
              margin-bottom: 40px;
            "
          >
            <el-button type="primary" size="small" @click="goAplly()">{{
              $t("app_1093")
            }}</el-button>

            <el-button plain @click="goSave()">{{ $t("app_1175") }}</el-button>

            <el-button size="small" @click="goBack()">{{
              $t("back")
            }}</el-button>
            <!-- <el-button plain @click="goDeleted()">删 除</el-button> -->
          </div>
          <img
            class="pro-img"
            v-if="language == 'zh'"
            src="../../assets/common/pross/process_zh.png"
            alt=""
          />
          <img
            class="pro-img"
            v-else
            src="../../assets/common/pross/process_en.png"
            alt=""
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TabList from "./components/TableProcess.vue";

export default {
  name: "Process",
  components: {
    TabList,
  },
  computed: {
    language() {
      return this.$store.getters.language;
    },
  },
  data() {
    return {};
  },
  methods: {
    goAplly() {
      this.$message.success(this.$t("app_1176"));
    },
    goSave() {
      this.$message.success(this.$t("app_1177"));
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.pro-img {
  width: 100%;
}

.back_btn {
  margin-left: 40%;
  width: 150px;

  margin-top: 30px;
}
</style>
