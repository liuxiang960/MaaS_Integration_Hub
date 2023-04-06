<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-04 14:30:27
 * @FilePath: /MaaS_Integration_Hub/src/views/home/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="15" :xs="24">
        <el-card>
          <el-steps :space="200" :active="active" finish-status="success">
            <el-step :title="$t('app_1079')" />
            <el-step :title="$t('app_1080')" />
          </el-steps>
          <new-serve-api-one
            v-show="active == 0"
            style="margin-top: 30px"
            :updata="step1Data"
            @submitStep="submitStep1"
          />
          <new-serve-api-two
            v-show="active == 1"
            :updata="step2Data"
            style="margin-top: 30px"
            @submitStep="submitStep2"
            @goBack="goBack"
          />
        </el-card>
      </el-col>
      <el-col :span="6" :xs="24" />
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import { apiServeNew } from "@/api/apiServer"

import NewServeApiOne from "./components/newServeAPi/NewServeAPiOne"
import NewServeApiTwo from "./components/newServeAPi/NewServeAPiTwo"

export default {
  name: "ApiManager",
  components: {
    NewServeApiOne,
    NewServeApiTwo
  },
  data() {
    return {
      user: {},
      active: 0,
      step1Data: {},
      step2Data: {},
      isEidt: false
    }
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"])
  },
  created() {
    this.getUser()
    const data = this.$route.query
    if (data) {
      this.step1Data = data
      this.step2Data = data
      this.isEidt = true
    }
  },
  methods: {
    submitStep1(item) {
      this.active = 1
      this.step1Data = item
    },
    goBack() {
      this.active = 0
    },
    submitStep2(item) {
      this.step2Data = item
      const data = Object.assign(this.step1Data, item)
      apiServeNew(data)
        .then((res) => {
          this.loading = false

          this.$message.success(this.$t("successfulOperation"))
          this.$router.go(-1)
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(" | "),
        email: "admin@test.com",
        avatar: this.avatar
      }
    }
  }
}
</script>
