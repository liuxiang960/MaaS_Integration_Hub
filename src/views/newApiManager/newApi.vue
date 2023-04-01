<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-28 19:38:47
 * @FilePath: /MaaS_Integration_Hub/src/views/home/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="15" :xs="24" style="margin-top: 30px; margin-left: 30px">
        <Step1
          v-show="active == 0"
          style="margin-top: 30px"
          @submitStep="subMitComplte"
          :updata="step1Data"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { apiNew } from "@/api/api";

import Step1 from "./components/newApi/Step1";

export default {
  name: "apiManager",
  components: {
    Step1,
  },
  data() {
    return {
      user: {},
      active: 0,
      step1Data: {},
      step2Data: {},
      isEidt: false,
      apiServeMap: {},
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"]),
  },
  created() {
    this.getUser();
    let data = this.$route.query;
    if (data) {
      this.apiServeMap = data.apiServeMap ? data.apiServeMap : data;
      if (data.apiServeMap) {
        this.step1Data = data;
        this.step2Data = data;
      }
      this.isEidt = true;
    }
  },
  methods: {
    goNext2(item) {
      this.step2Data = item;

      this.active = 2;
    },
    submitStep1(item) {
      this.active = 1;
      this.step1Data = item;
    },
    goBack() {
      this.active = 0;
    },
    goBack3() {
      this.active = 1;
    },
    subMitComplte(item) {
      this.step1Data = item;
      let data = Object.assign(this.step1Data, this.step2Data);
      data.apiServeMap = this.apiServeMap;
      apiNew(data)
        .then((res) => {
          this.loading = false;

          this.$message.success(this.$t("successfulOperation"));
          this.$router.go(-1);
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    submitStep2(item) {
      this.step2Data = item;
      let data = Object.assign(this.step1Data, item);
      apiNew(data)
        .then((res) => {
          this.loading = false;

          this.$message.success(this.$t("successfulOperation"));
          this.$router.go(-1);
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    submitStep3(item) {},
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(" | "),
        email: "admin@test.com",
        avatar: this.avatar,
      };
    },
  },
};
</script>
