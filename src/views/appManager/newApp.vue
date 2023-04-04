<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-04 13:59:33
 * @FilePath: /MaaS_Integration_Hub/src/views/home/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-card>
          <step-one
            style="margin-top: 30px"
            @submitStep="submitStep"
            :updata="stepData"
          />
        </el-card>
      </el-col>
      <el-col :span="6" :xs="24"> </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { appNew } from "@/api/app";
import StepOne from "./components/newApp/StepOne";

export default {
  name: "apiManager",
  components: {
    StepOne,
  },
  data() {
    return {
      stepData: {},
      isEidt: false,
      apiServeMap: {},
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"]),
  },
  created() {
    let data = this.$route.query;
    if (data) {
      this.stepData = data;

      this.isEidt = true;
    }
  },
  methods: {
    submitStep(item) {
      this.step2Data = item;
      let data = Object.assign(this.stepData, item);
      appNew(data)
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
  },
};
</script>
