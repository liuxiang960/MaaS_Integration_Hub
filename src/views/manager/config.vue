<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-31 11:24:09
 * @FilePath: /MaaS_Integration_Hub/src/views/home/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-card>
          <table-config />
        </el-card>
      </el-col>
      <el-col :span="6" :xs="24"> </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import TableConfig from "./components/TableConfig.vue";

export default {
  name: "Application",
  components: {
    TableConfig,
  },
  data() {
    return {
      user: {},
      activeTab: "opt1",
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"]),
  },
  created() {
    this.getUser();
  },
  methods: {
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
