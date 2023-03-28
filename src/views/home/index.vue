<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-27 17:45:53
 * @FilePath: /MaaS_Integration_Hub/src/views/home/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-row :gutter="0">
      <el-col :span="24" :xs="24">
        <activity />
      </el-col>
    </el-row>
    <!-- <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="24" :xs="24">
          <el-tabs v-model="activeTab">
            <el-tab-pane :label="$t('leftbar.home')" name="activity">
              <el-card>
                <activity />
              </el-card>
              <el-card style="margin-top: 20px">
                <card-lable />
              </el-card>
              <el-card style="margin-top: 20px">
                <transaction-table />
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="6" :xs="24">
          <user-card :user="user" />
          <timeline />
        </el-col>
      </el-row>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CardLable from "./components/CardLable";
import Activity from "./components/Activity";
import Timeline from "./components/Timeline";
import Account from "./components/Account";
import UserCard from "./components/UserCard";
import TransactionTable from "./components/TransactionTable";

export default {
  name: "Profile",
  components: {
    Activity,
    Timeline,
    Account,
    UserCard,
    CardLable,
    TransactionTable,
  },
  data() {
    return {
      user: {},
      activeTab: "activity",
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"]),
  },
  created() {
    this.getUser();
  },
  mounted() {
    this.$forceUpdate();
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
